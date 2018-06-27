<template>
  <div class="echartsContainer" id="AnnualLocalEntranceExaminationContainer">
    <span class="title_box" :class="{'visibilityNone':false}">年度地方升学考试</span>
    <div id="AnnualLocalEntranceExamination" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      AnnualLocalEntranceExaminationDom: {},
      //设备排名的配置数据
      AnnualLocalEntranceExaminationOption: {
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var res = params[0].seriesName + " " + params[0].name;
            res += "<br/>  中考 : " + params[0].value[0];
            res += "<br/>  高考 : " + params[0].value[1];
            return res;
          }
        },
        toolbox: {
          show: false,
          feature: {
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
        dataZoom: {
          show: true,
          realtime: true,
          start: 50,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisTick: {
              onGap: false
            },
            splitLine: {
              show: false
            },
            data: [
              "2010/7/30",
              "2011/7/30",
              "2012/7/30",
              "2013/7/30",
              "2014/7/30",
              "2015/7/30"
            ]
          }
        ],
        grid: { height: "50%", bottom: "30%", left: "15%" },
        yAxis: [
          {
            type: "value",
            scale: true,
            boundaryGap: [0.01, 0.01]
          }
        ],
        series: [
          {
            name: "升学考试",
            type: "k",
            data: [
              //
              [2320, 2302, 2287, 2362],
              [2300, 2291, 2288, 2308],
              [2295, 2346, 2295, 2346],
              [2347, 2358, 2337, 2363],
              [2360, 2382, 2347, 2383],
              [2383, 2385, 2371, 23912]
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
      this.AnnualLocalEntranceExaminationOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "AnnualLocalEntranceExamination",
          echartsHtml =
            '<span class="title_box">年度地方升学考试</span><div id="AnnualLocalEntranceExamination"></div>',
          option = self.AnnualLocalEntranceExaminationOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.AnnualLocalEntranceExaminationOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/AnnualLocalEntranceExamination");
        } else {
          window.open("#/dataMap/oneEcharts/AnnualLocalEntranceExamination/" + cityCode);
        }
      };
      self.init(
        "AnnualLocalEntranceExamination",
        self.AnnualLocalEntranceExaminationOption
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
        document.getElementById("AnnualLocalEntranceExamination")
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
          this.AnnualLocalEntranceExaminationOption.legend.data = [];
          this.AnnualLocalEntranceExaminationOption.series[0].data = [];
          let self = this;
          // xxdata.AnnualLocalEntranceExamination["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.AnnualLocalEntranceExaminationOption.legend.data.push(
                val["system"]
              );
              self.AnnualLocalEntranceExaminationOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("AnnualLocalEntranceExamination", this.AnnualLocalEntranceExaminationOption);
          myChart.setOption(this.AnnualLocalEntranceExaminationOption);
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

