import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from "./router.js"
import IEcharts from 'vue-echarts-v3/src/full.js';

Vue.use(ElementUI)
Vue.component('i-echarts', IEcharts)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

//日期格式化函数
Date.prototype.format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    return str;
}



//全局变量header
Vue.prototype.urlHeader = 'http://101.132.142.238:12222'