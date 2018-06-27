<template>
    <div class="echartsContainer" id="extracurricularActivitiesContainer">
        <span class="title_box" :class="{'visibilityNone':false}">每周课外活动</span>
        <div id="extracurricularActivities" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      extracurricularActivitiesDom: {},
      //设备排名的配置数据
      extracurricularActivitiesOption: {
        tooltip: {
          trigger: "axis"
        },
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
        grid: { height: "50%", bottom: "20%", left: "15%" },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} 课时"
            }
          }
        ],
        series: [
          {
            name: "体育课",
            type: "line",
            data: [1, 2, 2, 4, 1, 0, 0],
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
            name: "班级互动",
            type: "line",
            data: [1, 0, 0, 0, 1, 0, 0],
            markPoint: {
              data: [
                {
                  name: "周最低",
                  value: 0,
                  xAxis: 1,
                  yAxis: 1
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
      self.init(
        "extracurricularActivities",
        self.extracurricularActivitiesOption
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
        document.getElementById("extracurricularActivities")
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
          this.extracurricularActivitiesOption.legend.data = [];
          this.extracurricularActivitiesOption.series[0].data = [];
          let self = this;
          // xxdata.extracurricularActivities["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.extracurricularActivitiesOption.legend.data.push(
                val["system"]
              );
              self.extracurricularActivitiesOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("extracurricularActivities", this.extracurricularActivitiesOption);
          myChart.setOption(this.extracurricularActivitiesOption);
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

