<template>
  <div class="echartsContainer" id="horLineEchartContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.LossOfTraffic')}}</span>
    <div class="bottom-map-container" id="horLineEchart" :class="{'visibilityNone':isError}"></div>
    <span class="nodataMsg" :class="{'visibilityNone':!isError}">没有数据！</span>
    <div :class="{'none':settingConfig.echartsContainer!='2'}" class="horn">
      <div class="lt"></div>
      <div class="rt"></div>
      <div class="rb"></div>
      <div class="lb"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
var theme = {
  fontColor: "#8BA0B9"
};
export default {
  data() {
    return {
      horLineEchartDom: {},
      horLineEchartOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: true,
          top: 10,
          height: 5,
          textStyle:{
            color:"#fff"
          },
          data: ["xshell", "xftp", "ie", "wps"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            myTool1: {
              show: true,
              title: "流量损耗去向详情",
              icon: echartBtns.detail,
              onclick() {}
            },
            myTool3: {
              show: true,
              title: "全屏",
              icon: echartBtns.FullScreenPng,
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
        grid: { height: "55%", bottom: "23%", left: "15%" },
        calculable: true,
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周二", "周三", "周四", "周五"],
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            }
          }
        ],
        series: [
          {
            name: "xshell",
            type: "bar",
            stack: "总量",
            barWidth: "40%",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [20, 102, 301, 334, 199]
          },
          {
            name: "xftp",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [20, 132, 101, 134, 78]
          },
          {
            name: "ie",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [220, 182, 191, 234, 36]
          },
          {
            name: "wps",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: { label: { show: true, position: "insideRight" } }
            },
            data: [50, 212, 201, 154, 496]
          }
        ]
      },
      isError: false
    };
  },
  computed: {
    ...mapGetters(["echartsData", "loadingConfig", "settingConfig"])
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {
      // 自定义 按钮 事件定义
      // 为每个图标分别帮分工不同的事件
      let self = this;
      this.horLineEchartOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.horLineEchartOption;
        var xAxisData = opt.xAxis[0].data;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>日期</th>";
        for (var j = 0, len = opt.series.length; j < len; j++) {
          table += "<th>" + opt.series[j].name + "</th>";
        }
        table += "</tr>";
        for (var i = 0, l = series.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            xAxisData[i] +
            "</td>" +
            "<td>" +
            opt.series[0].data[i] +
            "</td>" +
            "<td>" +
            opt.series[1].data[i] +
            "</td>" +
            "<td>" +
            opt.series[2].data[i] +
            "</td>" +
            "<td>" +
            opt.series[3].data[i] +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.horLineEchartOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "horLineEchart",
          echartsHtml =
            '<span class="title_box">流量损耗去向</span><div class="bottom-map-container" id="horLineEchart"></div>',
          option = self.horLineEchartOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.horLineEchartOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/horLineEchart");
        } else {
          window.open("#/dataMap/oneEcharts/horLineEchart/" + cityCode);
        }
      };
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
    },
    getData(cityName) {
      var myChart = this.$echarts.init(
        document.getElementById("horLineEchart")
      );
      myChart.showLoading(this.loadingConfig);
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }
      //
      let params = {
        curentCityCode: this.curentCityCode,
        dz_type: "horLineEchart"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            this.isError = false;
            this.horLineEchartOption.xAxis[0].data = [];
            this.horLineEchartOption.series[0].data = [];
            this.horLineEchartOption.series[1].data = [];
            this.horLineEchartOption.series[2].data = [];
            this.horLineEchartOption.series[3].data = [];
            // xxdata.horLineEchart["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.horLineEchartOption.xAxis[0].data.push(val["time"]);
              self.horLineEchartOption.series[0].data.push(val["wps"]);
              self.horLineEchartOption.series[1].data.push(val["excel"]);
              self.horLineEchartOption.series[2].data.push(val["ps"]);
              self.horLineEchartOption.series[3].data.push(val["word"]);
            });
          } else {
            self.isError = true;
          }
          // this.init("horLineEchart", this.horLineEchartOption);
          myChart.setOption(this.horLineEchartOption);
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

