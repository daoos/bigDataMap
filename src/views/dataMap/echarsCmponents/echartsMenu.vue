<template>
  <div id="dragContainer" :class="{'open':sidebar.opened}" :style="{'opacity':settingConfig.video=='1'?settingConfig.brightness/100:1}">
    <div class="panel-group table-responsive menuContainer" role="tablist">
      <!-- 公司logo -->
      <div class="companyLogo">
        <img src="~@/assets/img/logo.png" alt="">
      </div>
      <div class="panel panel-primary leftMenu">

        <!-- 医疗数据 -->

        <div v-if=true v-menu class="panel-heading" id="collapseListGroupHeading6" data-toggle="collapse" data-target="#collapseListGroup6" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="ComprehensiveData" /> 医疗云大数据平台
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <div v-if=true id="collapseListGroup6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading6">
          <ul class="list-group">

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'ReceptionOfLoopRatio'}">
                接诊环比情况
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'MedicalExpensePayment'}">
                医疗费用支付
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'OneWeekEmergencyResponse'}">
                一周急诊接诊量
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'Top5WasHospitalizedLastMonth'}">
                上月住院收治TOP5
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'IncidenceOfSpecialDiseaseArea'}">
                特症地区发病率
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'AgeIncidenceOfSpecialDisease'}">
                特症年龄发病率
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'OneYearCommonDisease'}">
                常见疾病的人数
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'HospitalizationRatio'}">
                住院比例
              </span>
            </li>

          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["sidebar", "settingConfig"])
  }
};
</script>

