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

            <extracurricular-activities v-if="echartType === 'ExtracurricularActivities'"></extracurricular-activities>
            <student-examination v-else-if="echartType === 'StudentExamination'"></student-examination>
            <consuming-of-homework v-else-if="echartType === 'ConsumingOfHomework'"></consuming-of-homework>
            <annual-local-entrance-examination v-else-if="echartType === 'AnnualLocalEntranceExamination'"></annual-local-entrance-examination>
            <structure-ofStudent-enrollment v-else-if="echartType === 'StructureOfStudentEnrollment'"></structure-ofStudent-enrollment>
            <bottom-chart6 v-else-if="echartType === 'BottomChart6'"></bottom-chart6>
            <bottom-chart11 v-else-if="echartType === 'BottomChart11'"></bottom-chart11>
            <bottom-chart8 v-else-if="echartType === 'BottomChart8'"></bottom-chart8>
            <bottom-chart9 v-else-if="echartType === 'BottomChart9'"></bottom-chart9>
            <bottom-chart11 v-else-if="echartType === 'BottomChart11'"></bottom-chart11>

            <div v-else>
                页面不存在
            </div>
        </div>

    </div>
</template>
<script>
import {
  TermType,
  DatetermBroken,
  AppUseRanking,
  UserActivity,
  CityTermRanking,
  DomainEchart,
  ProductType,
  TerminalTypeStatistics,
  Terminals,
  CustomType
} from "./echarsCmponents/index";

import {
  ExtracurricularActivities,
  StudentExamination,
  ConsumingOfHomework,
  AnnualLocalEntranceExamination,
  StructureOfStudentEnrollment,
  BottomChart6,
  BottomChart11,
  BottomChart9
} from "./education/index.js";

import { cityMap } from "static/echarts/city-map.js";

export default {
  components: {
    TermType,
    DatetermBroken,
    AppUseRanking,
    UserActivity,
    CityTermRanking,
    DomainEchart,
    ProductType,
    TerminalTypeStatistics,
    Terminals,
    CustomType,

    // 教育
    ExtracurricularActivities,
    StudentExamination,
    ConsumingOfHomework,
    AnnualLocalEntranceExamination,
    StructureOfStudentEnrollment,
    BottomChart6,
    BottomChart11,
    BottomChart9
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

