<template>
  <div>

    <div class="background">
      <video :class="{'none':settingConfig.bgStyle!='2'}" id="bgVideo" @load="palyVideo" loop preload src='~@/assets/mv/mov.mp4'></video>
    </div>
    <div :class="{'none':settingConfig.bgStyle!='2'}" class="bgMirror" :style="{'opacity':parseInt(settingConfig.brightness+40)/100}"></div>
    <!-- </div>-->

    <!-- 可拖拽的容器 
    <echarts-menu></echarts-menu>
    <div id="mainMap" :class="{'bgBlue':settingConfig.video!='1'}">-->
    <echarts-menu></echarts-menu>
    <div id="mainMap" :class="{'bgBlue':settingConfig.bgStyle=='1'}">
      <header>
        <h2>
          <span class="tx">
            <b>{{$t('dataMap.VesystemBigDataVisualizationAnalysis')}}</b>
          </span>
        </h2>
        <div class="setting" @click="showMenu">
          <hamburger class="hamburger-container" :isActive="sidebar.opened"></hamburger>
        </div>
        <!-- 配置功能的导航条 -->
        <div class="config">
          <!-- 语言选择 -->
          <div class="inline-block pull-left m-r-md">
            <lang-select class="international right-menu-item"></lang-select>
          </div>
          <!-- 调控背景播放 -->
          <div class="inline-block pull-left" @click="setting">
            <svg-icon icon-class="system" className="bgSetting" />
          </div>
        </div>
      </header>
      <div id="main">
        <div class="left animated fadeInLeft animate-setting">
          <!--设备类型比例-->
          <all-echarts :left2Key="left1Key" :constainerClass="leftClass"></all-echarts>

          <!--设备故障率-->
          <!-- AllEcharts -->
          <all-echarts :left2Key="left2Key" :constainerClass="leftClass"></all-echarts>
        </div>
        <div class="right animated fadeInRight animate-setting">
          <!--appUseRanking-->
          <all-echarts :left2Key="right1Key" :constainerClass="rightClass"></all-echarts>
          <!--userActivity-->
          <all-echarts :left2Key="right2Key" :constainerClass="rightClass"></all-echarts>
        </div>

        <div class="center animated fadeInUp animate-setting">
          <div class="row">
            <div class="col-xs-6 text-center">
              <p>{{$t('dataMap.TotalNumberOfDeployedTerminals')}}</p>
              <h3 id="total-terminals-num">
                <span>0</span>
              </h3>
            </div>
            <div class="col-xs-6 text-center">
              <p>{{$t('dataMap.CurrentOnlineTerminal')}}</p>
              <h3 id="online-terminals-num">
                <span>0</span>
              </h3>
            </div>
          </div>
          <map-echart></map-echart>
          <!--背景地图-->
        </div>

        <div class="bottom animated fadeInUp animate-setting">

          <all-echarts :left2Key="bottom1Key" :constainerClass="bottomClass"></all-echarts>

          <!--流量损耗去向-->
          <all-echarts :left2Key="bottom2Key" :constainerClass="bottomClass2"></all-echarts>

          <!--应用使用频率变化-->
          <all-echarts :left2Key="bottom3Key" :constainerClass="bottomClass2"></all-echarts>

          <!--每月开机数量-->
          <all-echarts :left2Key="bottom4Key" :constainerClass="bottomClass3"></all-echarts>
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
      <!-- 自定义配置 -->
      <el-dialog :title="$t('themeSetting.title')" :visible.sync="dialogFormVisible">
        <el-form :model="settingConfig">
          <el-form-item :label="$t('themeSetting.labelBg')" :label-width="formLabelWidth">
            <el-radio v-model="settingConfig.bgStyle" label="1">蓝色</el-radio>
            <el-radio v-model="settingConfig.bgStyle" label="2">视频</el-radio>
            <el-radio v-model="settingConfig.bgStyle" label="3">星空</el-radio>
          </el-form-item>
          <!--<el-form-item :label="$t('themeSetting.pageStyle')" :label-width="formLabelWidth">
            <el-radio v-model="settingConfig.pageStyle" label='styleDefault'>{{$t('themeSetting.styleDefault')}}</el-radio>
            <el-radio v-model="settingConfig.pageStyle" label='theme1'>{{$t('themeSetting.styleTheme1')}}</el-radio>
            <el-radio v-model="settingConfig.pageStyle" label='theme2'>{{$t('themeSetting.styleTheme2')}}</el-radio>
          </el-form-item>-->
          <el-form-item :label="$t('themeSetting.labelOpacity')" :label-width="formLabelWidth">
            <el-slider v-model="settingConfig.brightness" max=80></el-slider>
          </el-form-item>
          <el-form-item label="接口地址" :label-width="formLabelWidth">
            <el-input v-model="settingConfig.apiUrl"></el-input>
          </el-form-item>
          <el-form-item label="地图类型" :label-width="formLabelWidth">
            <el-radio v-model="settingConfig.echartType" label=1>2D</el-radio>
            <el-radio v-model="settingConfig.echartType" label=2>3D</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">{{$t('el.messagebox.cancel')}}</el-button> -->
          <el-button @click="confirmBox">{{$t('el.messagebox.confirm')}}</el-button>
        </div>
      </el-dialog>

      <!-- 全屏显示的容器 -->
      <div id="fullScreenContainer">
        <div id="fullScreen">
        </div>
      </div>
      <!-- canvasBg 
      <canvas-bg style="position:relative;top:-55px" :class="{'none':settingConfig.canvasBg!='1'}"></canvas-bg>-->
      <canvas-bg style="position:relative;top:-55px" :class="{'none':settingConfig.bgStyle!='3'||settingConfig.bgStyle=='2'}"></canvas-bg>
    </div>
  </div>

</template>
<script>
// 响应式导航按钮
import Hamburger from "@/components/Hamburger";
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
// 引入离线的js文件
import { mapDataJs } from "static/json/data";
// 地图的离线数据
// import { Infos } from "static/json/jsons";
// 图片的 地址资源
import settingImg from "@/assets/img/avatar.jpg";
// canvas 背景
import CanvasBg from "@/views/dataMap/echarsCmponents/canvas";

import {
  TermType,
  DatetermBroken,
  AllEcharts,
  EchartsMenu,
  MapEchart
} from "./echarsCmponents";
// 语言选择
import LangSelect from "@/components/LangSelect";

var theme = {
  fontColor: "#8BA0B9"
};

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      leftClass: "left-map-container",
      left1Key: "left1",
      left2Key: "left2",
      right1Key: "right1",
      right2Key: "right2",
      rightClass: "right-map-container",
      bottom1Key: "bottom1",
      bottom2Key: "bottom2",
      bottom3Key: "bottom3",
      bottom4Key: "bottom4",
      bottomClass: "bottom-map-container",
      bottomClass2: "bottom-map-container2",
      bottomClass3: "bottom-map-container no-margin",
      settingImg: settingImg,
      cityMap: cityMap,
      dblist: null
    };
  },
  components: {
    TermType,
    DatetermBroken,
    AllEcharts,
    Hamburger,
    LangSelect,
    EchartsMenu,
    CanvasBg,
    MapEchart
  },
  methods: {
    palyVideo() {
      if (
        this.settingConfig.video == "1" ||
        this.settingConfig.bgStyle == "2"
      ) {
        setTimeout(function() {
          document.getElementById("bgVideo").play();
        }, 1000);
        // document.getElementById("bgVideo").play();
      } else {
        document.getElementById("bgVideo").pause();
      }
    },
    refresh() {
      this.$router.push("/refresh");
    },
    showMenu() {
      $("#mainMap").toggleClass("menuShow");
      let param = { opened: !this.sidebar.opened };
      this.$store.dispatch("SET_SLDEBAR", param);
    },
    init() {
      this.MainMapDom = this.$echarts.init(document.getElementById("MainMap"));
    },

    setting() {
      $(".bgSetting").toggleClass("is-active");
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    confirmBox() {
      this.dialogFormVisible = false;
      if (
        this.settingConfig.apiUrl != sessionStorage.apiUrl
        // "http://127.0.0.1:8080/dataquery/MapAjaxInfoServlet.do"
      ) {
        sessionStorage.setItem("apiUrl", this.settingConfig.apiUrl);
        window.location.reload();
      }
    }
  },
  computed: {
    ...mapGetters([
      "echartsData",
      "dragConfigData",
      "loadingConfig",
      "sidebar",
      "settingConfig"
    ])
  },
  mounted() {
    this.$nextTick(function() {
      $("body").css({ overflow: "hidden" });
      if (this.settingConfig.canvasBg != "1") {
        $(".bgCanvas").remove();
      }
      // this.canvasBg("starts", 230, 2000, 60, 2, 500000, 1,'#021637');
      if (
        this.settingConfig.video == "1" ||
        this.settingConfig.bgStyle == "2"
      ) {
        setTimeout(function() {
          document.getElementById("bgVideo").play();
        }, 1000);
      } else {
        document.getElementById("bgVideo").pause();
      }
    });
  },
  watch: {
    dragConfigData: {
      handler(val, oldVal) {
        let param = { opened: false };
        this.$store.dispatch("SET_SLDEBAR", param);
        this.$router.push("/refresh");
      },
      deep: true
    },
    settingConfig: {
      handler(val, oldVal) {
        if (val.video == "1" || val.bgStyle == "2") {
          document.getElementById("bgVideo").play();
        } else {
          document.getElementById("bgVideo").pause();
        }
        console.log(val);
        sessionStorage.setItem("video", val.video);
        sessionStorage.setItem("canvasBg", val.canvasBg);
        sessionStorage.setItem("brightness", val.brightness);
        sessionStorage.setItem("pageStyle", val.pageStyle);
        sessionStorage.setItem("bgStyle", val.bgStyle);
        // if (val.echartType != oldVal.echartType) {
        //   console.log("dif");
        //   this.$router.push("/refresh");
        // }
        // sessionStorage.setItem("echartType", val.echartType);
        // sessionStorage.setItem("apiUrl", val.apiUrl);
      },
      deep: true
    }
  }
};
</script>


