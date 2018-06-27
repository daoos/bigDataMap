<template>
  <div class="echartsContainer" id="IncidenceOfSpecialDiseaseAreaContainer">
    <span class="title_box" :class="{'visibilityNone':false}">【特症地区发病率】</span>
    <div id="IncidenceOfSpecialDiseaseArea" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      IncidenceOfSpecialDiseaseAreaDom: {},
      //设备排名的配置数据
      IncidenceOfSpecialDiseaseAreaOption: {
        title: {
          show: false,
          text: "【特症地区发病率】",
          subtext: ""
        },
        tooltip: {
          formatter: function(params) {
            console.log(params);
            return params.value[0];
          }
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
        legend: {
          show: false,
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: ["000", "111"]
        },
        xAxis: {
          type: "category",
          data: ["湖南", "湖北", "广东", "广西", "云南"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ])
              },
              emphasis: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: [6000, 12000, 46000, 9000, 16000]
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
      this.IncidenceOfSpecialDiseaseAreaOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.IncidenceOfSpecialDiseaseAreaOption,
          seriesData = opt.series[0].data,
          xAxisData = opt.xAxis.data;
        var series = opt.series;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th >类型</th>" +
          "<th >数量</th>" +
          // "<th >百分比</th>" +
          "</tr>";
        for (var i = 0, l = seriesData.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            xAxisData[i] +
            "</td>" +
            "<td>" +
            seriesData[i] +
            // "</td>" +
            // "<td>" +
            // self.percentDataFilter(0.333333) +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.IncidenceOfSpecialDiseaseAreaOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/IncidenceOfSpecialDiseaseArea");
        } else {
          window.open("#/dataMap/oneEcharts/IncidenceOfSpecialDiseaseArea/" + cityCode);
        }
      };
      self.init(
        "IncidenceOfSpecialDiseaseArea",
        self.IncidenceOfSpecialDiseaseAreaOption
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
        document.getElementById("IncidenceOfSpecialDiseaseArea")
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
          // this.IncidenceOfSpecialDiseaseAreaOption.legend.data = [];
          // this.IncidenceOfSpecialDiseaseAreaOption.series[0].data = [];
          let self = this;
          // xxdata.IncidenceOfSpecialDiseaseArea["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0&&0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.IncidenceOfSpecialDiseaseAreaOption.legend.data.push(
                val["system"]
              );
              self.IncidenceOfSpecialDiseaseAreaOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.IncidenceOfSpecialDiseaseAreaOption.series[0].data.map(function(
              item,
              index
            ) {
              self.IncidenceOfSpecialDiseaseAreaOption.series[0].data[
                index
              ] = self.randomData(200, 1700);
            });
            // self.isError = true;
          }

          // this.init("IncidenceOfSpecialDiseaseArea", this.IncidenceOfSpecialDiseaseAreaOption);
          myChart.setOption(this.IncidenceOfSpecialDiseaseAreaOption);
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

