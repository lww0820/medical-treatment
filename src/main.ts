import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
// import './styles/main.css'
const app = createApp(App)

// 样式全局使⽤
import 'vant/lib/index.css'

// console.log(import.meta.env)

app.use(pinia)
app.use(router)
app.mount('#app')
