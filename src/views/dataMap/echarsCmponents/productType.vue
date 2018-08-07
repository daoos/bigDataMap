<template>
  <div class="echartsContainer" id="productTypeContainer">
    <span class="title_box" :class="{'visibilityNone':false}">{{$t('echartsTitle.ProductTypeRatio')}}</span>
    <div id="productType" class="echartsContainer" :class="{'visibilityNone':isError}"></div>
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
      curentCityCode: "",
      // 图片的路径
      imgPaht: "@/assets/img/FullScreen.png",
      //设备类型 百分比统计
      productTypeDom: {},
      //设备排名的配置数据
      productTypeOption: {
        tooltip: {
          show:true,
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
          textStyle:{
            color:"#fff"
          },
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
            center: ["60%", "45%"],
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
      },
      isError: false
    };
  },
  props: {
    isRefresh: {
      type: Boolean,
      default: false,
      required: false
    }
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
      this.productTypeOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.productTypeOption,
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
      this.productTypeOption.toolbox.feature.myTool3.onclick = function() {
        var echartsId = "productType",
          echartsHtml =
            '<span class="title_box">产品类型比例</span><div id="productType" class="echartsContainer"></div>',
          option = self.productTypeOption;
        self.myTool3(echartsId, echartsHtml, option, self);
      };
      this.productTypeOption.toolbox.feature.myTool4.onclick = function() {
        var cityCode = self.$route.params.cityCode;
        if (cityCode === undefined) {
          window.open("#/dataMap/oneEcharts/productType");
        } else {
          window.open("#/dataMap/oneEcharts/productType/" + cityCode);
        }
      };

      if (this.isRefresh) {
        this.init("productType", this.productTypeOption);
      }
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
      var myChart = this.$echarts.init(document.getElementById("productType"));
      myChart.showLoading(this.loadingConfig);
      if (cityMap[cityName] !== undefined) {
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityCode = cityMap["中国"];
      }
      //
      let params = {
        curentCityCode: this.curentCityCode,
        dz_type: "productType"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          this.productTypeOption.legend.data = [];
          this.productTypeOption.series[0].data = [];
          let self = this;
          if (
            xxdata.data!=null&&xxdata.data["result"] != null &&
            xxdata.data["result"].length > 0
          ) {
            this.isError = false;
            // xxdata.productType["result"].map(function(val) {
            xxdata.data["result"].map(function(val) {
              self.productTypeOption.legend.data.push(val["veName"]);
              self.productTypeOption.series[0].data.push({
                value: val["veNum"],
                name: val["veName"],
                proportion: val["proportion"]
              });
            });
          } else {
            self.isError = true;
          }

          myChart.setOption(this.productTypeOption);
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

