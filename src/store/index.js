import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import echartsData from './modules/echartsData'
import dragConfig from './modules/dragConfig'
import pointData from './modules/pointData'


const store = new Vuex.Store({
    modules:{
        echartsData,
        dragConfig,
        pointData
    }
})
export default store