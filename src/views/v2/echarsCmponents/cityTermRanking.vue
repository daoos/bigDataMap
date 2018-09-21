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
      echartsUniqueCode: "cityTermRanking",
      title: "终端部署 TOP10",
      echartId: "cityTermRankingEchart",
      ajaxType: "cityTermRanking",
      curentCityCode: 86,
      dom: "",
      option: {
        grid: {
          left: "8%",
          top: "5%",
          right: "0%",
          bottom: "2%",
          height: "105%",
          width: "85%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} "
        },
        xAxis: [
          {
            show: false
          }
        ],
        yAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "10",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "10"
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [],
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: function(param) {
                  return param.data;
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: "10"
                }
              }
            },
            barWidth: 6,
            itemStyle: {
              normal: {
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
            z: 2
          }
        ]
      },
      detail: {
        thead: [
          { lable: "名称", props: "cityName" },
          { lable: "数量", props: "termNum" }
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
    mounted() {
      this.$nextTick(() => {
        window.onresize = () => {
          this.dom.resize();
        };
      });
    },
    changeOption(data) {
      this.option.yAxis[0].data = [];
      this.option.series[0].data = [];
      this.detail.data = [];
      if (data.length > 0) {
        data.map(v => {
          this.option.yAxis[0].data.push(v.cityName);
          this.option.series[0].data.push(v.termNum);
          this.detail.data.push({ cityName: v.cityName, termNum: v.termNum });
        });
      }
    }
  }
};
</script>

