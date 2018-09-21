<template>
  <echart-template :echartsUniqueCode="echartsUniqueCode" :echartTitle="title" :echartOption="option" :echartId="echartId" :echartAjaxType="ajaxType" @changeOption="changeOption" @changeDom="changeDom" :detail="detail"></echart-template>
</template>
<script>
var giftImageUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACGCAMAAAAvpwKjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU4QTRFQTAzQjVBNzExRTg4NjE1ODk4RjgyNzE0NTcwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU4QTRFQTA0QjVBNzExRTg4NjE1ODk4RjgyNzE0NTcwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RThBNEVBMDFCNUE3MTFFODg2MTU4OThGODI3MTQ1NzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RThBNEVBMDJCNUE3MTFFODg2MTU4OThGODI3MTQ1NzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6wsQ1cAAABg1BMVEUPGSMQGiQpM0AqNEEfKTUYIi0RGyUSHCYPGSQXISwWISweKDQWICsdJzMmMD0UHiklLzsTHScoMj8iLDgTHSgqNUIlLzwhKzcgKjYbJTAmMDwVHypgZmsZIy4THigcJjEQGiUiLTknMT0nMT4cJjIRGyYaJC8jLjonMj8jLTkoM0AkLjoeKTQUHigbJTErNkQmMT0hLDhVXGMkLzsZIy8dJzI2QUwaJDAaJTASHCcrNUElMDxhZ2whKzhnbG8pNEEiLDkjLTpma25ma28kLjseKDMYIi5UXGMWICooMj42QEwcJzIqNEAkMD0OGCMoMkAXIiw8RlQ1QFAYIy4sNkQoNEEXISshLTkdKDQjLjswO0cgKzc5RVFLU1s1QUxHUVwVICthZ2syPUlDTFdGUFsSHSdgZmpVXGQbJjJWXmchKzY3RFMbJzIgKjVBSlNIU2BQWmQbJjEdKTVXXmQUHyoxPUwfKTQpMz8UHykkLzwRHCYVHylQWWQmMj4rNUIOGCIAAADtf+YEAAAAgXRSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCSyONPAAAG2klEQVR42uSc53cUNxDAZ+u1PZ+v7hUfnO1zL9jYYIzBYFpwTEiBkEIaaaT3Xlb502P8EvtuNSNptTpeHpnPu7rfjkbSzGjm4K/Uwlj6MUD7t1F5ihhMJk8BgynKKDFYIhkNBksu5jGYnpjFYCnEGIboRyw/cygWpAQBTYjsL7OFaqNSj/6RK9M3Hh54ZV0O0KDwu+5YhIszVwxAAwSSQtSKjUgszuRsLykHJKKYOZiOVKS+50EiEEgAEUxG6mIXZhJwgDLFvbEomdTDmjIIKFJ4a5GGXC4rcoASRWk80pO621PiAAUIqxnpi72pwgFyCm8xSiVzGTkHyCigGaUV25NygISiPBYZEBckHCCm6DqREdnZFnOAkMKNTIkdCDlEGNnJyJzUZ0UcQFNY45FROS3gAJLC35GPfKe9FDZdN6zemFYwoiLNARRFT7JEKmGrM7RDZnLF8Yu6HKA1I+OrNdwlzLkV0XurCTFgjh7r5+K2yPMMqgIOj+AAXBn0St3fApkvnmmShlLv4ByAUlwgLaILKkHBjEtZiZ1Rx+jU8TEuFrKq0UmNsq0GYByAUPQIMxuvJQmTNm18lCY2LYBMyVX8/ZuQLFzLEArJqWFs4pP6IHHYCD/hI/k8B3AUPqrMqYxO/NpFLfWyCga67Bu+Xhydc9SmBeIUAfbeUpZpSgfT7TTIMAALBJaAaUsJ00c/rg6IKWMWealtpclv3EY4rvhiDEC2jMoMSyXYlxVi6oBhZWC7+G2WUhDf3vFFGDDPv3EuLQWDMak6hjG6iHmy9FLmzcPO8hjHz/MZFCdjAIOd5j9vi8YoiZaW4WkZG5qVIQze2ZkCIxjsNv+BpTjGMbMt2HZTCn9EuBRGnt+4TFGwGjf24uCsDGI8FHmw5tURDGMcP8nNyZQ5CsT8CzgG/2DLIAZrx0dfwzH63J5hmcTgj5aZE44BjL34Y1WTFKx3kbS8Jxi0adwyisEWBEv2BKPMKc0yi9HiPEsMI8eFJWYp+O90MAzu+LlpGINxLtVxDnkAozmyjZzcwXIIxkb8IcUjHizfUjsA+2S6YwAjvlBsNQqrs/XtrZoSB2d9yzwG6B1rVn79zbdffP2UCgd3vK2fYBwHvlqbl5WfPD+x+/hMQYXD4rLpPEaJ3FzEFM9PXPrj+nNqHA7lgZ1gdDQ88iOKiZdf+fCaGkd8xc7zGHlRNpW4i33vtfMTH7/zwvqrH1w7e6b4kfSFKQ2MVemo/ifvT1x66438qQv1d6+fXXtJGm+3qcWYCmPb/X736x+/+y37w6+ff7r71aZlACNIPimH2nh0oo0/5dpQmJSOKLOsYBv3FWxDwURX4hhfml8pCgt2Rmf7Otq9Ln1z/awShWj7SreZP+F4tPv4vtLutULm4gRH2x3jZ4qncLSxHb2D/vCE/ULxhD0X/4ULCMa6Zsim7m8ouT1FnbMtkdgqTqBHZyCepkvMBwi+WYwW6foPRW2czrpmMZbohTKIwUVVC0YpMpEweKQDFcforPTpSR/CWImSH7IJZIpcArE0C1cuMn3XHEUnIqPCWNKJTyobNFLO8qIOgcFfpZjLOvEzXqFScEhC0hudMgpkenZZcA+UTh7w6dkVEqMWjWixAF9K2KCT1XxUHznbJjDO8d+3KbjI8JCraBMpYuQiAwQYiPJGdK1TFF3roPdiQVqMz+R3fvErP0QddkrzaEVSZXAXoF3sYryXhiKHXdNbwxT8rTRWZtBIkSENsOvgLSbDWEErNyyjFI04BVIqgJb1jGleCXtoqUBJAcNCy0P3y6asc9DlF5WReHjxR/JsbRYvNa30lDBYiBfDFBIeczWiji7gKdASI2sef7/9ewKIuy2i+GuZiTFOOEpU+VhTeQfptIkhNmQFVwPT0iWrT1tKdS3lkBpg0ccoqGK8Al0G25fuIbWQbpMoMTmGvPbrCMQtiY5Tb09QmpjDKUgMUYnk4SlTxEl8L7wjem+WoKDLVrOSEl57oZ/LDCzh7ArdPIOlWlWLeK0Nhfrg/cZCNQyrS21b4eEWSSEqac7OGa1ort+jKYQF3hAapHCEhebicveiuXL3kohCVvzvXTFD0cgIKaStELU1ExRNjVaIWGNI+j6EYR9Bt00mmE9HUfWlFEpNQ9nluj5EZTgpkKqFqrynu0yLWRUK5YayoKGzY7kxT9pAe13+RlJNuPHkv5lmw1KYoIVovu8rQyRtvbRaanPjXM5zToDZRtTM6SXJurFDvv0zXSMq3pZr5QobxPQsXl1FHaJRNSlD2Ttozq39G+E5lZ2ry62AyG6PvmWbgXUoaTu2R9/A/gy282uS/Bf+6uGZ/+MLRZT/1Z+ijEL+FmAAI155Y31ozjQAAAAASUVORK5CYII=";
import { mapGetters, mapActions } from "vuex";
import { cityMap } from "static/echarts/city-map.js";
import echartTemplate from "./echartTemplate";
export default {
  components: {
    echartTemplate
  },
  data() {
    return {
      echartsUniqueCode: "customType",
      title: "单位类型统计",
      echartId: "customTypeRadioEchart",
      ajaxType: "customType",
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
              // scale: [3.5, 3.5],
              style: {
                image: giftImageUrl,
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
            hoverAnimation: false,
            legendHoverLink: false,
            radius: ["57%", "60%"],
            color: ["#566173"],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            tooltip: {
              show: false
            },

            data: [
              {
                value: 100,
                name: ""
              }
            ]
          },
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
      this.option.series[1].data = [];
      this.detail.data = [];
      if (data.length > 0) {
        data.map((v)=> {
          var temp = { value: v.typeNum, name: v.typeName };
          this.option.series[1].data.push(temp);
          this.detail.data.push(temp);
        });
      }
    }
  }
};
</script>

