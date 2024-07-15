import { createApp } from 'vue';
import App from "@/src/components/bili/App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from "@/src/router";

//仓库大仓库
import { createPinia } from 'pinia'
//创建大仓库
const pinia = createPinia()

// 创建一个应用
const app = createApp(App)

app.use(pinia)

app.use(ElementPlus)
// 使用路由器
app.use(router)
// 挂载整个应用到app容器中
app.mount('#app')
