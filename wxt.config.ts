import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    // Same as `defineConfig({ ... })` inside vite.config.ts
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }),
  manifest: {
    permissions: [
        'storage',
        'https://api.bilibili.com/*'
    ],
  },
  modules: ['@wxt-dev/module-vue'],
  runner: {
    chromiumArgs: [
        // `--profile-directory=Default`,
      // '--user-data-dir=\"C:\\Users\\T\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 3\"'
    ],
    chromiumProfile: "C:\\Users\\T\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 3"
  },
});
