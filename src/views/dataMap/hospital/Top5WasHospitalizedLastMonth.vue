<template>
  <div class="echartsContainer" id="Top5WasHospitalizedLastMonthContainer">
    <span class="title_box" :class="{'visibilityNone':false}">【上月住院收治TOP5】</span>
    <div id="Top5WasHospitalizedLastMonth" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      Top5WasHospitalizedLastMonthDom: {},
      //设备排名的配置数据
      Top5WasHospitalizedLastMonthOption: {
        title: {
          show: false,
          text: "【上月住院收治TOP5】",
          subtext: ""
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          show: true,
          feature: {
            myTool4: {
              show: true,
              title: "新页面打开",
              icon: echartBtns.NewTabPng,
              onclick() {}
            }
          }
        },
        calculable: false,
        series: [
          {
            name: "【上月住院收治TOP5】",
            type: "funnel",
            width: "50%",
            data: [
              {
                value: 50,
                name: "呼吸"
              },
              {
                value: 40,
                name: "心外科"
              },
              {
                value: 30,
                name: "外伤"
              },
              {
                value: 20,
                name: "肿瘤"
              },
              {
                value: 10,
                name: "妇科"
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
      this.Top5WasHospitalizedLastMonthOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/Top5WasHospitalizedLastMonth");
        } else {
          window.open("#/dataMap/oneEcharts/Top5WasHospitalizedLastMonth/" + cityCode);
        }
      };
      self.init(
        "Top5WasHospitalizedLastMonth",
        self.Top5WasHospitalizedLastMonthOption
      );
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
      var myChart = this.$echarts.init(
        document.getElementById("Top5WasHospitalizedLastMonth")
      );
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
          // this.Top5WasHospitalizedLastMonthOption.legend.data = [];
          // this.Top5WasHospitalizedLastMonthOption.series[0].data = [];
          let self = this;
          // xxdata.Top5WasHospitalizedLastMonth["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0&&0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.Top5WasHospitalizedLastMonthOption.legend.data.push(
                val["system"]
              );
              self.Top5WasHospitalizedLastMonthOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.Top5WasHospitalizedLastMonthOption.series[0].data.map(function(
              item,
              index
            ) {
              self.Top5WasHospitalizedLastMonthOption.series[0].data[
                index
              ].value = self.randomData(200, 1700);
            });
            // self.isError = true;
          }

          // this.init("Top5WasHospitalizedLastMonth", this.Top5WasHospitalizedLastMonthOption);
          myChart.setOption(this.Top5WasHospitalizedLastMonthOption);
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

