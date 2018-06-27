<template>
    <div class="echartsContainer" id="bottomChart6Container">
        <span class="title_box" :class="{'visibilityNone':false}">综合课程设置</span>
        <div id="bottomChart6" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      bottomChart6Dom: {},
      //设备排名的配置数据
      bottomChart6Option: {
        title: {
          show: false,
          text: "综合课程设置",
          subtext: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: false,
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: ["000", "111"]
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
        polar: [
          {
            center: ["50%", "50%"],
            radius: '60%',
            indicator: [
              {
                text: "语、数、外",
                max: 6000
              },
              {
                text: "生物、化学",
                max: 16000
              },
              {
                text: "物理",
                max: 30000
              },
              {
                text: "政治、历史",
                max: 38000
              },
              {
                text: "地理",
                max: 52000
              },
              {
                text: "计算机教育",
                max: 25000
              }
            ]
          }
        ],
        calculable: false,
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销（Actual Spending）"
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
      self.init("bottomChart6", self.bottomChart6Option);
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
      var myChart = this.$echarts.init(document.getElementById("bottomChart6"));
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
          this.bottomChart6Option.legend.data = [];
          this.bottomChart6Option.series[0].data = [];
          let self = this;
          // xxdata.bottomChart6["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.bottomChart6Option.legend.data.push(val["system"]);
              self.bottomChart6Option.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("bottomChart6", this.bottomChart6Option);
          myChart.setOption(this.bottomChart6Option);
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

