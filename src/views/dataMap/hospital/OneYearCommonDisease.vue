<template>
  <div class="echartsContainer" id="OneYearCommonDiseaseContainer">

    <span class="title_box" :class="{'visibilityNone':false}">【常见疾病的人数】</span>
    <div id="OneYearCommonDisease" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
    <span class="nodataMsg" :class="{'visibilityNone':!isError}">没有数据！</span>
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
      OneYearCommonDiseaseDom: {},
      OneYearCommonDiseaseOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: true,
          top: 10,
          height: 5,
          data: ["xshell", "xftp", "ie", "wps"]
        },
        toolbox: {
          show: true,
          feature: {
            //  myTool1: {
            //   show: true,
            //   title: "详情",
            //   icon: echartBtns.detail,
            //   onclick() {}
            // },
            myTool4: {
              show: true,
              title: "新页面打开",
              icon: echartBtns.NewTabPng,
              onclick() {}
            }
          }
        },
        grid: { height: "55%", bottom: "23%", left: "15%" },
        calculable: true,
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
        xAxis: [
          {
            type: "category",
            data: ["一月", "二月", "三月", "四月", "五月", "六月"],
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            }
          }
        ],
        series: [
          {
            name: "流感",
            type: "bar",
            stack: "总量",
            barWidth: "40%",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [20, 102, 301, 334, 199, 96]
          },
          {
            name: "外伤",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [20, 132, 101, 134, 78, 55]
          },
          {
            name: "眼病",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [220, 182, 191, 234, 36, 75]
          },
          {
            name: "皮肤病",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [50, 212, 201, 154, 496, 86]
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
      this.OneYearCommonDiseaseOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/OneYearCommonDisease");
        } else {
          window.open("#/dataMap/oneEcharts/OneYearCommonDisease/" + cityCode);
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
      var myChart = this.$echarts.init(
        document.getElementById("OneYearCommonDisease")
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
        dz_type: "systemType"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0 &&
            0
          ) {
            this.isError = false;
            // this.OneYearCommonDiseaseOption.xAxis[0].data = [];
            // this.OneYearCommonDiseaseOption.series[0].data = [];
            // this.OneYearCommonDiseaseOption.series[1].data = [];
            // this.OneYearCommonDiseaseOption.series[2].data = [];
            // this.OneYearCommonDiseaseOption.series[3].data = [];
            // xxdata.OneYearCommonDisease["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.OneYearCommonDiseaseOption.xAxis[0].data.push(val["time"]);
              self.OneYearCommonDiseaseOption.series[0].data.push(val["wps"]);
              self.OneYearCommonDiseaseOption.series[1].data.push(val["excel"]);
              self.OneYearCommonDiseaseOption.series[2].data.push(val["ps"]);
              self.OneYearCommonDiseaseOption.series[3].data.push(val["word"]);
            });
          } else {
            self.OneYearCommonDiseaseOption.series[0].data.map(function(
              item,
              index
            ) {
              self.OneYearCommonDiseaseOption.series[0].data[
                index
              ] = self.randomData(3, 969);
            });
            self.OneYearCommonDiseaseOption.series[1].data.map(function(
              item,
              index
            ) {
              self.OneYearCommonDiseaseOption.series[1].data[
                index
              ] = self.randomData(3, 669);
            });
            self.OneYearCommonDiseaseOption.series[2].data.map(function(
              item,
              index
            ) {
              self.OneYearCommonDiseaseOption.series[2].data[
                index
              ] = self.randomData(3, 919);
            });
            self.OneYearCommonDiseaseOption.series[4].data.map(function(
              item,
              index
            ) {
              self.OneYearCommonDiseaseOption.series[4].data[
                index
              ] = self.randomData(3, 990);
            });
            self.isError = false;
            myChart.setOption(this.OneYearCommonDiseaseOption);
            myChart.hideLoading();
          }
          // myChart.setOption(this.OneYearCommonDiseaseOption);
          // myChart.hideLoading();
        })
        .catch(err => {
          self.isError = false;
          myChart.setOption(this.OneYearCommonDiseaseOption);
          myChart.hideLoading();
          // this.isError = true;
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

