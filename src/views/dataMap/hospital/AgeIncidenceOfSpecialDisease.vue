<template>
  <div class="echartsContainer" id="AgeIncidenceOfSpecialDiseaseContainer">
    <span class="title_box" :class="{'visibilityNone':false}">【特症年龄发病率】</span>
    <div id="AgeIncidenceOfSpecialDisease" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
    <span class="nodataMsg" :class="{'visibilityNone':!isError}">没有数据！</span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
export default {
  data() {
    return {
      isError: false,
      curentCityCode: "",
      // 图片的路径
      imgPaht: "@/assets/img/FullScreen.png",
      //设备类型 百分比统计
      AgeIncidenceOfSpecialDiseaseDom: {},
      //设备排名的配置数据
      AgeIncidenceOfSpecialDiseaseOption: {
        title: {
          show: false,
          text: "【特症年龄发病率】",
          subtext: ""
        },

        tooltip: {
          trigger: "axis"
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
        calculable: false,
        legend: {
          show: false,
          data: ["甲肝", "乙肝", "平均人数"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "10",
              "15",
              "25",
              "35",
              "45",
              "55",
              "60",
              "65",
              "70",
              "75",
              "80",
              "85"
            ]
          }
        ],
        grid: { height: "50%", bottom: "20%", left: "20%", width: "60%" },
        yAxis: [
          {
            type: "value",
            name: "人数",
            axisLabel: {
              formatter: "{value} 万人"
            }
          },
          {
            type: "value",
            name: "人数",
            axisLabel: {
              formatter: "{value} 万人"
            }
          }
        ],
        series: [
          {
            name: "甲肝",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "乙肝",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "平均人数",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters(["echartsData", "loadingConfig", "settingConfig"])
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {
      this.AgeIncidenceOfSpecialDiseaseOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/AgeIncidenceOfSpecialDisease");
        } else {
          window.open("#/dataMap/oneEcharts/AgeIncidenceOfSpecialDisease/" + cityCode);
        }
      };
      self.init(
        "AgeIncidenceOfSpecialDisease",
        self.AgeIncidenceOfSpecialDiseaseOption
      );
    });
  },
  methods: {
    init(id, opt) {
      let dom = document.getElementById(id),
        myChart = this.$echarts.init(dom);
      myChart.setOption(opt);
      return myChart;
    },
    // 获取数据
    getData(cityName) {
      var myChart = this.$echarts.init(
        document.getElementById("AgeIncidenceOfSpecialDisease")
      );
      myChart.showLoading(this.loadingConfig);
      //  myChart.showLoading({text: '加载中...',maskColor: 'rgba(255, 255, 255, 0.8)',color: '#fff',});
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
          // this.AgeIncidenceOfSpecialDiseaseOption.legend.data = [];
          // this.AgeIncidenceOfSpecialDiseaseOption.series[0].data = [];
          let self = this;
          // xxdata.AgeIncidenceOfSpecialDisease["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0 &&
            0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.AgeIncidenceOfSpecialDiseaseOption.legend.data.push(
                val["system"]
              );
              self.AgeIncidenceOfSpecialDiseaseOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.AgeIncidenceOfSpecialDiseaseOption.series[0].data.map(
              function(item, index) {
                self.AgeIncidenceOfSpecialDiseaseOption.series[0].data[
                  index
                ] = self.randomData(3, 99);
              }
            );
            self.AgeIncidenceOfSpecialDiseaseOption.series[1].data.map(
              function(item, index) {
                self.AgeIncidenceOfSpecialDiseaseOption.series[1].data[
                  index
                ] = self.randomData(3, 99);
              }
            );
            self.AgeIncidenceOfSpecialDiseaseOption.series[2].data.map(
              function(item, index) {
                self.AgeIncidenceOfSpecialDiseaseOption.series[2].data[
                  index
                ] = self.randomData(3, 99);
              }
            );
            // self.isError = true;
          }

          // this.init("AgeIncidenceOfSpecialDisease", this.AgeIncidenceOfSpecialDiseaseOption);
          myChart.setOption(this.AgeIncidenceOfSpecialDiseaseOption);
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

