<template>
  <!-- <div class="row" id="MainMapContainer" style="height:60vh;width:50vw"> -->
  <div class="row" id="MainMapContainer">
    <div id="MainMap" class="mainMap" style="height:80vh;width:95.8vw;margin:0 auto"></div>
    <!-- <iframe style="width:100%;height:100%" src="./static/DataWeb/hainanzfzyxycm.html" frameborder="0"></iframe> -->
  </div>
</template>
<script>
import { Message } from "element-ui";
require("echarts-gl");
var theme = {
  fontColor: "#8BA0B9"
};
/**
 *  鼠标指向悬浮框回调处理
 * ------------------------------------------------*/
function nTooltip(params, ticket, callback) {
  switch (params.componentSubType) {
    case "effectScatter":
      /** 标注 */
      $(".DivShow").remove();
      ShowMarkTip(params, ticket, callback);
      break;
    case "scatter3D":
      /** 标注 */
      $(".DivShow").remove();
      ShowMarkTip(params, ticket, callback);
      break;
    case "map":
      /** 区块 */
      $(".DivShow").remove();
      ShowMapTip(params, ticket, callback);
      break;
    case "map3D":
      /** 区块 */
      $(".DivShow").remove();
      ShowMapTip(params, ticket, callback);
      break;
  }
  return "...";
}
var markEZinfoList = {};
function ShowMarkTip(params, ticket, callback) {
  //var name = params.name;
  var markID = params.value[2],
    hostUrl = "";
  if (
    markEZinfoList[markID] != undefined &&
    markEZinfoList[markID] != null &&
    markEZinfoList[markID]["url"] != null
  ) {
    var DivShow =
      "<div class='DivShow' style='width: auto;height: auto;padding: 20px 30px;'>";
    DivShow += "<div>";
    if (markEZinfoList[markID].name != -1) {
      DivShow += "<p>显示名称 " + markEZinfoList[markID].name + "</p>";
      //DivShow += "<p>跳转网址 "+ markEZinfoList[ markID  ].url +"</p>";
    }
    if (markEZinfoList[markID].online_workstation_num != -1) {
      DivShow +=
        "<p>在线终端数 " +
        markEZinfoList[markID].online_workstation_num +
        "</p>";
      //DivShow += "<p>是否在线 "+ markEZinfoList[ markID  ].json_zt +"</p>";
    }
    if (markEZinfoList[markID].location != -1) {
      DivShow += "<p>地址 " + markEZinfoList[markID].location + "</p>";
    }
    if (markEZinfoList[markID].total_workstation_num != -1) {
      DivShow +=
        "<p>终端总数 " + markEZinfoList[markID].total_workstation_num + "</p>";
      //DivShow += "<p>坐标 "+ markEZinfoList[ markID  ].coordinate +"</p>";
    }
    if (markEZinfoList[markID].online_server_num != -1) {
      DivShow +=
        "<p>在线服务器数 " + markEZinfoList[markID].online_server_num + "</p>";
    }
    if (markEZinfoList[markID].admin_contact != -1) {
      // "<img src='" + hostUrl + markEZinfoList[markID].photo_url + "'/>";
      DivShow += "<p>联系方式 " + markEZinfoList[markID].admin_contact + "</p>";
    }
    if (markEZinfoList[markID].admin_name != -1) {
      DivShow += "<p>管理员 " + markEZinfoList[markID].admin_name + "</p>";
    }
    if (markEZinfoList[markID].photo_url != -1) {
      DivShow += "<p>照片:</p>";
      DivShow +=
        "<img style='max-width:150px;max-height:150px;padding-left:50px' src='//" +
        markEZinfoList[markID].photo_url +
        "'/>";
    }
    DivShow += "</div>";
    DivShow += "</div>";
    //  setTimeout( function () {
    //     callback( ticket, DivShow );
    // },500);
  } else {
    var DivShow =
      "<div class='DivShow' style='width: auto;height: auto;padding: 20px 30px;'>";
    DivShow += "<div>";
    DivShow += "<p>管理员 " + markEZinfoList[markID].admin_name + "</p>";
    DivShow += "</div>";
    DivShow += "</div>";
  }
  var e = window.event;
  var pagex = e.clientX;
  var pagey = e.clientY;
  //console.info(e);
  $(".DivShow").remove();
  $(document.body).append(DivShow);
  $(".DivShow").css({
    position: "absolute",
    left: pagex + 10 + "px",
    top: pagey + 10 + "px",
    // left: pagex + 70 + "px",
    // top: pagey - 120 + "px",
    padding: "10px 30px 10px 30px",
    backgroundColor: "rgba(119,129,145,.4)",
    color: "#fff",
    textAlign: "left",
    zIndex: 100000
  });
  // $(".DivShow").mouseout(function() {
  $(".DivShow").mouseleave(function() {
    $(".DivShow").remove();
  });
}
function ShowMapTip(params, ticket, callback) {
  var CityCode = cityMap[params.name];
}
function MapMarkTipClick(params) {
  console.log(params);
  var markID = params.value[2];
  if (markEZinfoList[markID] != undefined && markEZinfoList[markID] != null) {
    if (markEZinfoList[markID].url == undefined) {
      Message({
        message: "当前坐标没有跳转",
        type: "warning",
        showClose: true
      });
    } else {
      var gotoURL = markEZinfoList[markID].url;
      if (gotoURL.indexOf("/dataMap/") == -1) {
        gotoURL = "//" + gotoURL;
      }
      // alert("页面即将跳转到" + gotoURL);
      window.open(gotoURL);
    }
  }
}
var geoCoordMap = {};
var convertData = function(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value).concat(data[i].server_num)
      });
    }
  }
  return res;
};
import { mapGetters, mapActions } from "vuex";
// 引入离线的js文件
import { mapDataJs } from "static/json/data";
import { cityMap, cityMap3D } from "static/echarts/city-map.js";
export default {
  data() {
    return {
      isError: false,
      curentCityCode: "86",
      curentCityName: "中国",
      //设备类型 百分比统计
      MainMapDom: {},
      //设备排名的配置数据
      MainMapOption: {
        title: {
          top: "10%",
          text: "",
          left: "center",
          textStyle: {
            color: "#fff"
          },
          show: true
        },
        toolbox: {
          show: true,
          left: "65%",
          top: "150px",
          zlevel: 10000,
          feature: {
            mark: { show: true },
            myTool1: {
              show: true,
              title: "详情",
              icon: echartBtns.detail,
              onclick: ""
            },
            myTool2: {
              show: true,
              title: "返回上一级",
              icon: echartBtns.backPng,
              onclick() {}
            },
            myTool3: {
              show: true,
              title: "全屏",
              icon: echartBtns.FullScreenPng,
              onclick() {}
            }
          }
        },
        tooltip: {
          // trigger: "item",
          formatter: function(params, ticket, callback) {
            //自定义函数
            nTooltip(params, ticket, callback);
          }
        },
        geo: {
          map: "",
          show: false,
          top: "0%",
          zoom: 0.7,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#0A3E65",
              color: "#2b2b2b",
              borderColor: "#03030A",
              borderWidth: 1.5,
              shadowColor: "#03030A"
            },
            emphasis: {
              areaColor: "#6F6FFF"
            }
          },
          roam: true
        },
        //为地图设置散点
        series: ""
      },
      mainMap2D: {
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            data: "",
            // symbolSize: function(val) {
            //   return val[3] / 10;
            // },
            symbolSize: this.randomData(10, 20),
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#EDCF33",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      },
      MainMap3D: {
        geo3D: {
          map: "中国",
          show: false,
          boxHeight: 1
        },
        series: [
          {
            name: "scatter3D",
            type: "scatter3D",
            coordinateSystem: "geo3D",
            symbol: "circle",
            // symbol: "pin",
            symbolSize: 30,
            opacity: 1,
            zlevel: 12,
            label: {
              show: false,
              formatter: "{b}"
            },
            itemStyle: {
              color: "#EDCF33",
              borderWidth: 0.5,
              borderColor: "#fff"
            },
            data: ""
          },
          {
            name: "中国",
            type: "map3D",
            map: "中国",
            itemStyle: {
              color: "#007ACC",
              borderColor: "#03030A",
              borderWidth: 1
            },
            label: {
              show: false
            },
            emphasis: {
              //当鼠标放上去  地区区域是否显示名称
              label: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 3,
                  backgroundColor: "rgba(0,23,11,0)"
                }
              }
            }
            // light: {
            //   //光照阴影
            //   main: {
            //     color: "#fff", //光照颜色
            //     intensity: 1.2, //光照强度
            //     shadow: false, //是否显示阴影
            //     alpha: 55,
            //     beta: 10
            //   },
            //   ambient: {
            //     intensity: 0.3
            //   }
            // }
          }
          // {
          //   name: "中国",
          //   type: "map3D",
          //   map: "中国",
          //   itemStyle: {
          //     areaColor: "#1d5e98",
          //     opacity: 1,
          //     borderWidth: 0.4,
          //     borderColor: "#333"
          //   },
          //   label: {
          //     show: true,
          //     textStyle: {
          //       color: "#000", //地图初始化区域字体颜色
          //       fontSize: 8,
          //       opacity: 1,
          //       backgroundColor: "rgba(0,23,11,0)"
          //     }
          //   }
          //   //regionHeight: 2,
          // }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["loadingConfig", "mapData", "settingConfig"])
  },
  created() {
    if (sessionStorage.getItem("video") == null) {
      sessionStorage.setItem("video", "0");
    }
    if (sessionStorage.getItem("canvasBg") == null) {
      sessionStorage.setItem("canvasBg", "0");
    }
    if (sessionStorage.getItem("brightness") == null) {
      sessionStorage.setItem("brightness", "30");
    }
    if (sessionStorage.getItem("pageStyle") == null) {
      sessionStorage.setItem("pageStyle", "");
    }
    if (sessionStorage.getItem("bgStyle") == null) {
      sessionStorage.setItem("bgStyle", "1");
    }
    if (sessionStorage.getItem("echartType") == null) {
      sessionStorage.setItem("echartType", "1");
    }
    if (sessionStorage.getItem("echartsContainer") == null) {
      sessionStorage.setItem("echartsContainer", "1");
    }
    if (sessionStorage.getItem("apiUrl") == null) {
      sessionStorage.setItem(
        "apiUrl",
        "http://" + window.location.host + "/dataquery/MapAjaxInfoServlet.do"
      );
    }
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {
      $("body").on("click", function() {
        $(".DivShow").remove();
      });
      window.onresize = function() {
        console.log('v2')
        self.MainMapDom.resize();
      };
      var self = this;
      this.curentCityName = this.$route.params.cityCode;
      if (
        this.curentCityName === undefined ||
        cityMap[this.curentCityName] === undefined
      ) {
        this.curentCityName = "中国";
        this.$router.push(this.$route.meta.path + "/" + self.curentCityName);
      }
      this.renderPage(this.curentCityName);
      // console.log(this.MainMapOption);
      this.MainMapDom.on("click", this.mapJump);
      this.MainMapOption.toolbox.feature.myTool2.onclick = function() {
        //返回上一级
        var nextMap = "/中国";
        if (String(self.curentCityCode).indexOf("0000") == -1) {
          var cityCode = parseInt(
            String(self.curentCityCode).slice(0, 2) + "0000"
          );
          for (var i in cityMap) {
            if (cityMap[i] == cityCode) {
              nextMap = "/" + i;
            }
          }
        }
        console.log(self.curentCityCode);
        self.$router.push(self.$route.meta.path + nextMap);
        // self.$router.push("/dataMap/中国");
      };
      this.MainMapOption.toolbox.feature.myTool3.onclick = function() {
        $("#left").toggleClass("fadeOutLeft");
        $("#right").toggleClass("fadeOutRight");
        $("#bottom").toggleClass("fadeOutDown");
        $("#center").toggleClass("width100height100 bounceIn");
        $("#MainMap").toggleClass("mainMap");
        self.MainMapDom.resize();
      };
      this.MainMapOption.toolbox.feature.myTool1.onclick = function() {
        var opt = self.MainMapOption,
          seriesData = opt.series[0].data;
        var series = opt.series[0].data;
        var table =
          '<table class="imagetable" id="userActivityTable" style="width:100%;text-align:center;color: black;overflow: scroll"><tbody style="overflow: scroll"><tr>' +
          "<th>城市名称</th>" +
          "<th class='admin_name'>管理员</th>" +
          "<th>总终端数</th>" +
          "<th>在线终端</th>" +
          "<th class='online_server_num'>在线服务</th>" +
          "</tr>";
        var isCity = false;
        for (var i = 0, l = series.length; i < l; i++) {
          var markKey = series[i].value[2];
          if (markEZinfoList[markKey]["admin_name"] == -1) {
            isCity = true;
          }
          table +=
            "<tr>" +
            "<td>" +
            series[i]["name"] +
            "</td>" +
            "<td class='admin_name'>" +
            markEZinfoList[markKey]["admin_name"] +
            "</td>" +
            "<td>" +
            markEZinfoList[markKey]["total_workstation_num"] +
            "</td>" +
            "<td>" +
            markEZinfoList[markKey]["online_workstation_num"] +
            "</td>" +
            "<td class='online_server_num'>" +
            markEZinfoList[markKey]["online_server_num"] +
            "</td>";
        }
        table += "</tbody></table>";
        $(".modal-body").html(table);
        $("#myModal").modal();
        if (isCity) {
          $(".admin_name").hide();
          $(".online_server_num").hide();
        }
      };
    });
  },
  methods: {
    init() {
      this.MainMapDom = this.$echarts.init(document.getElementById("MainMap"));
    },
    SetMarkData(data) {
      var xxdata = [];
      for (var i = 0; i < data.dblist.length; i++) {
        var tmp = {
          name: data.dblist[i].markName,
          value: data.dblist[i].id,
          server_num: data.dblist[i].server_num
        };
        xxdata.push(tmp);
        geoCoordMap[data.dblist[i].markName] = [
          data.dblist[i].markX,
          data.dblist[i].markY
        ];
        var tmpnode = {
          id: data.dblist[i].MarkEZInfo.id,
          cid: data.dblist[i].MarkEZInfo.cid,
          name: data.dblist[i].MarkEZInfo.name,
          url: data.dblist[i].MarkEZInfo.url,
          online_workstation_num:
            data.dblist[i].MarkEZInfo.online_workstation_num,
          json_zt: data.dblist[i].MarkEZInfo.json_zt,
          location: data.dblist[i].MarkEZInfo.location,
          total_workstation_num:
            data.dblist[i].MarkEZInfo.total_workstation_num,
          coordinate: data.dblist[i].MarkEZInfo.coordinate,
          online_server_num: data.dblist[i].MarkEZInfo.online_server_num,
          photo_url: data.dblist[i].MarkEZInfo.photo_url,
          admin_contact: data.dblist[i].MarkEZInfo.admin_contact,
          admin_name: data.dblist[i].MarkEZInfo.admin_name
        };
        // console.log(data.dblist[i]['id'],data.dblist[i].MarkEZInfo.cid,tmpnode)
        markEZinfoList[data.dblist[i]["id"]] = tmpnode;
        // }
      }
      return xxdata;
    },
    MainMapEchartRender() {
      let self = this;
      if (this.settingConfig.echartType == 1) {
        this.MainMapOption.geo.show = true;
        this.MainMapOption.series = this.mainMap2D.series;
        this.$store
          .dispatch("GET_MAP_JSON", { curentCityCode: this.curentCityCode })
          .then(res => {
            var data = this.mapData;
            self.$echarts.registerMap(self.curentCityCode, data);
            self.MainMapOption.geo.map = self.curentCityCode;
            self.MainMapDom.setOption(self.MainMapOption, true);
          })
          .catch("GET_MAP_SVG", { curentCityCode: this.curentCityCode })
          .then(res => {
            var data = this.mapData;
            self.$echarts.registerMap(self.curentCityCode, data);
            self.MainMapOption.geo.map = self.curentCityCode;
            self.MainMapDom.setOption(self.MainMapOption, true);
          });
      } else if (this.settingConfig.echartType == 2) {
        //加载3D
        this.MainMapOption.series = this.MainMap3D.series;
        this.MainMapOption.geo3D = this.MainMap3D.geo3D;
        this.MainMapOption.geo.show = false;
        this.$store
          .dispatch("GET_MAP_JSON", {
            curentCityCode: cityMap3D[this.curentCityName]
          })
          .then(res => {
            var data = this.mapData;
            self.MainMapOption.series[1].name = this.curentCityName;
            self.MainMapOption.series[1].map = this.curentCityName;
            self.$echarts.registerMap(this.curentCityName, data);
            self.MainMapDom.setOption(self.MainMapOption, true);
          })
          .catch("GET_MAP_SVG", { curentCityCode: this.curentCityCode })
          .then(res => {
            var data = this.mapData;
            self.$echarts.registerMap(cityMap3D[this.curentCityName], data);
            self.MainMapOption.geo.map = cityMap3D[this.curentCityName];
            self.MainMapDom.setOption(self.MainMapOption, true);
          });
      }
    },
    //页面渲染
    renderPage(cityName) {
      this.init();
      var self = this;
      // 判断城市是否存在
      /***  查询已有的 geoJson 库中是否已经收录了该县级市  ** */
      self.MainMapDom.showLoading(this.loadingConfig);
      if (cityMap[cityName] !== undefined) {
        this.curentCityName = cityName;
        this.curentCityCode = cityMap[cityName];
      } else {
        this.curentCityName = "中国";
        this.curentCityCode = cityMap["中国"];
      }
      self.MainMapOption.geo.map = self.curentCityName;
      self.MainMapOption.title.text = self.curentCityName;
      //1.获取接口数据 将动态数据移动到 vuex中 便于统一维护
      let params = {
        curentCityCode: this.curentCityCode,
        dz_type: "cityMapData"
      };
      this.$store
        .dispatch("GET_ECHARTSDATA", params)
        .then(xxdata => {
          // console.log(xxdata.data != null, xxdata.data.result.length);
          if (xxdata.data != null && xxdata.data.result.length) {
            self.dblist = { dblist: xxdata.data["result"] };
            self.dblist = self.SetMarkData(self.dblist);
            if (this.settingConfig.echartType == 1) {
              self.MainMapOption.geo.show = true;
              self.MainMapOption.series = self.mainMap2D["series"];
              self.MainMapOption.series[0].data = [];
              self.MainMapOption.series[0].data = convertData(self.dblist);
            } else if (this.settingConfig.echartType == 2) {
              self.MainMapOption.geo.show = false;
              self.MainMapOption.series = self.MainMap3D["series"];
              self.MainMapOption.geo3D = self.MainMap3D.geo3D;
              self.MainMapOption.series[0].data = [];
              self.MainMapOption.series[0].data = convertData(self.dblist);
            }
            //转换锚点数据
            self.MainMapEchartRender();
            self.MainMapDom.hideLoading();
          } else {
            self.MainMapOption.series[0].data = [];
            this.$notify.warning({
              title: "提示",
              message: "该地区没有部署服务器！请选择有标注坐标点的位置"
            });
            self.MainMapEchartRender();
            self.MainMapDom.hideLoading();
          }
        })
        .catch(err => {
          if (self.MainMapOption.series[0] != undefined) {
            self.MainMapOption.series[0].data = [];
          }
          this.$notify.warning({
            title: "提示",
            message: "该地区没有部署服务器！请选择有标注坐标点的位置"
          });
          self.MainMapEchartRender();
          self.MainMapDom.hideLoading();
        });
      let paramsTerminals = {
        curentCityCode: this.curentCityCode,
        dz_type: "terminals"
      };
      this.$store.dispatch("GET_ECHARTSDATA", paramsTerminals).then(res => {
        //所有设备的总数
        if (res.data.terminals != undefined) {
          $("#total-terminals-num").animateNum(res.data.terminals.all, 2);
          //在线设备的总数
          $("#online-terminals-num").animateNum(res.data.terminals.online, 2);
          $("#offline-terminals-num").animateNum(
            res.data.terminals.all - res.data.terminals.online,
            2
          );
          $("#offline-terminals-num").animateNum(
            res.data.terminals.all - res.data.terminals.online,
            2
          );
          $("#offline-terminals-pers").animateNum(
            res.data.terminals.all - res.data.terminals.online,
            2
          );
        }
      });
    },
    // 为地图绑定事件
    mapJump(params) {
      if (params.componentType == "geo") {
        let nextMap;
        if (cityMap[params.name] !== undefined) {
          nextMap = params.name;
        } else {
          //请求获取 自定义svg
          nextMap = "中国";
        }
        this.$router.push(this.$route.meta.path + "/" + nextMap);
        // window.location.href = "#/"+this.$route.path + "/" + nextMap;
        // this.$router.push("/dataMap/" + nextMap);
      }
      if (params.componentSubType == "map3D") {
        let nextMap;
        if (cityMap[params.name] !== undefined) {
          nextMap = params.name;
        } else {
          //请求获取 自定义svg
          nextMap = "中国";
        }
        this.$router.push(this.$route.meta.path + "/" + nextMap);
        // window.location.href = "#/"+this.$route.path + "/" + nextMap;
        // this.$router.push("/dataMap/" + nextMap);
      }
      if (params.componentSubType == "scatter3D") {
        MapMarkTipClick(params);
      }
      if (params.componentSubType == "effectScatter") {
        MapMarkTipClick(params);
      }
    }
  },
  // 见识数据是否发生改变
  watch: {
    $route(val, oldVal) {
      $("body").css({ overflow: "hidden" });
      var self = this;
      this.curentCityName = this.$route.params.cityCode;
      if (
        this.curentCityName === undefined ||
        cityMap[this.curentCityName] === undefined
      ) {
        // 判断参数是否合法
        this.curentCityName = "中国";
        // 重定向
        this.$router.push(this.$route.meta.path + "/" + self.curentCityName);
        // this.$router.push("/refresh");
      } else {
        this.init();
        this.renderPage(this.curentCityName);
      }
    },
    settingConfig: {
      handler(val, oldVal) {
        if (val.echartType != sessionStorage.getItem("echartType")) {
          this.renderPage(this.curentCityName);
        }
        sessionStorage.setItem("echartType", val.echartType);
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.mainMap {
  left: -50%;
}
#MainMap{
  /* position: relative;
  height: 90vh;
  top:10vh; */
}
</style>