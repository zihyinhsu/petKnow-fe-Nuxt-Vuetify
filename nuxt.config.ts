/*
  nuxt-config:
  https://nuxt.com/docs/api/configuration/nuxt-config

  nuxt-svgo:
  https://nuxt.com/modules/nuxt-svgo
*/
import eslint from "vite-plugin-eslint";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  srcDir: "src/",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "nuxt-svgo",
    async (_options, nuxt) => {
      await nuxt.hooks.hook("vite:extendConfig", (config: any) => {
        config.plugins.push(vuetify());
      });
    },
  ],
  svgo: {
    defaultImport: "component",
  },
  css: ["@/assets/scss/style.scss", "mdi/css/materialdesignicons.min.css"],
  build: {
    // transpile 选项中可以配置需要转译的文件或模块的名称，这些文件或模块会在编译过程中被转译，以保证其兼容性。
    transpile: ["vuetify"],
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    plugins: [eslint()],
  },
});
