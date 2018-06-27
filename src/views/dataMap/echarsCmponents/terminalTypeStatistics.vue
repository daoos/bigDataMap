<template>
  <div class="echartsContainer" id="terminalTypeStatisticsContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.termTypeStatic')}}</span>
    <div id="terminalTypeStatistics" :class="{'visibilityNone':isError}"></div>
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
export default {
  data() {
    return {
      isError: false,
      curentCityCode: "",
      //设备类型 百分比统计
      terminalTypeStatisticsDom: {},
      //设备排名的配置数据
      terminalTypeStatisticsOption: {
        tooltip: {
          trigger: "item",
           formatter: "{b} : {c} ({d}%)"
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
        legend: {
          orient: "vertical",
          top: "10%",
          left: "5%",
          data: [
            "Windows",
            "linux",
            "mac",
            "Android",
            "Iphone",
            "Wphone",
            "其它"
          ]
        },
        calculable: true,
        series: [
          {
            name: "终端类型",
            type: "pie",
            radius: "55%",
            center: ["60%", "55%"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "Windows", proportion: "12%" },
              { value: 310, name: "linux", proportion: "12%" },
              { value: 234, name: "mac", proportion: "12%" },
              { value: 135, name: "Android", proportion: "12%" },
              { value: 1548, name: "Iphone", proportion: "12%" },
              { value: 1548, name: "Wphone", proportion: "12%" },
              { value: 154, name: "其它", proportion: "12%" }
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
      this.terminalTypeStatisticsOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.terminalTypeStatisticsOption,
          seriesData = opt.series[0].data;
        var series = opt.series;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th >设备类型</th>" +
          "<th >数量</th>" +
          "<th >百分比</th>" +
          "</tr>";
        for (var i = 0, l = seriesData.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            seriesData[i]["name"] +
            "</td>" +
            "<td>" +
            seriesData[i]["value"] +
            "</td>" +
            "<td>" +
            self.percentDataFilter(seriesData[i]["proportion"]) +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.terminalTypeStatisticsOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "terminalTypeStatistics",
          echartsHtml =
            '<span class="title_box">设备类型比例</span><div id="terminalTypeStatistics"></div>',
          option = self.terminalTypeStatisticsOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.terminalTypeStatisticsOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/terminalTypeStatistics");
        } else {
          window.open(
            "#/dataMap/oneEcharts/terminalTypeStatistics/" + cityCode
          );
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
      return myChart;
    },
    // 获取数据
    getData(cityName) {
      var myChart = this.$echarts.init(
        document.getElementById("terminalTypeStatistics")
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
        dz_type: "osType"
        // dz_type: "terminalTypeStatistics"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          this.terminalTypeStatisticsOption.legend.data = [];
          this.terminalTypeStatisticsOption.series[0].data = [];
          let self = this;
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            this.isError = false;
            // xxdata.terminalTypeStatistics["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.terminalTypeStatisticsOption.legend.data.push(val["os"]);
              self.terminalTypeStatisticsOption.series[0].data.push({
                value: val["osNum"],
                name: val["os"],
                proportion: val["proportion"]
              });
            });
            // this.init("terminalTypeStatistics", this.terminalTypeStatisticsOption);
          } else {
            self.isError = true;
          }
          myChart.setOption(this.terminalTypeStatisticsOption);
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

