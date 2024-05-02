import { resolve } from "path";
import { configDefaults, defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*"],
    globals: true,
    environment: "jsdom", // or happy-dom
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
