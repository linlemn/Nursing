import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from "./router.js"
import "vue-multiselect/dist/vue-multiselect.min.css"

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})