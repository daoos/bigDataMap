<template>
  <echart-template :echartsUniqueCode="echartsUniqueCode" :echartTitle="title" :echartOption="option" :echartId="echartId" :echartAjaxType="ajaxType" @changeOption="changeOption" @changeDom="changeDom" :detail="detail"></echart-template>
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
      echartsUniqueCode: "termTypeRadio",
      title: "设备操作系统比例",
      echartId: "termTypeEchart",
      ajaxType: "systemType",
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
        yAxis: {
          margin: -4,
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#02090C"]
            }
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
        xAxis: [
          {
            type: "category",
            data: [],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: 10
              }
            }
          }
        ],
        series: [
          {
            type: "pictorialBar",
            itemStyle: {
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
            },
            symbol: "rect",
            symbolRepeat: true, // "fixed",
            symbolMargin: "5",
            symbolClip: true,
            symbolSize: ["40", "15"],
            symbolOffset: [10, 0],
            data: [],
            z: 10
          }
        ]
      },
      detail: {
        thead: [
          { lable: "系统类型", props: "system" },
          { lable: "数量", props: "systemNum" },
          { lable: "百分比", props: "proportion" }
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
      this.option.xAxis[0].data = [];
      this.option.series[0].data = [];
      this.detail.data = [];
      if (data.length > 0) {
        data.map(v => {
          this.detail.data.push(v);
          this.option.xAxis[0].data.push(v.system);
          this.option.series[0].data.push(v.systemNum);
        });
      }
    }
  },
  watch: {
    
  }
};
</script>

