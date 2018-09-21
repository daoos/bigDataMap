<template>
  <echart-template :echartsUniqueCode="echartsUniqueCode" :echartTitle="title" :echartOption="option" :echartId="echartId" :echartAjaxType="ajaxType" @changeOption="changeOption" @changeDom="changeDom" :detail="detail"></echart-template>
</template>
<script>
var appUseRankingData = {
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
      echartsUniqueCode: "appUseRanking",
      title: "应用使用频率 TOP10",
      echartId: "appUseRankTop10",
      ajaxType: "appUseRanking",
      curentCityCode: 86,
      dom: "",
      option: {
        time: Math.random(),
        tooltip: {
          trigger: "item",
          formatter: "{b} :使用 {c}次 "
        },
        grid: {
          left: "5%",
          bottom: "0%",
          height: "95%",
          width: "90%"
        },
        xAxis: [
          {
            show: false
          },
          //由于下边X轴已经是百分比刻度了,所以需要在顶部加一个X轴,刻度是金额,也隐藏掉
          {
            show: false
          }
        ],
        yAxis: {
          type: "category",
          axisLabel: {
            show: false //让Y轴数据不显示
          },
          itemStyle: {},
          axisTick: {
            show: false //隐藏Y轴刻度
          },
          axisLine: {
            show: false //隐藏Y轴线段
          },
          data: []
        },
        series: [
          //背景色--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            // barGap: '-100%',
            barWidth: "18%", //统计条宽度
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: "#02090E"
              }
            },
            z: 1,
            data: appUseRankingData.bgData
          },
          //蓝条--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "18%", //统计条宽度
            itemStyle: {
              normal: {
                color: "transparents",
                barBorderRadius: 5 //统计条弧度
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff" //百分比颜色
                },
                position: "inside",
                //百分比格式
                formatter: function(data) {
                  return (
                    (appUseRankingData.baifenbi[data.dataIndex] * 100).toFixed(
                      1
                    ) + "%"
                  );
                }
              }
            },
            labelLine: {
              show: false
            },
            z: 2,
            data: appUseRankingData.baifenbi
          },
          //数据条--------------------我是分割线君------------------------------//

          {
            show: true,
            type: "bar",
            xAxisIndex: 1, //代表使用第二个X轴刻度!!!!!!!!!!!!!!!!!!!!!!!!
            barGap: "-100%",
            barWidth: "18%", //统计条宽度
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: function(params) {
                  var dataLen = appUseRankingData.lableName.length,
                    paramsIndex = dataLen - params.dataIndex - 1;
                  if (paramsIndex <= 2) {
                    return appUseRankingData.lineColor[paramsIndex];
                  } else {
                    return appUseRankingData.lineColor[3];
                  }
                }
              }
            },
            label: {
              normal: {
                show: true,
                //label 的position位置可以是top bottom left,right,也可以是固定值
                //在这里需要上下统一对齐,所以用固定值
                position: [0, "-400%"],
                rich: {
                  //富文本
                  black: {
                    //自定义颜色
                    color: "#000"
                  },
                  yellow: {
                    color: "#fff"
                  }
                },
                formatter: function(data) {
                  var dataLen = appUseRankingData.lableName.length,
                    paramsIndex = dataLen - data.dataIndex;
                  //富文本固定格式{colorName|这里填你想要写的内容}
                  return (
                    paramsIndex +
                    "." +
                    appUseRankingData.lableName[data.dataIndex]
                  );
                }
              }
            },
            z: 10,
            data: appUseRankingData.data
          }
        ]
      },
      detail: {
        thead: [
          { lable: "应用名称", props: "appName" },
          { lable: "使用人数", props: "userNum" }
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
      appUseRankingData.data = [];
      appUseRankingData.baifenbi = [];
      appUseRankingData.bgData = [];
      appUseRankingData.lableName = [];
      this.detail.data = [];
      if (data.length > 0) {
        data.map(v => {
          appUseRankingData.bgData.push(1);
          appUseRankingData.baifenbi.push(1);
          appUseRankingData.data.push(v.userNum);
          appUseRankingData.lableName.push(v.appName);
          this.detail.data.push({ userNum: v.userNum, appName: v.appName });
        });
      }
      this.option = {
        time: Math.random(),
        tooltip: {
          trigger: "item",
          formatter: "{b} :使用 {c}次 "
        },
        grid: {
          left: "5%",
          bottom: "0%",
          height: "95%",
          width: "90%"
        },
        xAxis: [
          {
            show: false
          },
          //由于下边X轴已经是百分比刻度了,所以需要在顶部加一个X轴,刻度是金额,也隐藏掉
          {
            show: false
          }
        ],
        yAxis: {
          type: "category",
          axisLabel: {
            show: false //让Y轴数据不显示
          },
          itemStyle: {},
          axisTick: {
            show: false //隐藏Y轴刻度
          },
          axisLine: {
            show: false //隐藏Y轴线段
          },
          data: []
        },
        series: [
          //背景色--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            // barGap: '-100%',
            barWidth: "18%", //统计条宽度
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: "#02090E"
              }
            },
            z: 1,
            data: appUseRankingData.bgData
          },
          //蓝条--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "18%", //统计条宽度
            itemStyle: {
              normal: {
                color: "transparents",
                barBorderRadius: 5 //统计条弧度
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff" //百分比颜色
                },
                position: "inside",
                //百分比格式
                formatter: function(data) {
                  return (
                    (appUseRankingData.baifenbi[data.dataIndex] * 100).toFixed(
                      1
                    ) + "%"
                  );
                }
              }
            },
            labelLine: {
              show: false
            },
            z: 2,
            data: appUseRankingData.baifenbi
          },
          //数据条--------------------我是分割线君------------------------------//

          {
            show: true,
            type: "bar",
            xAxisIndex: 1, //代表使用第二个X轴刻度!!!!!!!!!!!!!!!!!!!!!!!!
            barGap: "-100%",
            barWidth: "18%", //统计条宽度
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: function(params) {
                  var dataLen = appUseRankingData.lableName.length,
                    paramsIndex = dataLen - params.dataIndex - 1;
                  if (paramsIndex <= 2) {
                    return appUseRankingData.lineColor[paramsIndex];
                  } else {
                    return appUseRankingData.lineColor[3];
                  }
                }
              }
            },
            label: {
              normal: {
                show: true,
                //label 的position位置可以是top bottom left,right,也可以是固定值
                //在这里需要上下统一对齐,所以用固定值
                position: [0, "-400%"],
                rich: {
                  //富文本
                  black: {
                    //自定义颜色
                    color: "#000"
                  },
                  yellow: {
                    color: "#fff"
                  }
                },
                formatter: function(data) {
                  var dataLen = appUseRankingData.lableName.length,
                    paramsIndex = dataLen - data.dataIndex;
                  //富文本固定格式{colorName|这里填你想要写的内容}
                  return (
                    paramsIndex +
                    "." +
                    appUseRankingData.lableName[data.dataIndex]
                  );
                }
              }
            },
            z: 10,
            data: appUseRankingData.data
          }
        ]
      };
    }
  }
};
</script>