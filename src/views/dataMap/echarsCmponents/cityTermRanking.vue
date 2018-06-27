<template>
  <div class="echartsContainer" id="cityTermRankingContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.ServerNationalDeploymentTOP')}}</span>
    <div id="cityTermRanking" :class="{'visibilityNone':isError}"></div>
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
      cityTermRankingDom: {},
      cityTermRankingOption: {
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            myTool1: {
              show: true,
              title: "详情",
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
        grid: { bottom: "10%", height: "80%", left: "20%" },
        xAxis: [
          {
            type: "value",
            boundaryGap: [0, 0.01],
            axisLine: {
              show: false,
              lineStyle: {
                color: theme.fontColor
              }
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: [
              "北京",
              "上海",
              "武汉",
              "成都",
              "广州",
              "北京1",
              "上海1",
              "武汉1",
              "成都1",
              "广州1"
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: theme.fontColor
              }
            },
            splitLine: {
              show: false
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#626E22"
              }
            },
            data: [15, 39, 41, 49, 54, 64, 70, 76, 87, 99],
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            },
            splitLine: {
              show: false
            }
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
      this.cityTermRankingOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.cityTermRankingOption;
        var yAxisData = opt.yAxis[0].data;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>城市名称</th>" +
          "<th>设备数量</th>" +
          "</tr>";
        for (var i = 0, l = yAxisData.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            yAxisData[i] +
            "</td>" +
            "<td>" +
            series[i].value +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.cityTermRankingOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "cityTermRanking",
          echartsHtml =
            '<span class="title_box">终端部署排名</span><div id="cityTermRanking"></div>',
          option = self.cityTermRankingOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.cityTermRankingOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/cityTermRanking");
        } else {
          window.open("#/dataMap/oneEcharts/cityTermRanking/" + cityCode);
        }
      };

      //
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
      var myChart = this.$echarts.init(
        document.getElementById("cityTermRanking")
      );
      myChart.showLoading(this.loadingConfig);
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }
      //
      let params = {
        curentCityCode: this.curentCityCode,
        dz_type: "cityTermRanking"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          this.isError = false;
          this.cityTermRankingOption.yAxis[0].data = [];
          this.cityTermRankingOption.series[0].data = [];
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            // xxdata.cityTermRanking["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.cityTermRankingOption.yAxis[0].data.push(val["cityName"]);
              self.cityTermRankingOption.series[0].data.push({
                value: val["termNum"]
              });
              // self.cityTermRankingOption.yAxis[0].data.reverse();
              // this.init("cityTermRanking", this.cityTermRankingOption);
            });
            self.cityTermRankingOption.yAxis[0].data.reverse();
            self.cityTermRankingOption.series[0].data.reverse();
          } else {
            self.isError = true;
          }
          myChart.setOption(this.cityTermRankingOption);
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

