<template>
  <div class="echartsContainer" id="serviceWorkingNumContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.MonthlyBootNumber')}}</span>
    <div id="serviceWorkingNum" :class="{'visibilityNone':isError}"></div>
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
      serviceWorkingNumDom: {},
      serviceWorkingNumOption: {
        color: ["#435375", "#87823E", "#87823E"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          right: "10%",
          bottom: "20%",
          width: "70%",
          height: "55%"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            myTool1: {
              show: true,
              title: "每月开机详情",
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
            name: "开机次数",
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
            name: "开机次数",
            type: "bar",
            data: [11, 54, 97, 23, 25, 76, 85, 62, 32, 20, 96, 16]
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
      this.serviceWorkingNumOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.serviceWorkingNumOption;
        var xAxisData = opt.xAxis[0].data;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>月份</th>" +
          "<th>开机次数(次)</th>" +
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
      this.serviceWorkingNumOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "serviceWorkingNum",
          echartsHtml =
            '<span class="title_box">每月开机数量</span><div id="serviceWorkingNum"></div>',
          option = self.serviceWorkingNumOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.serviceWorkingNumOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/serviceWorkingNum");
        } else {
          window.open("#/dataMap/oneEcharts/serviceWorkingNum/" + cityCode);
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
        document.getElementById("serviceWorkingNum")
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
        dz_type: "serviceWorkingNum"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          this.serviceWorkingNumOption.xAxis[0].data = [];
          this.serviceWorkingNumOption.series[0].data = [];
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            this.isError = false;
            // xxdata.serviceWorkingNum["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.serviceWorkingNumOption.xAxis[0].data.push(val["time"]);
              self.serviceWorkingNumOption.series[0].data.push(val["num"]);
            });

            // this.init("serviceWorkingNum", this.serviceWorkingNumOption);
          }else{
            self.isError = true;
          }

          myChart.setOption(this.serviceWorkingNumOption);
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

