import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  publicDir: false, // Don't copy static files in dev
  build: {
    outDir: "dist",
    emptyOutDir: false, // Hugo writes here too
    rollupOptions: {
      input: {
        app: resolve(__dirname, "src/js/app.js"),
        // cms: resolve(__dirname, "src/js/cms.jsx"), // Disabled - CMS not needed currently
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            // Output as main.css to match Hugo template expectations
            return "css/main[extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  // plugins: [react()], // Disabled - only needed for CMS
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 5173,
    cors: true,
  },
});
