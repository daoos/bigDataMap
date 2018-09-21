<template>
  <div v-be-draged="{'key':left2Key}" class="echart-item" style="vertical-align: top;">
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
    <div v-else style="fontSize:0.5rem;">
      可向该区域拖拽各种图表
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
} from "./index.js";

export default {
  data() {
    return {
      echartType: ""
    };
  },
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
    CustomType
  },
  computed: {
    ...mapGetters(["dragConfigData", "settingConfig"])
  },
  created() {
    // this.echartType = this.left2Key;
    this.echartType = this.dragConfigData[this.left2Key];
  },
  props: {
    left2Key: {
      type: String,
      default: ""
    },
    myTool3: {
      type: Function,
      default: null
    }
  },
  methods: {}
};
</script>

