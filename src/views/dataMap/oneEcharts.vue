<template>
    <div id="oneEcharts">
        <div id="fullScreenContainer">
            <div id="fullScreen">
            </div>
        </div>
        <div class="modal fade" id="myModal" style="color: #000" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">
                            数据详情
                        </h4>
                    </div>
                    <div class="modal-body">加载中....</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <header style="position:static;">
            <h2>
                <span class="tx">
                    <b>和信大数据可视化分析</b>
                </span>
            </h2>
        </header>
        <div style="width:80vw;height:50vh;margin:12vh auto;margin-top:12vh">
            <!-- 医疗数据 -->
            <reception-of-loopRatio v-if="echartType === 'ReceptionOfLoopRatio'"></reception-of-loopRatio>
            <medical-expense-payment v-else-if="echartType === 'MedicalExpensePayment'"></medical-expense-payment>
            <one-week-emergency-response v-else-if="echartType === 'OneWeekEmergencyResponse'"></one-week-emergency-response>
            <top5-was-hospitalized-last-month v-else-if="echartType === 'Top5WasHospitalizedLastMonth'"></top5-was-hospitalized-last-month>
            <incidence-of-special-disease-area v-else-if="echartType === 'IncidenceOfSpecialDiseaseArea'"></incidence-of-special-disease-area>
            <age-incidence-of-special-disease v-else-if="echartType === 'AgeIncidenceOfSpecialDisease'"></age-incidence-of-special-disease>
            <one-year-common-disease v-else-if="echartType === 'OneYearCommonDisease'"></one-year-common-disease>
            <hospitalization-ratio v-else-if="echartType === 'HospitalizationRatio'"></hospitalization-ratio>

            <div v-else>
                页面不存在
            </div>
        </div>

    </div>
</template>
<script>
// 引入医疗的数据
import {
  ReceptionOfLoopRatio,
  MedicalExpensePayment,
  OneWeekEmergencyResponse,
  Top5WasHospitalizedLastMonth,
  IncidenceOfSpecialDiseaseArea,
  AgeIncidenceOfSpecialDisease,
  OneYearCommonDisease,
  HospitalizationRatio
} from "./hospital/index";

import { cityMap } from "static/echarts/city-map.js";

export default {
  components: {

    // 医疗
    ReceptionOfLoopRatio,
    MedicalExpensePayment,
    OneWeekEmergencyResponse,
    Top5WasHospitalizedLastMonth,
    IncidenceOfSpecialDiseaseArea,
    AgeIncidenceOfSpecialDisease,
    OneYearCommonDisease,
    HospitalizationRatio
  },
  data() {
    return {
      echartType: "",
      cityCode: ""
    };
  },
  created() {
    //   重新获取数据
    this.echartType = this.$route.params.curentEchartsType;
    this.cityCode = this.$route.params.cityCode;

    if (cityMap[this.cityCode] !== undefined) {
      this.cityCode = cityMap[this.cityCode];
    } else {
      this.cityCode = cityMap["中国"];
    }
    let params = { curentCityCode: this.cityCode };
    this.$store.dispatch("GET_ECHARTSDATA", params);
  }
};
</script>
<style>
#oneEcharts .title_box {
  display: block;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
</style>

