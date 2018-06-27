<template>
  <div class="echartsContainer" id="terminalsContainer">
    <!-- <span class="title_box" :class="{'visibilityNone':isError}"> -->
      <!-- {{$t('echartsTitle.DeviceTypeRatio')}} -->
      <!-- 上线率 -->
    <!-- </span> -->
    <div id="terminals" :class="{'visibilityNone':isError}"></div>
    <span class="nodataMsg" :class="{'visibilityNone':!isError}">没有数据！</span>
  </div>
</template>
<script>
var dataStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    shadowBlur: 40,
    shadowColor: "rgba(40, 40, 40, 0.5)"
  }
};
var placeHolderStyle = {
  normal: {
    color: "rgba(44,59,70,1)", //未完成的圆环的颜色
    label: {
      show: false
    },
    labelLine: {
      show: false
    }
  },
  emphasis: {
    color: "rgba(44,59,70,1)" //未完成的圆环的颜色
  }
};
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
      terminalsDom: {},
      //设备排名的配置数据
      // terminalsOption: {
      //   tooltip: {
      //     formatter: "{a} <br/>{b} : {c}%"
      //   },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       myTool3: {
      //         show: false,
      //         title: "全屏",
      //         icon: echartBtns.FullScreenPng,
      //         onclick() {}
      //       },
      //       myTool4: {
      //         show: false,
      //         title: "新页面打开",
      //         icon: echartBtns.NewTabPng,
      //         onclick() {}
      //       }
      //     }
      //   },
      //   series: [
      //     {
      //       name: "开机比例",
      //       type: "gauge",
      //       axisLine: {
      //           lineStyle: {
      //               width: 8 // 这个是修改宽度的属性
      //           }
      //       },
      //       splitLine:{
      //         length:2
      //       },
      //       pointer:{
      //         length:'50%',
      //         width:2
      //       },
      //       axisLabel:{
      //         fontSize:8
      //       },
      //       detail: { show:true,formatter: "{value}%",fontSize:8 },
      //       data: [{ value: 50, name:'' }]
      //     }
      //   ]
      // }
      terminalsOption: {
        title: {
          text: "在线率",
          x: "50%",
          y: "45%",
          subtext: "50%",
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: 10
          },
          subtextStyle: {
            fontWeight: "bold",
            fontSize: 10,
            color: "#3ea1ff"
          }
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            startAngle: 225,
            color: ["#9f8fc1", "transparent"],
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 75,
                name: "1"
              },
              {
                value: 25,
                name: "2"
              }
            ]
          },
          {
            name: "",
            type: "pie",
            radius: ["52%", "68%"],
            avoidLabelOverlap: false,
            startAngle: 317,
            color: ["#fff", "transparent"],
            hoverAnimation: false,
            legendHoverLink: false,
            clockwise: false,
            itemStyle: {
              normal: {
                borderColor: "transparent",
                borderWidth: "20"
              },
              emphasis: {
                borderColor: "transparent",
                borderWidth: "20"
              }
            },
            z: 10,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 50,
                name: ""
              },
              {
                value: 50,
                name: ""
              }
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
      // 自定义 按钮 事件定义
      // 为每个图标分别帮分工不同的事件
      let self = this;

      // this.terminalsOption.toolbox.feature.myTool3.onclick = function() {
      //   var echartsId = "terminals",
      //     echartsHtml =
      //       '<span class="title_box">设备类型比例</span><div id="terminals"></div>',
      //     option = self.terminalsOption;
      //   self.myTool3(echartsId, echartsHtml, option, self);
      // };
      // this.terminalsOption.toolbox.feature.myTool4.onclick = function() {
      //   var cityCode = self.$route.params.cityCode;
      //   if (cityCode === undefined) {
      //     window.open("#/dataMap/oneEcharts/terminals");
      //   } else {
      //     window.open("#/dataMap/oneEcharts/terminals/" + cityCode);
      //   }
      // };

      let nextMap,
        params = this.$route.params;
      if (cityMap[params.cityCode] !== undefined) {
        nextMap = params.cityCode;
      } else {
        nextMap = "中国";
      }
      this.getData(nextMap);
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
      var myChart = this.$echarts.init(document.getElementById("terminals"));
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
        dz_type: "terminals"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          console.log("cm", xxdata);
          let self = this;
          this.isError = false;
          // this.terminalsOption.series[0].data[0].value = parseInt(
          //   xxdata.data.terminals.online / xxdata.data.terminals.all * 100
          // );
          // this.terminalsOption.series[0].data[0].value = parseInt(
          //   xxdata.data.terminals.online
          // );
          // this.terminalsOption.series[0].data[0].value = parseInt(
          //   xxdata.data.terminals.all
          // );

          myChart.setOption(this.terminalsOption);
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

