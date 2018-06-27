<template>
  <div class="echartsContainer" id="ReceptionOfLoopRatioContainer">
    <span class="title_box" :class="{'visibilityNone':false}">【接诊环比情况】</span>
    <div id="ReceptionOfLoopRatio" :class="{'visibilityNone':isError}" class="educationEcharts"></div>
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
      ReceptionOfLoopRatioDom: {},
      //设备排名的配置数据
      ReceptionOfLoopRatioOption: {
        title: {
          show: false,
          text: "【接诊环比情况】",
          subtext: "",
          x: "left"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          show: false,
          orient: "vertical",
          x: "bottom",
          data: ["急症", "门诊", "住院"]
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
        series: [
          {
            name: "【接诊环比情况】",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: this.randomData(335, 800),
                name: "急症"
              },
              {
                value: this.randomData(335, 800),
                name: "门诊"
              },
              {
                value: this.randomData(335, 800),
                name: "住院"
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
      this.ReceptionOfLoopRatioOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.ReceptionOfLoopRatioOption,
          seriesData = opt.series[0].data;
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
            seriesData[i]["name"] +
            "</td>" +
            "<td>" +
            seriesData[i]["value"] +
            // "</td>" +
            // "<td>" +
            // self.percentDataFilter(0.333333) +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.ReceptionOfLoopRatioOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/ReceptionOfLoopRatio");
        } else {
          window.open("#/dataMap/oneEcharts/ReceptionOfLoopRatio/" + cityCode);
        }
      };
      self.init("ReceptionOfLoopRatio", self.ReceptionOfLoopRatioOption);
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
        document.getElementById("ReceptionOfLoopRatio")
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
        dz_type: "ReceptionOfLoopRatio"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          // this.ReceptionOfLoopRatioOption.legend.data = [];
          // this.ReceptionOfLoopRatioOption.series[0].data = [];
          let self = this;
          // xxdata.ReceptionOfLoopRatio["result"].map(function(val) {
          if (
            xxdata.data != null &&
            xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.ReceptionOfLoopRatioOption.legend.data.push(val["system"]);
              self.ReceptionOfLoopRatioOption.series[0].data.push({
                value: val["systemNum"],
                name: val["system"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.ReceptionOfLoopRatioOption.series[0].data.map(function(
              item,
              index
            ) {
              self.ReceptionOfLoopRatioOption.series[0].data[
                index
              ].value = self.randomData(100, 700);
            });
            // self.isError = true;
          }

          myChart.setOption(this.ReceptionOfLoopRatioOption);
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

