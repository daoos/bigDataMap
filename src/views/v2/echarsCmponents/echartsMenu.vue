<template>
  <div id="dragContainer" :class="{'open':sidebar.opened}" :style="{'opacity':settingConfig.video=='1'?settingConfig.brightness/100:1}">
    <div class="panel-group table-responsive menuContainer" role="tablist">
      <!-- 公司logo -->
      <div class="companyLogo">
        <img src="~@/assets/img/logo.png" alt="">
      </div>
      <div class="panel panel-primary leftMenu">
        <!-- 利用data-target指定要折叠的分组列表 -->
        <div v-menu class="panel-heading"  data-toggle="collapse" data-target="#collapseListGroup1" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="radio" /> {{$t('echartsTitle.ProportionalAnalysis')}}
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
        <div id="collapseListGroup1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
          <ul class="list-group">
            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'productType'}">
              <span class="menu-item-left">
                {{$t('echartsTitle.ProductTypeRatio')}}
              </span>
            </li>
            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'customType'}">
              <span class="menu-item-left">
                {{$t('echartsTitle.customType')}}
              </span>
            </li>
          </ul>
        </div>

        <div v-menu class="panel-heading"  data-toggle="collapse" data-target="#collapseListGroup2" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="top" /> {{$t('echartsTitle.RankingStatistics')}}
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
        <div id="collapseListGroup2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
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

        <div v-menu class="panel-heading"  data-toggle="collapse" data-target="#collapseListGroup4" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="ComprehensiveData" /> {{$t('echartsTitle.ComprehensiveData')}}
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
        <div id="collapseListGroup4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
          <ul class="list-group">

            <li class="list-group-item" draggable="true" v-menudrag="{'echartId':'termTypeRadio'}">
              <span class="menu-item-left">
                <!-- {{$t('echartsTitle.EquipmentFailureRate')}} -->
                终端类型统计
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'dateTermBroken'}">
                {{$t('echartsTitle.EquipmentFailureRate')}}
              </span>
            </li>

            <li class="list-group-item">
              <span class="menu-item-left" draggable="true" v-menudrag="{'echartId':'terminals'}">
                <!-- {{$t('echartsTitle.MonthlyBootNumber')}} -->
                终端类型统计
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

