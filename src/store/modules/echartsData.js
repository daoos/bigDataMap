// 映入mutation 的定义
import {
    GET_ECHARTSDATA,
    GET_MAP_JSON,
    SET_SLDEBAR,
    GET_MAP_SVG
} from '../mutation-types'

//
import {
    getMapJson,
    getMapSvg,
    getMarkData,
} from '@/api/echarts'


const state = {
    echartsData: {
        cityMapData: '',
        termTypeRadio: '',
        cityTermRanking: '',
        appUseRanking: '',
        cityCustomActivity: '',
        dateTermBroken: '',
        serviceWorkingNum: '',
        domainEchart: '',
        horLineEchart: ''
    },
    mapData: {},
    // loadingConfig: { text: "加载中...", maskColor: '#01081B', color: '#fff', textColor: '#fff' }
    // loadingConfig: { text: "加载中...", maskColor: 'transparent', color: '#fff', textColor: '#fff' }
    loadingConfig: { text: "加载中...", maskColor: 'rgba(22,37,92,0.8)', color: '#fff', textColor: '#fff' },
    language: sessionStorage.getItem('language') || 'zh',
    sidebar: {
        //opened: sessionStorage.getItem('sidebarOpened')||false
        opened: false
    },
    settingConfig: {
        video: (sessionStorage.getItem('video') || "0"),
        canvasBg: sessionStorage.getItem('canvasBg') || "0",
        brightness:(sessionStorage.getItem('brightness') || 30),
        pageStyle:(sessionStorage.getItem('pageStyle') || ''),
        // 1 蓝色背景 2 视屏背景 3 星空北京
        bgStyle:(sessionStorage.getItem('bgStyle') || '1'),
        // 1.显示四角边框
        echartsContainer: sessionStorage.getItem('echartsContainer') || '1',
        apiUrl: sessionStorage.getItem('apiUrl') || 'http://' + window.location.host + '/DataServer/MapAjaxInfoServlet.do',
        echartType: (sessionStorage.getItem('echartType') || '1'),
    }

}

const getters = {
    echartsData: (state) => {
        return state.echartsData
    },
    mapData: (state) => {
        return state.mapData
    },
    loadingConfig: (state) => {
        return state.loadingConfig
    },
    language: (state) => {
        return state.language
    },
    sidebar: (state) => {
        return state.sidebar
    },
    settingConfig: (state) => {
        return state.settingConfig
    },
}

const mutations = {
    GET_ECHARTSDATA: (state, data) => {
        state.echartsData = data
    },
    GET_MAP_JSON: (state, data) => {
        state.mapData = data
    },
    GET_MAP_SVG: (state, data) => {
        state.mapData = data
    },
    SET_LANGUAGE: (state, language) => {
        state.language = language
        sessionStorage.setItem('language', language)
    },
    SET_SLDEBAR: (state, opened) => {
        state.sidebar.opened = opened
        sessionStorage.setItem('sidebarOpened', opened)
    },

}

const actions = {
    // 获取图标的数据
    GET_ECHARTSDATA({
        commit
    }, params) {
        const curentCityCode = params.curentCityCode,
            dz_type = params.dz_type
        var pageIndex = '';
        if (params.pageIndex != undefined) {
            pageIndex = params.pageIndex
        }

        return new Promise((resolve, reject) => {
            getMarkData(curentCityCode, dz_type, pageIndex).then(response => {
                const data = response.data
                commit(GET_ECHARTSDATA, data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取地图的数据
    GET_MAP_JSON({
        commit
    }, params) {
        const curentCityCode = params.curentCityCode
        return new Promise((resolve, reject) => {
            getMapJson(curentCityCode).then(response => {
                const data = response.data
                commit(GET_MAP_JSON, data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取地图的数据 svg
    GET_MAP_SVG({
        commit
    }, params) {
        const curentCityCode = params.curentCityCode
        return new Promise((resolve, reject) => {
            getMapSvg(curentCityCode).then(response => {
                const data = response.data
                commit(GET_MAP_JSON, data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    SET_LANGUAGE({ commit }, language) {
        commit('SET_LANGUAGE', language)
    },

    SHOW_LOADING({ commit }, language) {
        commit(SHOW_LOADING, language)
    },
    HIDE_LOADING({ commit }, language) {
        commit(HIDE_LOADING, language)
    },

    SET_SLDEBAR({ commit }, params) {
        let opened = params.opened
        commit(SET_SLDEBAR, opened)
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}