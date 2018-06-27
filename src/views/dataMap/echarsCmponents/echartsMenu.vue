<template>
  <div id="dragContainer" :class="{'open':sidebar.opened}" :style="{'opacity':settingConfig.video=='1'?settingConfig.brightness/100:1}">
    <div class="panel-group table-responsive menuContainer" role="tablist">
      <!-- 公司logo -->
      <div class="companyLogo">
        <img src="~@/assets/img/logo.png" alt="">
      </div>
      <div class="panel panel-primary leftMenu">
        <!-- 利用data-target指定要折叠的分组列表 -->
        <div v-if=false v-menu class="panel-heading" id="collapseListGroupHeading1" data-toggle="collapse" data-target="#collapseListGroup1" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="radio" /> {{$t('echartsTitle.ProportionalAnalysis')}}
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
        <div v-if=false id="collapseListGroup1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
          <ul class="list-group">
            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'termTypeRadio'}">
              <span class="menu-item-left">
                {{$t('echartsTitle.DeviceTypeRatio')}}
              </span>
            </li>
            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'productType'}">
              <span class="menu-item-left">
                {{$t('echartsTitle.ProductTypeRatio')}}
              </span>
            </li>
            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'terminalTypeStatistics'}">
              <span class="menu-item-left">
                {{$t('echartsTitle.termTypeStatic')}}
              </span>
            </li>

            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'customType'}">
              <span class="menu-item-left">
                {{$t('echartsTitle.customType')}}
              </span>
            </li>
          </ul>
        </div>

        <div v-if=false v-menu class="panel-heading" id="collapseListGroupHeading1" data-toggle="collapse" data-target="#collapseListGroup2" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="top" /> {{$t('echartsTitle.RankingStatistics')}}
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
        <div v-if=false id="collapseListGroup2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
          <ul class="list-group">

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'appUseRanking'}">
                {{$t('echartsTitle.ApplicationUsageFrequencyStatistics')}}
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'userActivity'}">
                {{$t('echartsTitle.UserActivity')}}
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'cityTermRanking'}">
                {{$t('echartsTitle.ServerNationalDeploymentTOP')}}
              </span>
            </li>
          </ul>
        </div>

        <div v-if=false v-menu class="panel-heading" id="collapseListGroupHeading1" data-toggle="collapse" data-target="#collapseListGroup4" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="ComprehensiveData" /> {{$t('echartsTitle.ComprehensiveData')}}
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
        <div v-if=false id="collapseListGroup4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
          <ul class="list-group">

            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'dateTermBroken'}">
              <span class="menu-item-left">
                {{$t('echartsTitle.EquipmentFailureRate')}}
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'domainEchart'}">
                {{$t('echartsTitle.ApplicationUsageFrequencyChanges')}}
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'domainEchart'}">
                {{$t('echartsTitle.MonthlyBootNumber')}}
              </span>
            </li>
          </ul>
        </div>

        <!-- 教育数据 -->
        <div v-if=false v-menu class="panel-heading" id="collapseListGroupHeading6" data-toggle="collapse" data-target="#collapseListGroup6" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="ComprehensiveData" /> 教育数据
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <div v-if=false id="collapseListGroup5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading6">
          <ul class="list-group">

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'ExtracurricularActivities'}">
                课外活动
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'StudentExamination'}">
                全年学生考试
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'ConsumingOfHomework'}">
                义务教育阶段家庭作业耗时
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'AnnualLocalEntranceExamination'}">
                年度地方升学考试
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'StructureOfStudentEnrollment'}">
                季度招生生源结构
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'BottomChart6'}">
                综合课程设置
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'BottomChart7'}">
                地方教育资源结构
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'BottomChart8'}">
                教职工学历资质
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'BottomChart9'}">
                本季度教学指标
              </span>
            </li>
            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'BottomChart11'}">
                教育系统虚拟桌面部署支出
              </span>
            </li>

          </ul>
        </div>

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

