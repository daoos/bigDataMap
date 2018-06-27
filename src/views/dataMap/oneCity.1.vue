<template>
  <div id="pageWaper" class="Main_Div">
    <header style="top: 57px">
      <h2>
        <span class="tx">
          <b>和信大数据可视化分析</b>
        </span>
      </h2>
    </header>
    <div id="MainMap">
      <div id="pointTree">
        <!-- hainanzf -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      pointTreeDom: "",
      pointTreeOption: {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "tree",
            data: [],
            top: "10%",
            left: "7%",
            bottom: "1%",
            right: "20%",
            symbolSize: 7,
            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 9
              }
            },
            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
            label: {
              color: "#fff",
              fontSize: "16",
              position: "top"
            },
            lineStyle: {
              color: "#fff"
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["pointData", "loadingConfig"])
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {
      // self.render();
      // 事件绑定
      self.pointTreeDom.on("click", function(params) {
        switch (params.componentType) {
          case "series" /** 标注点被点击 */:
            // 如果是最后一级，就跳转到用户设备端
            if(params.data.children==undefined){
              self.$router.push('/dataMap/point')
            }
            break;
        }
      });
    });
  },
  methods: {
    render() {
      this.pointTreeDom = this.$echarts.init(
        document.getElementById("pointTree")
      );
      this.pointTreeDom.showLoading(this.loadingConfig);
      // 获取数据
      let params = { curentCityCode: 86 },
        self = this;
      this.$store.dispatch("GET_POINT_DATA", params).then(res => {
        self.pointTreeDom.hideLoading();
        self.pointTreeOption.series[0].data.push(self.pointData);
        self.pointTreeDom.setOption(self.pointTreeOption);
      });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/css/index_map.scss";
#pageWaper {
  background-size: 100% 100%;
  //   overflow: hidden;
  background: #021637;
  color: #fff;
  position: relative;
  left: 0;
}
#pointTree {
  margin: auto;
  width: 95%;
  height: 90vh;
  border: 2px solid #379082;
  border-radius: 15px;
  color: #00ff00;
  font-size: 14px;
}
</style>