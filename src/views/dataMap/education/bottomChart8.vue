<template>
    <div class="echartsContainer" id="bottomChart8Container">
        <span class="title_box" :class="{'visibilityNone':false}">教职工学历资质</span>
        <div id="bottomChart8" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      bottomChart8Dom: {},
      //设备排名的配置数据
      bottomChart8Option: {
        title: {
          show: false,
          text: "教职工学历资质",
          subtext: ""
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
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
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          show: false,
          data: ["展现", "点击", "访问", "咨询", "订单"]
        },
        calculable: false,
        series: [
          {
            name: "漏斗图",
            type: "funnel",
            width: "50%",
            data: [
              {
                value: 60,
                name: "教授"
              },
              {
                value: 40,
                name: "副教授"
              },
              {
                value: 20,
                name: "高级教师"
              },
              {
                value: 80,
                name: "中级教师"
              },
              {
                value: 100,
                name: "教师"
              }
            ]
          },
          {
            name: "金字塔",
            type: "funnel",
            x: "50%",
            sort: "ascending",
            itemStyle: {
              normal: {
                // color: 各异,
                label: {
                  position: "left"
                }
              }
            },
            data: [
              {
                value: 60,
                name: "导师"
              },
              {
                value: 40,
                name: "博士后"
              },
              {
                value: 20,
                name: "博士"
              },
              {
                value: 80,
                name: "研究生"
              },
              {
                value: 100,
                name: "师范"
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
      self.init("bottomChart8", self.bottomChart8Option);
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
      var myChart = this.$echarts.init(document.getElementById("bottomChart8"));
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
          this.bottomChart8Option.legend.data = [];
          this.bottomChart8Option.series[0].data = [];
          let self = this;
          // xxdata.bottomChart8["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.bottomChart8Option.legend.data.push(val["system"]);
              self.bottomChart8Option.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("bottomChart8", this.bottomChart8Option);
          myChart.setOption(this.bottomChart8Option);
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

