<template>
    <div class="echartsContainer" id="consumingOfHomeworkContainer">
        <span class="title_box" :class="{'visibilityNone':false}">义务教育阶段家庭作业耗时</span>
        <div id="consumingOfHomework" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      consumingOfHomeworkDom: {},
      //设备排名的配置数据
      consumingOfHomeworkOption: {
        title: {
          show: false,
          text: "义务教育阶段家庭作业耗时",
          subtext: ""
        },
        tooltip: {
          show: false,
          trigger: "axis",
          showDelay: 0,
          formatter: function(params) {
            if (params.value.length > 1) {
              return (
                params.seriesName +
                " :<br/>" +
                params.value[0] +
                "cm " +
                params.value[1] +
                "kg "
              );
            } else {
              return (
                params.seriesName +
                " :<br/>" +
                params.name +
                " : " +
                params.value +
                "kg "
              );
            }
          },
          axisPointer: {
            show: true,
            type: "cross",
            lineStyle: {
              type: "dashed",
              width: 1
            }
          }
        },
        legend: {
          show: false,
          data: ["小学", "中学"]
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataZoom: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: [
          {
            type: "value",
            scale: true,
            axisLabel: {
              formatter: "{value} cm"
            }
          }
        ],
        grid: { height: "50%", bottom: "20%", left: "15%" },
        yAxis: [
          {
            type: "value",
            scale: true,
            axisLabel: {
              formatter: "{value} 小时"
            }
          }
        ],
        series: [
          {
            name: "小学",
            type: "scatter",
            data: [[1.2, 1.6], [1.5, 6], [5, 2], [1, 3], [5, 3]],
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
            name: "中学",
            type: "scatter",
            data: [[2, 4], [3, 2], [4, 5], [5, 3], [3, 2]],
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
      self.init("consumingOfHomework", self.consumingOfHomeworkOption);
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
        document.getElementById("consumingOfHomework")
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
          this.consumingOfHomeworkOption.legend.data = [];
          this.consumingOfHomeworkOption.series[0].data = [];
          let self = this;
          // xxdata.consumingOfHomework["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.consumingOfHomeworkOption.legend.data.push(val["system"]);
              self.consumingOfHomeworkOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("consumingOfHomework", this.consumingOfHomeworkOption);
          myChart.setOption(this.consumingOfHomeworkOption);
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

