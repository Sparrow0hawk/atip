import { defineConfig } from "vite";
import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import wasmPack from "vite-plugin-wasm-pack";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "scheme.html"),
        nested2: resolve(__dirname, "browse.html"),
      },
    },
  },
  plugins: [svelte(), wasmPack(["./route_info"], ["route-snapper"])],
});
