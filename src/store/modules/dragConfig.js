// 映入mutation 的定义
import {
    SET_LEFT_1,
    SET_LEFT_2,
    SET_DRAG_CONFIG_DATA
} from '../mutation-types'



const state = {
    left1: 'termTypeRadio',
    left2: 'dateTermBroken',
    dragConfigData: {
        // left1: 'termTypeRadio',
        // left2: 'dateTermBroken',
        // right1: 'appUseRanking',
        // right2: 'userActivity',
        // bottom1:'cityTermRanking',
        // bottom2:'horLineEchart',
        // bottom3:'domainEchart',
        // bottom4:'serviceWorkingNum',
        // center1:'MainMap',
        // terminals:'terminals',

        //product
        // left1: 'termTypeRadio',
        // left2: 'productType',
        // right1: 'appUseRanking',
        // right2: 'userActivity',
        // bottom1: 'terminalTypeStatistics',
        // bottom2: 'dateTermBroken',
        // bottom3: 'customType',
        // bottom4: 'cityTermRanking',
        // center1: 'MainMap',
        // terminals: 'terminals'

        // 教育
        // left1: 'ExtracurricularActivities',
        // left2: 'StudentExamination',
        // right1: 'ConsumingOfHomework',
        // right2: 'AnnualLocalEntranceExamination',
        // bottom1:'StructureOfStudentEnrollment',
        // bottom2:'BottomChart6',
        // bottom3:'BottomChart11',
        // bottom4:'BottomChart8',
        // center1:'BottomChart9',
        // terminals:'BottomChart11',

        // 医疗
        left1: 'ReceptionOfLoopRatio',
        left2: 'MedicalExpensePayment',
        right1: 'OneWeekEmergencyResponse',
        right2: 'Top5WasHospitalizedLastMonth',
        bottom1:'IncidenceOfSpecialDiseaseArea',
        bottom2:'AgeIncidenceOfSpecialDisease',
        bottom3:'OneYearCommonDisease',
        bottom4:'HospitalizationRatio',
        center1:'BottomChart9',
        terminals:'BottomChart11'
    }

}

const getters = {
    left1: (state) => {
        return state.left1
    },
    left2: (state) => {
        return state.left2
    },
    dragConfigData: (state) => {
        return state.dragConfigData
    },
}

const mutations = {
    SET_LEFT_1: (state, data) => {
        state.left1 = data
    },
    SET_LEFT_2: (state, data) => {
        state.left2 = data
    },
    SET_DRAG_CONFIG_DATA: (state, data) => {
        console.log(data, 'SET_DRAG_CONFIG_DATA', state.dragConfigData)
        let key = data.key,
            val = data.val
        for (var i in state.dragConfigData) {
            if (state.dragConfigData[i] == val) {
                state.dragConfigData[i] = ''
            }
        }
        state.dragConfigData[key] = val
    },

}

const actions = {
    // 获取图标的数据
    SET_LEFT_1({
        commit
    }, params) {
        console.log('store', params)
        commit(SET_LEFT_1, params.left1)
    },
    SET_LEFT_2({
        commit
    }, params) {
        commit(SET_LEFT_2, params.left2)
    },
    /**
     * 
     * @param {key} param0 接收容器的标识
     * @param {val} params 被拖拽图表的标识
     */
    SET_DRAG_CONFIG_DATA({
        commit
    }, params) {
        console.log(params)
        commit(SET_DRAG_CONFIG_DATA, params)
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}