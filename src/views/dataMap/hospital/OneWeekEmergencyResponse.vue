<template>
  <div class="echartsContainer" id="OneWeekEmergencyResponseContainer">
    <span class="title_box" :class="{'visibilityNone':false}">【一周急诊接诊量】</span>
    <div id="OneWeekEmergencyResponse" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      OneWeekEmergencyResponseDom: {},
      //设备排名的配置数据
      OneWeekEmergencyResponseOption: {
        title: {
          show: false,
          text: "【一周急诊接诊量】",
          subtext: ""
        },

        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            myTool1: {
              show: true,
              title: "详情",
              icon: echartBtns.detail,
              onclick() {}
            },
            myTool4: {
              show: true,
              title: "新页面打开",
              icon: echartBtns.NewTabPng,
              onclick() {}
            }
          }
        },
        calculable: false,
        legend: {
          show: false,
          data: ["本地就诊", "外地就诊"]
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周七"]
          }
        ],
        grid: { height: "50%", bottom: "20%", left: "20%", width: "60%" },
        yAxis: [
          {
            type: "value",
            name: "人数",
            axisLabel: {
              formatter: "{value} 百个"
            }
          }
        ],
        series: [
          {
            name: "本地就诊",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
          },
          {
            name: "外地就诊",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
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
      this.OneWeekEmergencyResponseOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.OneWeekEmergencyResponseOption,
          seriesData = opt.series[0].data;
        var series = opt.series;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th >类型</th>" +
          "<th >周一</th>" +
          "<th >周二</th>" +
          "<th >周三</th>" +
          "<th >周四</th>" +
          "<th >周五</th>" +
          "<th >周六</th>" +
          "<th >周七</th>" +
          // "<th >百分比</th>" +
          "</tr>" +
          "<tr><td >本地就诊</td>";
        for (var i = 0, l = seriesData.length; i < l; i++) {
          table += "<td>" + seriesData[i] + "</td>" ;
        }
        table += "<tr><td >外地就诊</td>";
        for (var i = 0, l = opt.series[1].data.length; i < l; i++) {
          table += "<td>" + opt.series[1].data[i] + "</td>" ;
        }
        table += "</tr></tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.OneWeekEmergencyResponseOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/OneWeekEmergencyResponse");
        } else {
          window.open("#/dataMap/oneEcharts/OneWeekEmergencyResponse/" + cityCode);
        }
      };
      self.init(
        "OneWeekEmergencyResponse",
        self.OneWeekEmergencyResponseOption
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
        document.getElementById("OneWeekEmergencyResponse")
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
          // this.OneWeekEmergencyResponseOption.legend.data = [];
          // this.OneWeekEmergencyResponseOption.series[0].data = [];
          let self = this;
          // xxdata.OneWeekEmergencyResponse["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0 &&
            0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.OneWeekEmergencyResponseOption.legend.data.push(
                val["system"]
              );
              self.OneWeekEmergencyResponseOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.OneWeekEmergencyResponseOption.series[0].data.map(function(
              item,
              index
            ) {
              self.OneWeekEmergencyResponseOption.series[0].data[
                index
              ] = self.randomData(5, 99);
            });

            self.OneWeekEmergencyResponseOption.series[1].data.map(function(
              item,
              index
            ) {
              self.OneWeekEmergencyResponseOption.series[1].data[
                index
              ] = self.randomData(5, 99);
            });
            // self.isError = true;
          }

          // this.init("OneWeekEmergencyResponse", this.OneWeekEmergencyResponseOption);
          myChart.setOption(this.OneWeekEmergencyResponseOption);
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

