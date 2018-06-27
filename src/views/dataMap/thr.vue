<template>
    <div id='theme4'>
        <canvas-bg></canvas-bg>
        <canvas-bg :class="{'none':settingConfig.bgStyle!='3'||settingConfig.bgStyle=='2'}"></canvas-bg>
        <div class="background" style="top:0">
            <video :class="{'none':settingConfig.bgStyle!='2'}" id="bgVideo" loop preload src='~@/assets/mv/mov.mp4'></video>
        </div>
        <div style="top:0" :class="{'none':settingConfig.bgStyle!='2'}" class="bgMirror" :style="{'opacity':settingConfig.brightness/100}"></div>

        <!-- 可拖拽的容器 -->
        <echarts-menu></echarts-menu>
        <div class="container-fluid main" id='mainMap' :class="{'bgBlue':settingConfig.bgStyle=='1'}">
            <div class="row">
                <header style="height:6vh;margin-bottom: 1vh">
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

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 height300">
                    <div class="height33 borderBlue">
                        <div class="bg"></div>
                        <div class="content">
                            <div class="text-center height100">
                                机器部署概要
                                <div class="row height100">
                                    <div class="col-xs-10 col-col-xs-offset-2 padding10">
                                        <svg-icon icon-class="heji" /> 总数：
                                        <span id="total-terminals-num"></span>
                                    </div>
                                    <div class="col-xs-10 col-col-xs-offset-2 padding10">
                                        <svg-icon icon-class="online" /> 在线：
                                        <span id="online-terminals-num"></span>
                                    </div>
                                    <div class="col-xs-10 col-col-xs-offset-2 padding10">
                                        <svg-icon icon-class="outline" /> 离线：
                                        <span id="offline-terminals-num"></span>
                                    </div>
                                    <div class="col-xs-10 col-col-xs-offset-2 padding10">
                                        <svg-icon icon-class="outline" /> 在线率：
                                        <span id="offline-terminals-pers">0</span>
                                    </div>
                                    <!-- 标准仪表盘 -->
                                    <!-- <div class="col-xs-12 height100">
                                        <all-echarts left2Key="terminals" constainerClass=""></all-echarts>
                                    </div> -->
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="height33 borderBlue">
                        <div class="bg"></div>
                        <div class="content">
                            <!-- 机器部署概要 -->
                            <all-echarts left2Key="left1" constainerClass=""></all-echarts>
                        </div>
                    </div>
                    <div class="height33 borderBlue">
                        <div class="bg"></div>
                        <div class="content">
                            <all-echarts left2Key="left2" constainerClass=""></all-echarts>
                        </div>
                    </div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 borderBlue height300">
                    <div>
                        <map-echart></map-echart>
                    </div>
                    <div class="ball">
                        <div class="ball-cube">
                            <div class="x1"></div>
                            <div class="x2"></div>
                            <div class="x3"></div>
                            <div class="x4"></div>
                            <div class="x5"></div>
                            <div class="x6"></div>
                            <div class="x7"></div>
                            <div class="x8"></div>
                            <div class="x9"></div>
                            <div class="y1"></div>
                            <div class="y2"></div>
                            <div class="y3"></div>
                            <div class="y4"></div>
                            <div class="y5"></div>
                            <div class="y6"></div>
                            <div class="y7"></div>
                            <div class="y8"></div>
                            <div class="y9"></div>
                        </div>
                    </div>
                </div>

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 borderBlue height300">
                    <div class="height33 borderBlue">
                        <div class="bg"></div>
                        <div class="content">
                            <all-echarts left2Key="bottom1" constainerClass=""></all-echarts>
                        </div>
                    </div>

                    <div class="height33 borderBlue">
                        <div class="bg"></div>
                        <div class="content">
                            <all-echarts left2Key="bottom2" constainerClass=""></all-echarts>
                        </div>
                    </div>

                    <div class="height33 borderBlue">
                        <div class="bg"></div>
                        <div class="content">
                            <all-echarts left2Key="bottom3" constainerClass=""></all-echarts>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 全屏显示的容器 -->
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

            <!-- 自定义配置 -->
            <el-dialog :title="$t('themeSetting.title')" :visible.sync="dialogFormVisible">
                <el-form :model="settingConfig">
                    <el-form-item :label="$t('themeSetting.labelBg')" :label-width="formLabelWidth">
                        <el-radio v-model="settingConfig.bgStyle" label='1'>蓝色</el-radio>
                        <el-radio v-model="settingConfig.bgStyle" label='2'>视频</el-radio>
                        <el-radio v-model="settingConfig.bgStyle" label='3'>星空</el-radio>
                    </el-form-item>
                    <el-form-item :label="$t('themeSetting.labelOpacity')" :label-width="formLabelWidth">
                        <el-slider v-model="settingConfig.brightness"></el-slider>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{$t('el.messagebox.confirm')}}</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style lang="sass">
@import "src/assets/css/theme4.scss";
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
// 响应式导航按钮
import Hamburger from "@/components/Hamburger";
// 语言选择
import LangSelect from "@/components/LangSelect";
// canvas 背景
import CanvasBg from "@/views/dataMap/echarsCmponents/canvas";
import {
  TermType,
  DatetermBroken,
  AppUseRanking,
  UserActivity,
  CityTermRanking,
  HorLineEchart,
  DomainEchart,
  ServiceWorkingNum,
  ProductType,
  TerminalTypeStatistics,
  MapEchart,
  EchartsMenu,
  AllEcharts
} from "./echarsCmponents/index.js";
export default {
  data() {
    return {
      termData: "",
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  components: {
    TermType,
    DatetermBroken,
    AppUseRanking,
    UserActivity,
    CityTermRanking,
    HorLineEchart,
    DomainEchart,
    ServiceWorkingNum,
    ProductType,
    TerminalTypeStatistics,
    MapEchart,
    LangSelect,
    CanvasBg,
    Hamburger,
    EchartsMenu,
    AllEcharts
  },
  computed: {
    ...mapGetters(["settingConfig", "sidebar", "dragConfigData"])
  },
  created(){
    //   sessionStorage.setItem('echartsContainer','2')
  },
  methods: {
    showMenu() {
      $("#mainMap").toggleClass("menuShow");
      let param = { opened: !this.sidebar.opened };
      this.$store.dispatch("SET_SLDEBAR", param);
    },
    setting() {
      $(".bgSetting").toggleClass("is-active");
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    refresh() {
      this.$router.push("/refresh");
    }
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
        sessionStorage.setItem("video", val.video);
        sessionStorage.setItem("canvasBg", val.canvasBg);
        sessionStorage.setItem("brightness", val.brightness);
        sessionStorage.setItem("pageStyle", val.pageStyle);
      },
      deep: true
    }
  }
};
</script>

