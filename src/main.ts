import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import './styles/main.scss'
const app = createApp(App)
// 样式全局使⽤
import 'vant/lib/index.css'

import 'virtual:svg-icons-register'

console.log(history)

app.use(pinia)
app.use(router)
app.mount('#app')
import './permission'
