<!--用来显示不同的表格-->
<template>
  <div class="height100">
    <div class="item-title">
      <img class="item-title-icon" src="@/assets/img/echartsIcon.png" alt=""> {{echartTitle}}
      <!-- 终端类型统计 -->
      <div class="tool-group">
        <div class="tool" title="新开页面" @click="openNew">
          <svg-icon icon-class="radio" className="item-title-icon" />
        </div>
        <div class="tool" title="全屏" @click="fullScreen">
          <svg-icon icon-class="heji" className="item-title-icon" />
        </div>
        <div class="tool" title="详情" @click="echartDetail">
          <svg-icon icon-class="top" className="item-title-icon" />
        </div>
      </div>
    </div>
    <div :id="echartId" class="echart-container"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
export default {
  props: {
    // echarts 的唯一标识
    echartsUniqueCode: {
      type: String,
      default: ""
    },
    //   标题
    echartTitle: {
      type: String,
      default: ""
    },
    // 容器的id
    echartId: {
      type: String,
      default: ""
    },
    // 表格的配置
    echartOption: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 数据请求的关键字
    echartAjaxType: {
      type: String,
      default: ""
    },
    // 详情
    detail: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  created() {
    this.option = this.echartOption;
  },
  data() {
    return {
      curentCityCode: 86,
      curentCityName: "中国",
      dom: "",
      option: {},
      domArr: JSON.parse(sessionStorage.getItem("domArr"))
    };
  },
  computed: {
    ...mapGetters(["echartsData", "loadingConfig", "settingConfig"])
  },
  mounted() {
    this.render(this.echartId);
    this.$nextTick(() => {
      this.$emit("changeDom", this.dom);
      window.onresize = () => {
        this.dom.resize();
      };
    });
  },
  methods: {
    openNew() {
      var cityCode = this.$route.params.cityCode;
      if (cityCode === undefined) {
        window.open("#/v2/oneEcharts/" + this.echartsUniqueCode);
      } else {
        window.open(
          "#/v2/oneEcharts/" + this.echartsUniqueCode + "/" + cityCode
        );
      }
    },
    fullScreen() {
      // 将当前模块中的数据填充到首页的部分
      var fullId = this.echartId + "Full";
      $("#fullScreenContainer").html(
        '<div id="' +
          fullId +
          '" style="height:90vh;width:100vw;margin-top:10vh"></div>'
      );
      this.render(fullId);
      $("#fullScreenContainer").animate({ height: "100vh", width: "100vw" });
    },
    echartDetail() {
      var table =
        '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>';
      this.detail.thead.map(v => {
        table += "<th >" + v.lable + "</th>";
      });
      table += "</tr>";
      this.detail.data.map(v => {
        table +=
          "<tr>" +
          this.detail.thead.map(vl => {
            return "<td>" + v[vl["props"]] + "</td>";
          });
        +"</tr>";
      });
      table += "</tbody></table>";
      $(".modal-body").html(table);
      $("#myModal").modal();
    },
    render(termType) {
      this.dom = this.$echarts.init(document.getElementById(termType));
      let params = {
        curentCityCode: this.curentCityCode,
        dz_type: this.echartAjaxType
      };
      this.dom.showLoading();
      this.$store.dispatch("GET_ECHARTSDATA", params).then(data => {
        if (data.data !== undefined && data.data.result !== undefined) {
          data = data.data.result;
        } else {
          data = [];
        }
        ///////////////////////每个表格的渲染方式不一样///////////////////////////////////
        this.$emit("changeOption", data);
        // this.option.xAxis[0].data = [];
        // this.option.series[0].data = [];
        // this.detail.data = [];
        // if (data.length > 0) {
        //   data.map(v => {
        //     this.detail.data.push(v);
        //     this.option.xAxis[0].data.push(v.system);
        //     this.option.series[0].data.push(v.systemNum);
        //   });
        // }
        // console.log(this.option);
        // this.dom.setOption(this.option);
        ///////////////////////////////////////////////////////////////
        this.dom.hideLoading();
      });
    }
  },
  watch: {
    echartOption: {
      handler(val, oldVal) {
        this.option = val;
        // console.log(val, this.echartId);
        // this.dom = this.$echarts.init(document.getElementById(this.echartId));
        this.dom.setOption(this.option);
        this.dom.hideLoading();
        //将dom 返回给所属的页面
        this.$emit("changeDom", this.dom);
      },
      deep: true
    },
    detail(val) {
      this.detail = val;
    },
    $route(val, oldVal) {
      this.curentCityCode = cityMap[val.params.cityCode];
      this.render(this.echartId);
      // console.log(val, oldVal, this.curentCityCode,this.dom,this.echartId);
    }
  }
};
</script>