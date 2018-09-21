<template>
  <echart-template v-show="isShow" :echartsUniqueCode="echartsUniqueCode" :echartTitle="title" :echartOption="option" :echartId="echartId" :echartAjaxType="ajaxType" @changeOption="changeOption" @changeDom="changeDom" :detail="detail"></echart-template>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
import echartTemplate from "./echartTemplate";
export default {
  components: {
    echartTemplate
  },
  data() {
    return {
      isShow: true,
      echartsUniqueCode: "dateTermBroken",
      title: "设备故障率",
      echartId: "dateTermBrokenEchart",
      ajaxType: "dateTermBroken",
      curentCityCode: 86,
      dom: "",
      option: {
        grid: {
          left: "10%",
          top: "10%",
          bottom: "10%"
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 12
          },
          formatter: "{b0}:{c0}"
        },
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: "#0177d4"
            }
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#02090C"]
            }
          },
          nameTextStyle: {
            color: "#fff",
            fontSize: 8
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 8
            }
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 18,
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(41, 121, 255, 1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 192, 255, 1)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: []
          }
        ]
      },
      detail: {
        thead: [
          { lable: "月份", props: "time" },
          { lable: "故障设备数量(个)", props: "num" }
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
        console.log("mixins mounted");
        this.dom.resize();
      };
    });
  },
  methods: {
    changeDom(data) {
      this.dom = data;
    },
    changeOption(data) {
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
      this.detail.data = [];
      if (data.length > 0) {
        data.map(v => {
          this.option.xAxis.data.push(v.time);
          this.option.series[0].data.push(v.num);
          this.detail.data.push(v);
        });
      }
    }
  }
};
</script>