<template>
    <div class="echartsContainer" id="StructureOfStudentEnrollmentContainer">
        <span class="title_box" :class="{'visibilityNone':false}">季度招生生源结构</span>
        <div id="StructureOfStudentEnrollment" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      StructureOfStudentEnrollmentDom: {},
      //设备排名的配置数据
      StructureOfStudentEnrollmentOption: {
        title: {
          show: false,
          text: "季度招生生源结构",
          subtext: "",
          x: "left"
        },
        tooltip: {
          trigger: "item",
          
        },
        legend: {
          show: false,
          orient: "vertical",
          x: "bottom",
          data: ["异地转学", "适龄就近入学", "特长特招", "正常升级"]
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
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left",
                  max: 1548
                }
              }
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: false,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: 335,
                name: "异地转学"
              },
              {
                value: 310,
                name: "适龄就近入学"
              },
              {
                value: 234,
                name: "特长特招"
              },
              {
                value: 135,
                name: "正常升级"
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
      self.init(
        "StructureOfStudentEnrollment",
        self.StructureOfStudentEnrollmentOption
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
        document.getElementById("StructureOfStudentEnrollment")
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
          this.StructureOfStudentEnrollmentOption.legend.data = [];
          this.StructureOfStudentEnrollmentOption.series[0].data = [];
          let self = this;
          // xxdata.StructureOfStudentEnrollment["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.StructureOfStudentEnrollmentOption.legend.data.push(
                val["system"]
              );
              self.StructureOfStudentEnrollmentOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          // this.init("StructureOfStudentEnrollment", this.StructureOfStudentEnrollmentOption);
          myChart.setOption(this.StructureOfStudentEnrollmentOption);
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

