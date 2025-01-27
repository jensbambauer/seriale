import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import postcssNested from "postcss-nested";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import inject from "gulp-inject";
import sourcemaps from "gulp-sourcemaps";
import cssnano from "cssnano";
import uglify from "gulp-uglify";
import version from "gulp-version-number";

const browserSync = BrowserSync.create();
const hugoBin = `./bin/hugo.${process.platform === "win32" ? "exe" : process.platform}`;
const defaultArgs = ["-d", "../dist", "-s", "site"];

if (process.env.DEBUG) {
  defaultArgs.unshift("--debug");
}

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));
gulp.task("build", ["css", "js", "hugo", "version"]);
gulp.task("build-preview", ["css", "js", "hugo-preview"]);

gulp.task("version", () =>
  gulp
    .src("./dist/**/*.html")
    .pipe(
      version({
        value: "%MDS%",
        append: {
          key: "v",
          to: ["css", "js"],
        },
      })
    )
    .pipe(gulp.dest("dist"))
);
gulp.task("css", () =>
  gulp
    .src("./src/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([cssImport({ from: "./src/css/main.css" }), cssnext(), postcssNested()]))
    .pipe(sourcemaps.write("./dist/css"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
);
gulp.task("minify", () => gulp.src("./dist/app.js").pipe(uglify()).pipe(gulp.dest("./dist")));

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log(
      "[webpack]",
      stats.toString({
        colors: true,
        progress: true,
      })
    );
    browserSync.reload();
    cb();
  });
});

gulp.task("svg", () => {
  const svgs = gulp
    .src("site/static/img/icons-*.svg")
    .pipe(svgmin())
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("site/layouts/partials/svg.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("site/layouts/partials/"));
});

gulp.task("server", ["hugo", "css", "js", "svg"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./site/static/img/icons-*.svg", ["svg"]);
  gulp.watch("./site/**/*", ["hugo"]);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, { stdio: "inherit" }).on("close", (code) => {
    if (code === 0) {
      browserSync.reload("notify:false");
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
