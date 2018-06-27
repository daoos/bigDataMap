<template>
    <div>

        <div class="background">
            <video :class="{'none':settingConfig.bgStyle!='2'}" id="bgVideo" loop preload src='~@/assets/mv/mov.mp4'></video>
        </div>
        <div :class="{'none':settingConfig.bgStyle!='2'}" class="bgMirror" :style="{'opacity':settingConfig.brightness/100}"></div>
        <!-- 可拖拽的容器 -->
        <echarts-menu></echarts-menu>
        <!-- menu 
        <div class="clearfix appMain" id="mainMap" :class="{'canvasMain':settingConfig.canvasBg!='1'}">-->
        <div class="clearfix appMain" id="mainMap" :class="{'canvasMain':settingConfig.bgStyle!='3'}">
            <!-- header -->
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
            <div class="leftContainer">
                <div class="top10">
                    <div class="top10Title">
                        <svg-icon icon-class="yunbushu" className="icon" /> {{$t('echartsTitle.ServerNationalDeploymentTOP')}}
                    </div>
                    <div class="top10Detail" v-loading="ServerNationalDeploymentTOPLoading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(22,37,92,0.8)" element-loading-text="加载中">
                        <div v-show="ServerNationalDeploymentTOP.length">
                            <div class="top10Item big" v-for="(item,key) in ServerNationalDeploymentTOP" v-bind:key="key">
                                {{item.cityName}}(部署){{item.termNum}}
                            </div>
                        </div>
                        <div v-show="!ServerNationalDeploymentTOP.length">
                            <div class="top10Item big">
                                没有数据！
                            </div>
                        </div>
                    </div>
                </div>

                <div class="top10">
                    <div class="top10Title">
                        <svg-icon icon-class="active" className="icon" /> {{$t('echartsTitle.UserActivity')}}
                    </div>
                    <div class="top10Detail" v-loading="UserActivityLoading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(22,37,92,0.8)" element-loading-text="加载中">
                        <div v-show="!UserActivity.length">
                            <div class="top10Item big" v-for="(item,key) in UserActivity" v-bind:key="key">
                                <!-- UserActivity -->
                                {{item.cityName}}(开机){{item.termNum}}小时
                            </div>
                        </div>
                        <div v-show="!UserActivity.length">
                            <div class="top10Item big">
                                没有数据！
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="centerContainer">
                <div class="map">
                    <map-echart></map-echart>
                </div>
                <div class="warnTable" v-loading="ExcLogLoading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(22,37,92,0.8)" element-loading-text="加载中">
                    <table title="设备警告">
                        <!-- <caption>设备警告</caption> -->
                        <thead>
                            <td>ip</td>
                            <td>所属单位</td>
                            <td>离线时长</td>
                            <td>最后一次</td>
                        </thead>

                        <tr v-if="ExcLog.length" class="big" v-for="(item,key) in ExcLog" v-bind:key="key">
                            <td>{{item.ip}}</td>
                            <td>{{item.citycode}}</td>
                            <td>{{item.runTime}}</td>
                            <td>{{item.lastOnlineTime}}</td>
                        </tr>
                        <tr v-if="!ExcLog.length" class="big">
                            <td colspan="4" v-if="!ExcLogMore">
                                <span>没有数据</span>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4" v-if="ExcLogMore" @click="getDateTermBroken">
                                <span>加载更多</span>
                            </td>
                            <td colspan="4" v-if="!ExcLogMore">
                                <span>没有更多数据了</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="rightContainer">
                <div class="right1">
                    <!-- <div class="right1Title">
                        设备类型
                    </div> -->
                    <div class="rightEchart">
                        <!-- <term-type></term-type> -->
                        <all-echarts left2Key="left1" constainerClass=""></all-echarts>
                    </div>
                </div>
                <div class="right2">
                    <div class="rightEchart">
                        <!-- <dateterm-broken></dateterm-broken> -->
                        <all-echarts left2Key="bottom1" constainerClass=""></all-echarts>
                    </div>
                </div>
                <div class="right3 no-margin">
                    <div class="rightEchart">
                        <!-- <domain-echart></domain-echart> -->
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
        <!-- 弹出的模态框 -->
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
                <!-- <el-button @click="dialogFormVisible = false">{{$t('el.messagebox.cancel')}}</el-button> -->
                <el-button @click="dialogFormVisible = false">{{$t('el.messagebox.confirm')}}</el-button>
            </div>
        </el-dialog>
        <!-- canvasBg 
        <canvas-bg style="position:relative;top:-100vh" :class="{'none':settingConfig.canvasBg!='1'}"></canvas-bg>-->
        <canvas-bg style="position:relative;top:-100vh" :class="{'none':settingConfig.bgStyle!='3'||settingConfig.bgStyle=='2' }"></canvas-bg>
    </div>

</template>
<script>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      ServerNationalDeploymentTOP: "",
      ServerNationalDeploymentTOPLoading: true,
      UserActivity: "",
      UserActivityLoading: true,
      ExcLog: [],
      ExcLogLoading: true,
      pageIndex: 1,
      ExcLogMore: true
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
  mounted() {
    let nextMap,
      params = this.$route.params;
    if (cityMap[params.cityCode] !== undefined) {
      nextMap = params.cityCode;
    } else {
      nextMap = "中国";
    }
    this.getCityTermRanking(nextMap);
    this.getUserActive(nextMap);
    this.getDateTermBroken(nextMap);
  },
  methods: {
    refresh() {
      this.$router.push("/refresh");
    },
    setting() {
      $(".bgSetting").toggleClass("is-active");
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    showMenu() {
      $("#mainMap").toggleClass("menuShow");
      let param = { opened: !this.sidebar.opened };
      this.$store.dispatch("SET_SLDEBAR", param);
    },
    // 获取服务器部署 top10
    getCityTermRanking(cityName) {
      this.ServerNationalDeploymentTOPLoading = true;
      this.ServerNationalDeploymentTOP = {};
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }

      let params = {
          curentCityCode: this.curentCityCode,
          dz_type: "cityTermRanking"
        },
        self = this;
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          //   self.ServerNationalDeploymentTOP = xxdata.cityTermRanking["result"];
          self.ServerNationalDeploymentTOP = xxdata.data["result"];
          self.ServerNationalDeploymentTOPLoading = false;
        })
        .catch(err => {
          self.ServerNationalDeploymentTOPLoading = false;
        });
    },
    // 获取终端活跃 top10
    getUserActive(cityName) {
      this.UserActivityLoading = true;
      this.UserActivity = {};
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }
      let params = {
          curentCityCode: this.curentCityCode,
          dz_type: "cityCustomActivity"
        },
        self = this;
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          self.UserActivity = xxdata.data["result"];
          //   self.UserActivity = xxdata.cityCustomActivity["result"];
          self.UserActivityLoading = false;
        })
        .catch(err => {
          self.UserActivityLoading = false;
        });
    },
    // 异常警告 dateTermBroken
    getDateTermBroken(cityName) {
      //   this.ExcLog = {};
      this.ExcLogLoading = true;
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }
      let params = {
          curentCityCode: this.curentCityCode,
          dz_type: "exceptionTerminalList",
          pageIndex: this.pageIndex
        },
        self = this;
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          console.log(params);
          if (xxdata.data.list.length) {
            self.ExcLog.concat(xxdata.data.list);
            self.pageIndex += 1;
          } else {
            self.ExcLogMore = false;
          }
          this.ExcLogLoading = false;
          self.ExcLog = self.ExcLog.concat(xxdata.data.list);
          //   self.UserActivity = xxdata.cityCustomActivity["result"];
        })
        .catch(err => {
          this.ExcLogMore = false;
          this.ExcLogLoading = false;
        });
    }
  },
  // 见识数据是否发生改变
  watch: {
    dragConfigData: {
      handler(val, oldVal) {
        let param = { opened: false };
        this.$store.dispatch("SET_SLDEBAR", param);
        this.$router.push("/refresh");
      },
      deep: true
    },
    $route(val, oldVal) {
      let nextMap,
        params = val.params.cityCode;
      if (cityMap[params] !== undefined) {
        nextMap = params;
      } else {
        nextMap = "中国";
      }
      this.getCityTermRanking(nextMap);
      this.getUserActive(nextMap);
      this.getDateTermBroken(nextMap);
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
<style lang="scss">
@import "src/assets/css/theme3.scss";
.nodataMsg{
    top: 60%;
}
</style>






