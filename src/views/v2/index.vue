<template>
  <div class="wapper">
    <echarts-menu></echarts-menu>
    <div class="header animated fadeInDown animate-setting">
      <div class="header-title">和信智能数据感知分析平台</div>
      <div class="header-menu" @click="showMenu">
        <img src="@/assets/img/more.png" alt="">
      </div>
      <div class="header-setting" @click="setting">
        <!-- <img src="@/assets/img/user.png" alt=""> -->
        <svg-icon icon-class="system" className="bgSetting" />
      </div>
    </div>

    <div class="main ">
      <!--left-->
      <div id="left" class="animated fadeInRight animate-setting">

        <all-echarts :left2Key="left1"></all-echarts>

        <all-echarts :left2Key="left2"></all-echarts>

      </div>
      <!--right-->
      <div id="right" class="animated fadeInLeft animate-setting">
        <all-echarts :left2Key="right1"></all-echarts>

        <all-echarts :left2Key="right2"></all-echarts>

      </div>

      <div id="center" class="animated fadeInUp animate-setting">
        <!-- <div id="map" class="echart-container"></div> -->
        <map-echart></map-echart>
      </div>

      <!--bottom-->
      <div id="bottom" class="animated fadeInDown animate-setting">

        <all-echarts :left2Key="bottom1"></all-echarts>
        <all-echarts :left2Key="bottom2"></all-echarts>
        <all-echarts :left2Key="bottom3"></all-echarts>
        <all-echarts :left2Key="bottom4"></all-echarts>

      </div>

    </div>
    <!-- 详情 -->
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

    <!-- 全屏显示的容器 -->
    <div id="fullScreenContainer" @click="closeFull">
      <div id="fullScreen">
      </div>
    </div>

    <!-- 自定义配置 -->
    <el-dialog :title="$t('themeSetting.title')" :visible.sync="dialogFormVisible">
      <el-form :model="settingConfig">
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

  </div>

</template>
<script>
// 响应式导航按钮
import Hamburger from "@/components/Hamburger";
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
// 引入离线的js文件
import { mapDataJs } from "static/json/data";
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
      left1: "left1",
      left2: "bottom2",

      right1: "right1",
      right2: "right2",

      bottom1: "bottom3",
      bottom2: "left2",
      bottom3: "bottom1",
      bottom4: "bottom4",

      dialogFormVisible: false,
      formLabelWidth: "120px",
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
    closeFull() {
      $("#fullScreenContainer").animate({ height: "0", width: "0" });
    },
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
        // document.getElementById("bgVideo").pause();
      }
    },
    refresh() {
      this.$router.push("/refresh");
    },
    showMenu() {
      $("body").toggleClass("menuShow");
      // $("#mainMap").toggleClass("menuShow");
      // let param = { opened: !this.sidebar.opened };
      // this.$store.dispatch("SET_SLDEBAR", param);
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
        // document.getElementById("bgVideo").pause();
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
          // document.getElementById("bgVideo").pause();
        }
        console.log(val);
        sessionStorage.setItem("video", val.video);
        sessionStorage.setItem("canvasBg", val.canvasBg);
        sessionStorage.setItem("brightness", val.brightness);
        sessionStorage.setItem("pageStyle", val.pageStyle);
        sessionStorage.setItem("bgStyle", val.bgStyle);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/v2.css";
body {
  overflow: auto !important;
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
  .open {
    left: 250px;
  }
}
.wapper {
  min-width: 1600px;
  min-height: 900px;
  height: 100vh;
  overflow-x: auto;
  background: url(/../../../img/bg.png);
}
#fullScreenContainer{
  background: #000;
}
</style>



