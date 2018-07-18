<template>
  <div class="echartsContainer" id="userActivityContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.UserActivity')}}</span>
    <div id="userActivity" :class="{'visibilityNone':isError}"></div>
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
      isError: false,
      userActivityDom: {},
      userActivityOption: {
        tooltip: {
          trigger: "axis",
          formatter: "用户{b}: 使用 {c}小时"
        },
        grid: {
          show: false
        },
        calculable: true,
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
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
        grid: {
          bottom: "10%",
          height: "80%",
          width: "60%",
          left: "20%"
        },
        xAxis: [
          {
            type: "value",
            boundaryGap: [0, 0.01],
            axisLine: {
              show: false,
              lineStyle: {
                color: theme.fontColor
              }
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: [
              
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: theme.fontColor
              }
            },
            splitLine: {
              show: false
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#935B19"
              }
            },
            data: [
              // 15,
              // 115,
              // 215,
              // 315,
              // 415,
              // 515,
              // 615,
              // 715,
              // 815,
              // 915
            ],
            axisLine: {
              lineStyle: {
                color: theme.fontColor
              }
            }
          }
        ]
      }
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
      this.userActivityOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.userActivityOption;
        var yAxisData = opt.yAxis[0].data;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>用户ID</th>" +
          // + '<th>地区</th>'
          // + '<th>当前应用</th>'
          "<th>连接时间</th>" +
          "</tr>";
        for (var i = 0, l = yAxisData.length; i < l; i++) {
          table +=
            "<tr>" +
            "<td>" +
            yAxisData[i] +
            "</td>" +
            "<td>" +
            series[i] +
            "</td>";
        }
        table += "</tbody></table>";

        $(".modal-body").html(table);
        $("#myModal").modal();
      };
      this.userActivityOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "userActivity",
          echartsHtml =
            '<span class="title_box">用户活跃度</span><div id="userActivity"></div>',
          option = self.userActivityOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.userActivityOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/userActivity");
        } else {
          window.open("#/dataMap/oneEcharts/userActivity/" + cityCode);
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
      var myChart = this.$echarts.init(document.getElementById("userActivity"));
      myChart.showLoading(this.loadingConfig);
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }
      //
      let params = {
        curentCityCode: this.curentCityCode,
        dz_type: "cityCustomActivity"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          let self = this;
          this.isError = false;
          this.userActivityOption.yAxis[0].data = [];
          this.userActivityOption.series[0].data = [];
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            // xxdata.cityCustomActivity["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.userActivityOption.yAxis[0].data.push(val["cityName"]);
              self.userActivityOption.series[0].data.push(val["termNum"]);
            });
            self.userActivityOption.yAxis[0].data.reverse();
            self.userActivityOption.series[0].data.reverse();
            // this.init("userActivity", this.userActivityOption);
          } else {
            self.isError = true;
          }
          myChart.setOption(this.userActivityOption);
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

