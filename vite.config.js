import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".",
  publicDir: false, // Don't copy static files in dev
  build: {
    outDir: "dist",
    emptyOutDir: false, // Hugo writes here too
    rollupOptions: {
      input: {
        app: resolve(__dirname, "src/js/app.js"),
        cms: resolve(__dirname, "src/js/cms.jsx"),
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
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
  },
});
