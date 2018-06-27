<template>
  <div class="echartsContainer" id="studentExaminationContainer">
    <span class="title_box" :class="{'visibilityNone':false}">全年学生考试</span>
    <div id="studentExamination" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      studentExaminationDom: {},
      //设备排名的配置数据
      studentExaminationOption: {
        title: {
          show:false,
          text: "全年学生考试",
          subtext: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show:false,
          data: ["校内部出题", "地方统一考试"]
        },
        grid: { height: "50%", bottom: "20%", left: "15%" },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "校内部出题",
            type: "bar",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 11, 12],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "最大值"
                },
                {
                  type: "min",
                  name: "最小值"
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值"
                }
              ]
            }
          },
          {
            name: "地方统一考试",
            type: "bar",
            data: [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
            markPoint: {
              data: [
                {
                  name: "年最高",
                  value: 182.2,
                  xAxis: 7,
                  yAxis: 183,
                  symbolSize: 18
                },
                {
                  name: "年最低",
                  value: 2.3,
                  xAxis: 11,
                  yAxis: 3
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值"
                }
              ]
            }
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
      self.init("studentExamination", self.studentExaminationOption);
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
        document.getElementById("studentExamination")
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
          this.studentExaminationOption.legend.data = [];
          this.studentExaminationOption.series[0].data = [];
          let self = this;
          // xxdata.studentExamination["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.studentExaminationOption.legend.data.push(val["system"]);
              self.studentExaminationOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("studentExamination", this.studentExaminationOption);
          myChart.setOption(this.studentExaminationOption);
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

