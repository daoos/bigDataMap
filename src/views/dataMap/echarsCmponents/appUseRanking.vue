<template>
  <div class="echartsContainer" id="appUseRankingContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.ApplicationUsageFrequencyStatistics')}}</span>
    <div id="appUseRanking" :class="{'visibilityNone':isError}"></div>
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
      appUseRankingDom: {},
      appUseRankingOption: {
        title: [
          {
            show: false,
            text: "发布应用总数15,使用中的应用总数6",
            top: "5%",
            left: "center",
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        grid: {
          show: false
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
        grid: { height: "75%", width: "60%", left: "20%", bottom: "5%" },
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
              }
            },
            data: [15, 39, 41, 49, 54, 64, 70, 76, 87, 99],
            axisLine: {
              lineStyle: {
                //color: theme.fontColor
              }
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
      console.log((new this.$echarts.graphic.LinearGradient))
      // 自定义 按钮 事件定义
      // 为每个图标分别帮分工不同的事件
      let self = this;
      this.appUseRankingOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.appUseRankingOption;
        var yAxisData = opt.yAxis[0].data;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>应用名称</th>" +
          "<th>使用人数</th>" +
          "</tr>";
        for (var i = 0, l = yAxisData.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            yAxisData[i] +
            "</td>" +
            "<td>" +
            series[i] +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.appUseRankingOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "appUseRanking",
          echartsHtml =
            '<span class="title_box">应用使用频率统计</span><div id="appUseRanking"></div>',
          option = self.appUseRankingOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.appUseRankingOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/appUseRanking");
        } else {
          window.open("#/dataMap/oneEcharts/appUseRanking/" + cityCode);
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
    // 获取数据
    getData(cityName) {
      var myChart = this.$echarts.init(
        document.getElementById("appUseRanking")
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
        dz_type: "appUseRanking"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          this.isError = false;
          this.appUseRankingOption.yAxis[0].data = [];
          this.appUseRankingOption.series[0].data = [];
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            // xxdata.appUseRanking["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.appUseRankingOption.yAxis[0].data.push(val["appName"]);
              self.appUseRankingOption.series[0].data.push(val["userNum"]);
            });
            self.appUseRankingOption.yAxis[0].data.reverse();
            self.appUseRankingOption.series[0].data.reverse();
          } else {
            self.isError = true;
          }
          console.log(self.appUseRankingOption)
          // this.init("appUseRanking", this.appUseRankingOption);
          myChart.setOption(this.appUseRankingOption);
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

