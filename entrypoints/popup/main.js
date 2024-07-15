import { createApp } from 'vue';
import App from "@/src/components/popup/App.vue"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createPinia} from "pinia";

// 创建一个应用
const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

app.use(ElementPlus)
// 挂载整个应用到app容器中
app.mount('#app')
