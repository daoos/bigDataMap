import { request, requestJson } from '@/utils/request'

// 引入离线的js文件
import { mapDataJs, flare } from "static/json/data";
// 地图的离线数据
// import { Infos } from "static/json/jsons"


var curentUrl = window.location.href,
    isFileRequest = false;
if (curentUrl.indexOf('http://') == -1) {
    // 通过 文件路径的方式访问页面
    isFileRequest = true
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

isFileRequest = true

export function getMapJson(curentCityCode) {
    // //离线
    // if (isFileRequest || true) {
    //     var data = {};
    //     data =
    //         Infos.Infos1["json" + curentCityCode] == undefined ?
    //         Infos.Infos2["json" + curentCityCode] :
    //         Infos.Infos1["json" + curentCityCode];
    //         console.log(curentCityCode,data)
    //     return new Promise(resolve => {
    //         resolve({ data: data })
    //     }, reject => {})
    // } else {
    //     let path = curentCityCode + ".json"
    //     return request({
    //         url: 'china-main-city/' + path,
    //         method: 'get',
    //     })
    // }
    let path = curentCityCode + ".json"
    return requestJson({
        url: 'json/china-main-city/' + path,
        method: 'get',
    })
}

/**
 * 获取城市数据
 */
export function getMarkData(curentCityCode, dz_type, pageIndex) {
    if (isFileRequest) {
        var xxdata = mapDataJs[curentCityCode];
        var apiKey = { customType: 'customType', systemType: 'termTypeRadio', dateTermBroken: 'dateTermBroken', appUseRanking: 'appUseRanking', cityCustomActivity: 'cityCustomActivity', cityMapData: 'cityMapData', terminals: 'terminals', cityTermRanking: 'cityTermRanking', horLineEchart: 'horLineEchart', domainEchart: 'domainEchart', serviceWorkingNum: 'serviceWorkingNum', productType: 'productType', osType: 'osType' }
        return new Promise((resolve) => {
            // 延迟返回数据 模拟
            if (xxdata != undefined) {
                let timeNum = GetRandomNum(500, 2000)
                setTimeout(function() {
                    // alert(1)
                    resolve({ data: { data: xxdata[apiKey[dz_type]] } })
                }, timeNum)
            }else{
                resolve({ data: { data: {} } })
            }


        }, () => {})
    } else {
        // let data = { 'mark': curentCityCode, "dz_type": dz_type }
        let data = { 'MapID': curentCityCode, "dz_type": dz_type, "pageIndex": pageIndex }
        return request({
            url: '',
            // url: curentCityCode + '.json',
            params: data,
            method: 'get',
        })
    }
}

/**
 * 获取一个标点下设备的设备部署关系
 */
export function getPointTreeData(curentCityCode) {
    if (isFileRequest) {
        var xxdata = flare;
        return new Promise((resolve) => {
            // 延迟返回数据 模拟
            let timeNum = GetRandomNum(500, 3000)
            setInterval(function() {
                resolve({ data: xxdata })
            }, timeNum)

        }, () => {})
    } else {
        let data = { 'MapID': curentCityCode }
        return requestJson({
            // url: '',
            url: 'json/flare.json',
            params: data,
            method: 'get',
        })
    }
}


export function getMapSvg(curentCityCode) {
    let path = curentCityCode + ".svg"
    return requestJson({
        url: 'veSVG/' + path,
        method: 'get',
    })
}