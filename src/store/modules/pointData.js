// 映入mutation 的定义
import {
    GET_POINT_DATA
} from '../mutation-types'

//
import {
    getPointTreeData
} from '@/api/echarts'


const state = {
    pointData: {
    },

}

const getters = {
    pointData: (state) => {
        return state.pointData
    }
}

const mutations = {
    GET_POINT_DATA: (state, data) => {
        state.pointData = data
    }

}

const actions = {
    // 获取图标的数据
    GET_POINT_DATA({
        commit
    }, params) {
        const curentCityCode = params.curentCityCode
        return new Promise((resolve, reject) => {
            getPointTreeData(curentCityCode).then(response => {
                const data = response.data
                commit(GET_POINT_DATA, data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}