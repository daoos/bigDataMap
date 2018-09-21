<template>
  <echart-template :echartsUniqueCode="echartsUniqueCode" :echartTitle="title" :echartOption="option" :echartId="echartId" :echartAjaxType="ajaxType" @changeOption="changeOption" @changeDom="changeDom" :detail="detail"></echart-template>
</template>
<script>
var giftImageUrl = "";
import radioBg from "@/img/radioBg.png";
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
import echartTemplate from "./echartTemplate";
export default {
  components: {
    echartTemplate
  },
  data() {
    return {
      echartsUniqueCode: "terminalTypeStatistics",
      title: "产品类型比例",
      echartId: "terminalTypeStatisticsEchart",
      ajaxType: "osType",
      curentCityCode: 86,
      dom: "",
      option: {},
      detail: {
        thead: [
          { lable: "设备类型", props: "os" },
          { lable: "数量", props: "osNum" },
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
      // this.option.series[0].data = [];
      // this.detail.data = [];
      // if (data.length > 0) {
      //   data.map(v => {
      //     var temp = { value: v.veNum, name: v.veName };
      //     this.option.series[0].data.push(temp);
      //     this.detail.data.push(temp);
      //   });
      // }
      this.detail.data = [];
      var scaleData = [],
        allNum = 0;
      if (data.length > 0) {
        data.map(v => {
          scaleData.push({ name: v.os, value: parseInt(v.osNum) });
          allNum += parseInt(v.osNum);
          this.detail.data.push(v);
        });
      }
      var itemVal = allNum / data.length * 0.1;
      console.log(allNum, data.length, itemVal);
      var data = [];
      var color = [
        "#00ffff",
        "#ffa800",
        "#ff5b00",
        "#00cfff",
        "#006ced",
        "#ffe000",
        "#ff3000"
      ];
      for (var i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i]
              }
            }
          },
          {
            value: itemVal,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0
              }
            }
          }
        );
      }
      console.log(scaleData, data);
      this.option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false,
            radius: ["55%", "60%"],
            // radius: [195, 200],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outside",
                  color: "#ddd",
                  formatter: function(params) {
                    var percent = 0;
                    var total = 0;
                    for (var i = 0; i < scaleData.length; i++) {
                      total += scaleData[i].value;
                    }
                    percent = (params.value / total * 100).toFixed(0);
                    if (params.name !== "") {
                      return (
                        params.name + "\n{white|" + "占比" + percent + "%}"
                      );
                    } else {
                      return "";
                    }
                  },
                  rich: {
                    white: {
                      color: "#ddd",
                      align: "center",
                      padding: [3, 0]
                    }
                  }
                },
                labelLine: {
                  // length: 30,
                  // length2: 100,
                  show: true,
                  color: "#00ffff"
                }
              }
            },
            data: data
          }
        ]
      };
    }
  }
};
</script>