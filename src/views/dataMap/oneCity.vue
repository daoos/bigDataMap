<template>
  <div>
    <iframe style="width:100vw;height:100vh" :src="iframeUrl" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  data(){
    return {
      iframeUrl:''
    }
  },
  created(){
    //获取路由参数 
    var svgMapId = this.$route.params.svgMapId
    this.iframeUrl = './static/DataWeb/hainanzfzyxy1.html?id='+svgMapId
    // this.iframeUrl = './static/DataWeb/hainanzfzyxy1.html?id='+svgMapId
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