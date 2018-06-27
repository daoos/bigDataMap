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

            <term-type v-if="echartType === 'termTypeRadio'"></term-type>
            <dateterm-broken v-else-if="echartType === 'dateTermBroken'"></dateterm-broken>
            <app-use-ranking v-else-if="echartType === 'appUseRanking'"></app-use-ranking>
            <user-activity v-else-if="echartType === 'userActivity'"></user-activity>
            <city-term-ranking v-else-if="echartType === 'cityTermRanking'"></city-term-ranking>
            <domain-echart v-else-if="echartType === 'domainEchart'"></domain-echart>
            <product-type v-else-if="echartType === 'productType'"></product-type>
            <terminal-type-statistics v-else-if="echartType === 'terminalTypeStatistics'"></terminal-type-statistics>
            <terminals v-else-if="echartType === 'terminals'"></terminals>
            <custom-type v-else-if="echartType === 'customType'"></custom-type>


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

