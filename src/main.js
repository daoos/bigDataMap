// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'babel-polyfill'

import i18n from './lang/index' // 国际化
Vue.use(Element, {
    size: 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})

// import './mock'//数据模拟

import echartBtns from './assets/img/img'
window.echartBtns = echartBtns


Vue.config.productionTip = false

// 引入 css
import '@/assets/css/framework.css'
import '@/assets/css/animate.css'

import $ from 'jquery'
// jquery plugin
import '@/assets/js/jqPlugin'


import echarts from 'echarts'

import base from './utils/base' //引用
Vue.use(base);

// bootstrap plugin
import './assets/js/modal'
import './assets/js/collapse'

// 数据管理中心
import store from './store'
// 字体文件
import './icons' // icon

// 自定义指令
import directs from './directive/directive'

Vue.prototype.$echarts = echarts

// import * as THREE from 'three'
// window.THREE = THREE

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'
})