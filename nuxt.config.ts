/*
  nuxt-config:
  https://nuxt.com/docs/api/configuration/nuxt-config

  nuxt-svgo:
  https://nuxt.com/modules/nuxt-svgo
*/
import eslint from "vite-plugin-eslint";

export default defineNuxtConfig({
  srcDir: "src/",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-svgo", "nuxt-swiper"],
  svgo: {
    defaultImport: "component",
  },
  swiper: {
    modules: ["navigation", "pagination", "effect-creative"],
  },
  css: [
    "@/assets/main.css",
    "@/assets/scss/style.scss",
    "mdi/css/materialdesignicons.min.css",
  ],
  build: {
    // transpile 选项中可以配置需要转译的文件或模块的名称，这些文件或模块会在编译过程中被转译，以保证其兼容性。
    transpile: ["vuetify"],
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    plugins: [eslint()],
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.VITE_API_URL,
    },
  },
});
