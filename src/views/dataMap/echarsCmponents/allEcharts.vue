<template>
  <div v-be-draged="{'key':left2Key}" class="border_light" :class="constainerClass" :id="settingConfig.pageStyle">


    <!-- 添加教育的展示图标数据 -->
    <extracurricular-activities v-if="echartType === 'ExtracurricularActivities'"></extracurricular-activities>
    <student-examination v-else-if="echartType === 'StudentExamination'"></student-examination>
    <consuming-of-homework v-else-if="echartType === 'ConsumingOfHomework'"></consuming-of-homework>
    <annualLocal-entrance-examination v-else-if="echartType === 'AnnualLocalEntranceExamination'"></annualLocal-entrance-examination>
    <structure-of-student-enrollment v-else-if="echartType === 'StructureOfStudentEnrollment'"></structure-of-student-enrollment>
    <bottom-chart6 v-else-if="echartType === 'BottomChart6'"></bottom-chart6>
    <bottom-chart7 v-else-if="echartType === 'BottomChart7'"></bottom-chart7>
    <bottom-chart8 v-else-if="echartType === 'BottomChart8'"></bottom-chart8>
    <bottom-chart9 v-else-if="echartType === 'BottomChart9'"></bottom-chart9>
    <bottom-chart11 v-else-if="echartType === 'BottomChart11'"></bottom-chart11>

    <div v-else>
      可向该区域拖拽各种图表
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// 引入教育的展示图标

import {
  ExtracurricularActivities,
  StudentExamination,
  ConsumingOfHomework,
  AnnualLocalEntranceExamination,
  StructureOfStudentEnrollment,
  BottomChart6,
  BottomChart7,
  BottomChart8,
  BottomChart9,
  BottomChart11
} from "../education/index.js";


export default {
  data() {
    return {
      echartType: ""
    };
  },
  components: {
    //教育
    ExtracurricularActivities,
    StudentExamination,
    ConsumingOfHomework,
    AnnualLocalEntranceExamination,
    StructureOfStudentEnrollment,
    BottomChart6,
    BottomChart7,
    BottomChart8,
    BottomChart9,
    BottomChart11,
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

