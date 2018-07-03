<template>
  <div v-be-draged="{'key':left2Key}" class="border_light" :class="constainerClass" :id="settingConfig.pageStyle">
    <term-type v-if="echartType === 'termTypeRadio'"></term-type>
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

