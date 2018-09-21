<template>
  <router-view/>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
@import "src/assets/css/_bootstrap-custom.scss";
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
</style>



