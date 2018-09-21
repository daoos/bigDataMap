import Vue from 'vue'
import Router from 'vue-router'
import hello from "@/components/HelloWorld"

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
    routes: [
        // { path: '/demo', component: _import('dataMap/demo') },
        // { path: '/canvas', component: _import('dataMap/echarsCmponents/canvas') },
        // {
        //     path: '/hello',
        //     name: 'hello',
        //     component: hello
        // },
        { path: '/two/:cityCode?', component: _import('dataMap/two'),meta:{
            path:'/two'
        } },
        { path: '/thr/:cityCode?', component: _import('dataMap/thr'),meta:{
            path:'/thr'
        } },
        { path: '*', redirect: '/dataMap/中国' },
        {
            path: '/dataMap/point/:svgMapId',
            name: 'point',
            component: _import('dataMap/point')
        },
        {
            path: '/dataMap/:cityCode?',
            name: 'fourIndex',
            component: _import('dataMap/index'),
            meta:{
                path:'/dataMap'
            }
        },
        {
            path: '/dataMap/oneCity/:svgMapId?',
            name: 'fourOneCity',
            component: _import('dataMap/oneCity')
        },
        {
            path: '/dataMap/oneEcharts/:curentEchartsType/:cityCode?',
            name: 'fourOneEcharts',
            component: _import('dataMap/oneEcharts'),
        },

        { path: '/loading', component: _import('utils/loading') },
        { path: '/refresh', component: _import('utils/goBack'), hidden: true },

        { path: '/dataMap/veruntable/:veruntableId', name: 'veruntable',component: _import('dataMap/veruntable') },
        // v2
        {
            path: '/v2/:cityCode?',
            name: 'v2Index',
            component: _import('v2/index'),
            meta:{
                path:'/v2'
            }
        },
        {
            path: '/v2/oneEcharts/:curentEchartsType/:cityCode?',
            name: 'v2OneEcharts',
            component: _import('v2/oneEcharts'),
        },
    ]
})