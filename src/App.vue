<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
// @import 'bootstrap/dist/css/bootstrap.min.css';
// @import 'src/assets/css/bootstrap.min.css';
@import 'src/assets/css/_bootstrap-custom.scss';


@import "src/assets/css/index_map.scss";
@import "src/assets/css/theme1.scss";
#mainMap {
  height: 100vh;
  background-size: 100% 100%;
  color: #fff;
  position: relative;
  left: 0;
  overflow: inherit !important;
  z-index: 6;
}
#app{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>



