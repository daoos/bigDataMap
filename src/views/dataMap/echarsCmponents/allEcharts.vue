<template>
  <div v-be-draged="{'key':left2Key}" class="border_light" :class="constainerClass" :id="settingConfig.pageStyle">
    <term-type v-if="echartType === 'termTypeRadio'"></term-type>
    <!-- <dateterm-broken v-else-if="echartType === 'dateTermBroken'"></dateterm-broken>
    <app-use-ranking v-else-if="echartType === 'appUseRanking'"></app-use-ranking>
    <user-activity v-else-if="echartType === 'userActivity'"></user-activity>
    <city-term-ranking v-else-if="echartType === 'cityTermRanking'"></city-term-ranking>
    <domain-echart v-else-if="echartType === 'domainEchart'"></domain-echart>
    <product-type v-else-if="echartType === 'productType'"></product-type>
    <terminal-type-statistics v-else-if="echartType === 'terminalTypeStatistics'"></terminal-type-statistics>
    <terminals v-else-if="echartType === 'terminals'"></terminals>
    <custom-type v-else-if="echartType === 'customType'"></custom-type> -->

    <!-- 添加教育的展示图标数据 -->
    <!-- <extracurricular-activities v-else-if="echartType === 'ExtracurricularActivities'"></extracurricular-activities>
    <student-examination v-else-if="echartType === 'StudentExamination'"></student-examination>
    <consuming-of-homework v-else-if="echartType === 'ConsumingOfHomework'"></consuming-of-homework>
    <annualLocal-entrance-examination v-else-if="echartType === 'AnnualLocalEntranceExamination'"></annualLocal-entrance-examination>
    <structure-of-student-enrollment v-else-if="echartType === 'StructureOfStudentEnrollment'"></structure-of-student-enrollment>
    <bottom-chart6 v-else-if="echartType === 'BottomChart6'"></bottom-chart6>
    <bottom-chart7 v-else-if="echartType === 'BottomChart7'"></bottom-chart7>
    <bottom-chart8 v-else-if="echartType === 'BottomChart8'"></bottom-chart8>
    <bottom-chart9 v-else-if="echartType === 'BottomChart9'"></bottom-chart9>
    <bottom-chart11 v-else-if="echartType === 'BottomChart11'"></bottom-chart11> -->

    <!-- 医疗数据 -->
    <reception-of-loopRatio v-else-if="echartType === 'ReceptionOfLoopRatio'"></reception-of-loopRatio>
    <medical-expense-payment v-else-if="echartType === 'MedicalExpensePayment'"></medical-expense-payment>
    <one-week-emergency-response v-else-if="echartType === 'OneWeekEmergencyResponse'"></one-week-emergency-response>
    <top5-was-hospitalized-last-month v-else-if="echartType === 'Top5WasHospitalizedLastMonth'"></top5-was-hospitalized-last-month>
    <incidence-of-special-disease-area v-else-if="echartType === 'IncidenceOfSpecialDiseaseArea'"></incidence-of-special-disease-area>
    <age-incidence-of-special-disease v-else-if="echartType === 'AgeIncidenceOfSpecialDisease'"></age-incidence-of-special-disease>
    <one-year-common-disease v-else-if="echartType === 'OneYearCommonDisease'"></one-year-common-disease>
    <hospitalization-ratio v-else-if="echartType === 'HospitalizationRatio'"></hospitalization-ratio>

    <div v-else>
      可向该区域拖拽各种图表
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  // TermType,
  // DatetermBroken,
  // AppUseRanking,
  // UserActivity,
  // CityTermRanking,
  // DomainEchart,
  // ProductType,
  // TerminalTypeStatistics,
  // Terminals,
  // CustomType
} from "./index.js";

// 引入教育的展示图标

// import {
//   ExtracurricularActivities,
//   StudentExamination,
//   ConsumingOfHomework,
//   AnnualLocalEntranceExamination,
//   StructureOfStudentEnrollment,
//   BottomChart6,
//   BottomChart7,
//   BottomChart8,
//   BottomChart9,
//   BottomChart11
// } from "../education/index.js";

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
} from "../hospital/index";

export default {
  data() {
    return {
      echartType: ""
    };
  },
  components: {
    // TermType,
    // DatetermBroken,
    // AppUseRanking,
    // UserActivity,
    // CityTermRanking,
    // DomainEchart,
    // ProductType,
    // TerminalTypeStatistics,
    // Terminals,
    // CustomType,
    //教育
    // ExtracurricularActivities,
    // StudentExamination,
    // ConsumingOfHomework,
    // AnnualLocalEntranceExamination,
    // StructureOfStudentEnrollment,
    // BottomChart6,
    // BottomChart7,
    // BottomChart8,
    // BottomChart9,
    // BottomChart11,
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
  computed: {
    ...mapGetters(["dragConfigData", "settingConfig"])
  },
  created() {
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
    },
    constainerClass: {
      type: String,
      default: ""
    }
  },
  methods: {}
};
</script>

