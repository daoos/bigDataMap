<template>
  <echart-template :echartsUniqueCode="echartsUniqueCode" :echartTitle="title" :echartOption="option" :echartId="echartId" :echartAjaxType="ajaxType" @changeOption="changeOption" @changeDom="changeDom" :detail="detail"></echart-template>
</template>
<script>
var userActivityData = {
  baifenbi: [],
  bgData: [],
  data: [],
  lableName: [],
  lineColor: ["#E74D3C", "#F5D313", "#2ECD70", "#7A8591"]
};

import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
import echartTemplate from "./echartTemplate";
export default {
  components: {
    echartTemplate
  },
  data() {
    return {
      echartsUniqueCode: "userActivity",
      title: " 用户活跃度 TOP10",
      echartId: "userActivityTop10",
      ajaxType: "cityCustomActivity",
      curentCityCode: 86,
      dom: "",
      option: {
        grid: {
          left: "10%",
          bottom: "3%",
          height: "90%"
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: true,
            data: [
              
            ],
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              formatter: function(value, index) {
                return [value].join("\n");
              },
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  align: "center",
                  width: 15,
                  height: 15
                }
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: [683, 234, 234, 523, 345, 683, 234, 234, 523, 345],
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            },
            axisLine: {
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
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [70, 34, 60, 78, 69, 70, 34, 60, 78, 69],
            barWidth: 6,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(9,100,166, 1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(52,193,227, 1)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [],
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(9,100,166, 1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(52,193,227, 1)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                borderWidth: 3,
                barBorderRadius: 10
              }
            }
          }
        ]
      },
      detail: {
        thead: [
          { lable: "名称", props: "cityName" },
          { lable: "使用人数", props: "termNum" }
        ],
        data: []
      }
    };
  },
  computed: {
    ...mapGetters(["echartsData", "loadingConfig", "settingConfig"])
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.dom.resize();
      };
    });
  },
  methods: {
    changeDom(data) {
      this.dom = data;
    },
    changeOption(data) {
      var y1Data = [];
      var y2Data = [];
      var allData = 0;
      if (data.length > 0) {
        data.map(function(v) {
          y1Data.push(v.cityName);
          y2Data.push(parseInt(v.termNum));
          allData += parseInt(v.termNum);
        });
      }
      var series1Data = [];
      var series2Data = [];
      var maxSeries2Data = parseInt(Math.max(...y2Data)/allData*100+5)
      y2Data.map(function(v) {
        series1Data.push(parseInt(v / allData * 100));
        series2Data.push(maxSeries2Data);
      });
      this.option.yAxis[0].data = y1Data;
      this.option.yAxis[1].data = y2Data;
      this.option.series[0].data = series1Data;
      this.option.series[1].data = series2Data;
    }
  }
};
</script>