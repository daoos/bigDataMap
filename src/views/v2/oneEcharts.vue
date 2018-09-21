<template>
  <div class="wapper">
    <div class="header animated fadeInDown animate-setting">
      <div class="header-title">和信智能数据感知分析平台</div>
      <div class="header-menu">
        <img src="@/assets/img/more.png" alt="">
      </div>
      <div class="header-setting">
        <img src="@/assets/img/user.png" alt="">
      </div>
    </div>
    <div class="main ">
      <div id="oneEcharts" class="animated fadeInDown animate-setting">
        <!-- <div class="echart-item">
                    <div class="item-title">
                        <img class="item-title-icon" src="@/assets/img/echartsIcon.png" alt=""> 终端类型统计
                        <div class="tool-group">
                            <div class="tool" id="tool1" title="新开页面" @click="openNew">
                                <svg-icon icon-class="radio" className="item-title-icon" />
                            </div>
                            <div class="tool" id="tool2" title="全屏" @click="fullScreen">
                                <svg-icon icon-class="heji" className="item-title-icon" />
                            </div>
                            <div class="tool" id="tool3" title="详情" @click="echartDetail">
                                <svg-icon icon-class="top" className="item-title-icon" />
                            </div>
                        </div>

                    </div>

                    <div id="termType" class="echart-container"></div>
                </div> -->
        <all-echarts :left2Key="curentEchart"></all-echarts>
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
  </div>
</template>
<script>
import { AllEcharts } from "./echarsCmponents";
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
export default {
  components: {
    AllEcharts
  },
  data() {
    return {
      curentCityCode: 86,
      dom: "",
      option: {
        grid: {
          left: "10%",
          top: "10%",
          bottom: "10%"
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 12
          },
          formatter: "{b0}:{c0}"
        },
        yAxis: {
          margin: -4,
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#02090C"]
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 8
            }
          }
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: 10
              }
            }
          }
        ],
        series: [
          {
            type: "pictorialBar",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(41, 121, 255, 1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 192, 255, 1)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            symbol: "rect",
            symbolRepeat: true, // "fixed",
            symbolMargin: "5",
            symbolClip: true,
            symbolSize: ["40", "15"],
            symbolOffset: [10, 0],
            data: [],
            z: 10
          }
        ]
      },
      detail: {
        thead: [
          { lable: "设备类型", props: "system" },
          { lable: "数量", props: "systemNum" },
          { lable: "百分比", props: "proportion" }
        ],
        data: []
      },
      curentEchart: ""
    };
  },
  computed: {
    ...mapGetters(["echartsData", "loadingConfig", "settingConfig"])
  },
  created() {
    console.log(this.$route.params);
    this.curentEchart = this.$route.params.curentEchartsType;
  },
  mounted() {
    // this.render("termType");
  },
  methods: {
    closeFull() {
      $("#fullScreenContainer").animate({ height: "0", width: "0" });
    },
    openNew() {
      var cityCode = this.$route.params.cityCode;
      if (cityCode === undefined) {
        window.open("#/v2/oneEcharts/termTypeRadio");
      } else {
        window.open("#/v2/oneEcharts/termTypeRadio/" + cityCode);
      }
      // alert("openNew");
    },
    fullScreen() {
      // 将当前模块中的数据填充到首页的部分
      $("#fullScreenContainer").html(
        '<div id="termType1" style="height:90vh;width:100vw;margin-top:10vh"></div>'
      );
      this.render("termType1");
      $("#fullScreenContainer").animate({ height: "100vh", width: "100vw" });
      // alert("fullScreen");
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
        dz_type: "systemType"
      };
      this.$store.dispatch("GET_ECHARTSDATA", params).then(data => {
        this.dom.showLoading();
        data = data.data.result;
        this.option.xAxis[0].data = [];
        this.option.series[0].data = [];
        this.detail.data = [];
        if (data.length > 0) {
          data.map(v => {
            this.detail.data.push(v);
            this.option.xAxis[0].data.push(v.system);
            this.option.series[0].data.push(v.systemNum);
          });
          console.log(this.detail);
          this.dom.setOption(this.option);
        }
        this.dom.hideLoading();
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/v2.css";
body {
  overflow: auto !important;
}
.wapper {
  min-width: 1600px;
  min-height: 900px;
  height: 100vh;
  overflow-x: auto;
  background: url(/../../../img/bg.png);
}
</style>
