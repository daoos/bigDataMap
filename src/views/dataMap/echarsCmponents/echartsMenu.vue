<template>
  <div id="dragContainer" :class="{'open':sidebar.opened}" :style="{'opacity':settingConfig.video=='1'?settingConfig.brightness/100:1}">
    <div class="panel-group table-responsive menuContainer" role="tablist">
      <!-- 公司logo -->
      <div class="companyLogo">
        <img src="~@/assets/img/logo.png" alt="">
      </div>
      <div class="panel panel-primary leftMenu">
        <!-- 利用data-target指定要折叠的分组列表 -->

        <!-- 教育数据 -->
        <div v-menu class="panel-heading" id="collapseListGroupHeading6" data-toggle="collapse" data-target="#collapseListGroup6" role="tab">
          <h4 class="panel-title">
            <svg-icon icon-class="ComprehensiveData" /> 教育数据
            <svg-icon icon-class="down" class="pull-right downIcon" />
          </h4>
        </div>
        <div id="collapseListGroup5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading6">
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

