<template>
  <div class="echartsContainer" id="domainEchartContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.ApplicationUsageFrequencyChanges')}}</span>
    <div class="bottom-map-container" id="domainEchart" :class="{'visibilityNone':isError}"></div>
    <span class="nodataMsg" :class="{'visibilityNone':!isError}">没有数据！</span>
    <div :class="{'none':settingConfig.echartsContainer!='2'}" class="horn">
      <div class="lt"></div>
      <div class="rt"></div>
      <div class="rb"></div>
      <div class="lb"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
var theme = {
  fontColor: "#8BA0B9"
};
export default {
  data() {
    return {
      domainEchartDom: {},
      domainEchartOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: 10,
          height: 5,
          data: ["wps", "excel", "ps", "word"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            myTool1: {
              show: true,
              title: "应用最近使用频率详情",
              icon: echartBtns.detail,
              onclick() {}
            },
            myTool3: {
              show: true,
              title: "全屏",
              icon: echartBtns.FullScreenPng,
              onclick() {}
            },
            myTool4: {
              show: true,
              title: "新页面打开",
              icon: echartBtns.NewTabPng,
              onclick() {}
            }
          }
        },
        // grid: { height: "55%" },
        grid: { height: "55%", bottom: "23%", left: "15%" },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            }
          }
        ],
        series: [
          {
            name: "wps",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  color: "#334549",
                  borderColor: "#33434D"
                }
              }
            },
            data: [120, 186, 101, 134, 90, 230, 210]
          },
          {
            name: "excel",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  color: "#3E6062",
                  borderColor: "#3D5A5E"
                }
              }
            },
            data: [220, 112, 191, 234, 290, 330, 310]
          },
          {
            name: "ps",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  color: "#344E4F",
                  borderColor: "#355062"
                }
              }
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "word",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  color: "#315A4C",
                  borderColor: "#324D4E"
                }
              }
            },
            data: [320, 50, 301, 334, 390, 330, 320]
          }
        ]
      },
      isError: false
    };
  },
  computed: {
    ...mapGetters(["echartsData", "loadingConfig", "settingConfig"])
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {
      // 自定义 按钮 事件定义
      // 为每个图标分别帮分工不同的事件
      let self = this;
      this.domainEchartOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.domainEchartOption;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>日期</th>" +
          "<th>wps（人次）</th>" +
          "<th>excel（人次）</th>" +
          "<th>ps（人次）</th>" +
          "<th>word（人次）</th>" +
          "</tr>";
        for (var i = 0, l = series.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            opt.xAxis[0].data[i] +
            "</td>" +
            "<td>" +
            opt.series[0].data[i] +
            "</td>" +
            "<td>" +
            opt.series[1].data[i] +
            "</td>" +
            "<td>" +
            opt.series[2].data[i] +
            "</td>" +
            "<td>" +
            opt.series[3].data[i] +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.domainEchartOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "domainEchart",
          echartsHtml =
            '<span class="title_box">应用使用频率变化</span><div class="bottom-map-container" id="domainEchart"></div>',
          option = self.domainEchartOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.domainEchartOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/domainEchart");
        } else {
          window.open("#/dataMap/oneEcharts/domainEchart/" + cityCode);
        }
      };
      let nextMap,
        params = this.$route.params;
      if (cityMap[params.cityCode] !== undefined) {
        nextMap = params.cityCode;
      } else {
        nextMap = "中国";
      }
      this.getData(nextMap);
    });
  },

  methods: {
    init(id, opt) {
      let dom = document.getElementById(id),
        myChart = this.$echarts.init(dom);
      myChart.setOption(opt);
    },
    getData(cityName) {
      var myChart = this.$echarts.init(document.getElementById("domainEchart"));
      myChart.showLoading(this.loadingConfig);
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }
      //
      let params = {
        curentCityCode: this.curentCityCode,
        dz_type: "domainEchart"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          this.isError = false;
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            this.domainEchartOption.legend.data = [];
            this.domainEchartOption.xAxis[0].data = [];
            this.domainEchartOption.series[0].data = [];
            this.domainEchartOption.series[1].data = [];
            this.domainEchartOption.series[2].data = [];
            this.domainEchartOption.series[3].data = [];
            xxdata.data["result"].map(function(val) {
              this.domainEchartOption.legend.data.push();
              self.domainEchartOption.xAxis[0].data.push(val["time"]);
              self.domainEchartOption.series[0].data.push(val["wps"]);
              self.domainEchartOption.series[1].data.push(val["excel"]);
              self.domainEchartOption.series[2].data.push(val["ps"]);
              self.domainEchartOption.series[3].data.push(val["word"]);
            });
          }else{
            self.isError = true;
          }

          // this.init("domainEchart", this.domainEchartOption);
          myChart.setOption(this.domainEchartOption);
          myChart.hideLoading();
        })
        .catch(err => {
          this.isError = true;
          myChart.hideLoading();
        });
    }
  },
  // 见识数据是否发生改变
  watch: {
    $route(val, oldVal) {
      let nextMap,
        params = val.params.cityCode;
      if (cityMap[params] !== undefined) {
        nextMap = params;
      } else {
        nextMap = "中国";
      }
      this.getData(nextMap);
    }
  }
};
</script>

