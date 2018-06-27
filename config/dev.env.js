'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // NODE_ENV: '"offline"',
    BASE_API: '"/static/"',
    BASE_API_JSON: '"./static/json/"',
    // 测试接口的数据
    TEST_API: 'http://192.168.50.125:8181/DataMapManager/MapAjaxInfoServlet.do?dz_type=SystemType&jsonCallback=callback',
    // IMG_PATH: '"image://http://192.168.50.179/veSystem/vue-map/src/assets/img/"',
})