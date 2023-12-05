import { BuildOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as pkg from "./package.json";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

const isDemo = process.env.type === "demo";

const buildPackageConfig: BuildOptions = {
  outDir: "./lib",
  lib: {
    entry: resolve(__dirname, "packages/index.ts"),
    name: pkg.name,
    formats: ["es", "umd"],
    // the proper extensions will be added
    fileName: (format: string) =>
      format === "es" ? "index.es.js" : "index.cjs",
  },
  cssCodeSplit: false,
  rollupOptions: {
    external: ["vue"],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: "Vue",
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: isDemo ? "/testvideo2" : "",
  build: isDemo ? undefined : buildPackageConfig,
})
