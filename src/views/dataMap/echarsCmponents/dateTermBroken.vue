<template>
  <div class="echartsContainer" id="dateTermBrokenContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.EquipmentFailureRate')}}</span>
    <div id="dateTermBroken" :class="{'visibilityNone':isError}"></div>
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
      dateTermBrokenDom: {},
      dateTermBrokenOption: {
        color: ["#435375", "#87823E", "#87823E"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          right: "10%",
          // bottom: "30%",
          width: "70%",
          height: "55%"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            myTool1: {
              show: true,
              title: "设备故障详情",
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
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "损坏数量",
            position: "left",
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "损坏数量",
            type: "bar",
            data: [2, 4, 7, 23, 25, 76, 85, 62, 32, 20, 6, 3]
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
      this.dateTermBrokenOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.dateTermBrokenOption;
        var xAxisData = opt.xAxis[0].data;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>月份</th>" +
          "<th>故障设备数量(个)</th>" +
          "</tr>";
        for (var i = 0, l = xAxisData.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            xAxisData[i] +
            "</td>" +
            "<td>" +
            series[i] +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.dateTermBrokenOption.toolbox.feature.myTool3.onclick = function() {
        console.log("tool3");
        var echartsId = "dateTermBroken",
          echartsHtml =
            '<span class="title_box">设备故障率</span><div id="dateTermBroken"></div>',
          option = self.dateTermBrokenOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.dateTermBrokenOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/dateTermBroken");
        } else {
          window.open("#/dataMap/oneEcharts/dateTermBroken/" + cityCode);
        }
      };
      //表格初始化
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
    // 获取数据
    getData(cityName) {
      var myChart = this.$echarts.init(
        document.getElementById("dateTermBroken")
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
        dz_type: "dateTermBroken"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          this.isError = false;
          this.dateTermBrokenOption.xAxis[0].data = [];
          this.dateTermBrokenOption.series[0].data = [];
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            // xxdata.dateTermBroken["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.dateTermBrokenOption.xAxis[0].data.push(val["time"]);
              self.dateTermBrokenOption.series[0].data.push(val["num"]);
            });
          }else{
            self.isError = true;
          }

          myChart.setOption(this.dateTermBrokenOption);
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
    },
    // 监视 表格配置参数中是否有 dateterm-broken 有就重新渲染当前表格
    left1: {
      handler(val, oldVal) {
        console.log(val);
        if (val == "dateterm-broken") {
          this.init("dateTermBroken", this.dateTermBrokenOption);
        }
      },
      deep: true
    }
  }
};
</script>

