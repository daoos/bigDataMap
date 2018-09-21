<template>
  <echart-template :echartsUniqueCode="echartsUniqueCode" :echartTitle="title" :echartOption="option" :echartId="echartId" :echartAjaxType="ajaxType" @changeOption="changeOption" @changeDom="changeDom" :detail="detail"></echart-template>
</template>
<script>
var giftImageUrl = "";
import radioBg from '@/img/radioBg.png';
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
import echartTemplate from "./echartTemplate";
export default {
  components: {
    echartTemplate
  },
  data() {
    return {
      echartsUniqueCode: "productType",
      title: "产品类型比例",
      echartId: "productTypeEchart",
      ajaxType: "productType",
      curentCityCode: 86,
      dom: "",
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: radioBg,
                width: "100",
                height: "100"
              },
              left: "center",
              top: "center"
            }
          ]
        },
        series: [
          {
            name: "人员类型",
            type: "pie",
            radius: ["50%", "55%"],
            color: [
              "#5DADE2",
              "#2ECC71",
              "#F39C12",
              "#655C67",
              "#E74C3C",
              "#FF7C44",
              "#FA3E5F",
              "#6635EF",
              "#FFAFDA"
            ],
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 20,
                lineStyle: {
                  width: 2
                }
              }
            },
            label: {
              normal: {
                formatter: "{b|{b}}{d|{d}%}",
                rich: {
                  b: {
                    fontSize: 12,
                    color: "#387E9E",
                    align: "left",
                    padding: 4
                  },
                  hr: {
                    borderColor: "#387E9E",
                    width: "100%",
                    borderWidth: 2
                  },
                  d: {
                    fontSize: 12,
                    color: "#387E9E",
                    align: "left",
                    padding: 4
                  },
                  a: {
                    fontSize: 12,
                    color: "#387E9E",
                    align: "left",
                    padding: 4
                  }
                }
              }
            },
            data: [
              {
                value: 100,
                name: "社工"
              },
              {
                value: 100,
                name: "养老护理员"
              },
              {
                value: 100,
                name: "康复师"
              },
              {
                value: 100,
                name: "心理咨询师"
              },
              {
                value: 100,
                name: "医生"
              },
              {
                value: 100,
                name: "护士"
              }
            ]
          }
        ]
      },
      detail: {
        thead: [
          { lable: "设备类型", props: "typeName" },
          { lable: "数量", props: "typeNum" }
        ],
        data: []
      }
    };
  },
  computed: {
    ...mapGetters(["echartsData", "loadingConfig", "settingConfig"])
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.dom.resize();
      };
    });
  },
  methods: {
    changeDom(data) {
      this.dom = data;
    },
    changeOption(data) {
      this.option.series[0].data = [];
      this.detail.data = [];
      if (data.length > 0) {
        data.map(v => {
          var temp = { value: v.veNum, name: v.veName };
          this.option.series[0].data.push(temp);
          this.detail.data.push(temp);
        });
      }
    }
  }
};
</script>

