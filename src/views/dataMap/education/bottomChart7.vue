<template>
    <div class="echartsContainer" id="bottomChart7Container">
        <span class="title_box" :class="{'visibilityNone':false}">地方教育资源结构</span>
        <div id="bottomChart7" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      bottomChart7Dom: {},
      //设备排名的配置数据
      bottomChart7Option: {
        title: {
          text: "地方教育资源结构",
          x: "left",
          y: "top"
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (params.indicator2) {
              // is edge
              return (
                params.indicator2 + " " + params.name + " " + params.indicator
              );
            } else {
              // is node
              return params.name;
            }
          }
        },
        legend: {
          show: false,
          x: "left",
          data: ["民办学校", "国际私立", "公办学校"]
        },
        series: [
          {
            name: "地方教育资源结构",
            type: "chord",
            sort: "ascending",
            sortSub: "descending",
            ribbonType: false,
            radius: "60%",
            itemStyle: {
              normal: {
                label: {
                  rotate: true
                }
              }
            },
            minRadius: 7,
            maxRadius: 20,
            // 使用 nodes links 表达和弦图
            nodes: [
              {
                name: "第一中学"
              },
              {
                name: "第二中学"
              },
              {
                name: "第三中学"
              },
              {
                name: "第四中学"
              },
              {
                name: "第五中学"
              },
              {
                name: "枫叶国际学校"
              },
              {
                name: "阿拉丁教育"
              },
              {
                name: "蒙特棱利教育"
              },
              {
                name: "育仁中学",
                symbol: "star"
              },
              {
                name: "实验高中"
              },
              {
                name: "育才小学"
              },
              {
                name: "风华集团农民工子弟学校"
              },
              {
                name: "民办学校"
              },
              {
                name: "国际私立"
              },
              {
                name: "公办学校"
              }
            ],
            links: [
              {
                source: "民办学校",
                target: "风华集团农民工子弟学校",
                weight: 1,
                name: "效力"
              },
              {
                source: "民办学校",
                target: "育才小学",
                weight: 1,
                name: "效力"
              },
              {
                source: "民办学校",
                target: "育仁中学",
                weight: 1,
                name: "效力"
              },
              {
                source: "国际私立",
                target: "枫叶国际学校",
                weight: 1,
                name: "效力"
              },
              {
                source: "国际私立",
                target: "蒙特棱利教育",
                weight: 1,
                name: "效力"
              },
              {
                source: "国际私立",
                target: "阿拉丁教育",
                weight: 1,
                name: "效力"
              },
              {
                source: "公办学校",
                target: "第四中学",
                weight: 1,
                name: "效力"
              },
              {
                source: "公办学校",
                target: "第三中学",
                weight: 1,
                name: "效力"
              },
              {
                source: "公办学校",
                target: "第二中学",
                weight: 1,
                name: "效力"
              },
              {
                source: "公办学校",
                target: "第一中学",
                weight: 1,
                name: "效力"
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
      self.init("bottomChart7", self.bottomChart7Option);
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
      var myChart = this.$echarts.init(document.getElementById("bottomChart7"));
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
          this.bottomChart7Option.legend.data = [];
          this.bottomChart7Option.series[0].data = [];
          let self = this;
          // xxdata.bottomChart7["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.bottomChart7Option.legend.data.push(val["system"]);
              self.bottomChart7Option.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("bottomChart7", this.bottomChart7Option);
          myChart.setOption(this.bottomChart7Option);
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

