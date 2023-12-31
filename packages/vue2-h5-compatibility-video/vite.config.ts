import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import type { BuildOptions } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";
import pkg from "./package.json";
import { resolve } from "path";

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
  plugins: [
    vue2(),
    isDemo
      ? legacy({
          targets: ["ie >= 11"],
          additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        })
      : undefined,
  ].filter((v) => v),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: isDemo ? "/testvideo2" : "",
  build: isDemo ? undefined : buildPackageConfig,
});
