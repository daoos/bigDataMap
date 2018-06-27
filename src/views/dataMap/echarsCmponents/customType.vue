<template>
  <div class="echartsContainer" id="customTypeRadioContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.customType')}}</span>
    <div id="customTypeRadio" :class="{'visibilityNone':isError}"></div>
    <div :class="{'none':settingConfig.echartsContainer!='2'}" class="horn">
      <div class="lt"></div>
      <div class="rt"></div>
      <div class="rb"></div>
      <div class="lb"></div>
    </div>
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
      termTypeRadioDom: {},
      //设备排名的配置数据
      termTypeRadioOption: {
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
      this.termTypeRadioOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.termTypeRadioOption,
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
      this.termTypeRadioOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "customTypeRadio",
          echartsHtml =
            '<span class="title_box">单位类型统计</span><div id="customTypeRadio"></div>',
          option = self.termTypeRadioOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.termTypeRadioOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/customTypeRadio");
        } else {
          window.open("#/dataMap/oneEcharts/customTypeRadio/" + cityCode);
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
        document.getElementById("customTypeRadio")
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
        dz_type: "customType"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          this.termTypeRadioOption.legend.data = [];
          this.termTypeRadioOption.series[0].data = [];
          let self = this;
          // xxdata.customTypeRadio["result"].map(function(val) {
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            self.isError = false;
            xxdata.data["result"].map(function(val) {
              self.termTypeRadioOption.legend.data.push(val["typeName"]);
              self.termTypeRadioOption.series[0].data.push({
                value: val["typeNum"],
                name: val["typeName"],
                proportion: val["proportion"]
                // value: val["osNum"],
                // name: val["os"],
                // proportion: val["proportion"]
              });
            });
          }else{
            self.isError = true;
          }

          // this.init("customTypeRadio", this.termTypeRadioOption);
          myChart.setOption(this.termTypeRadioOption);
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

