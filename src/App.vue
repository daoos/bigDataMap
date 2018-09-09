<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
// @import 'bootstrap/dist/css/bootstrap.min.css';
// @import 'src/assets/css/bootstrap.min.css';
// @import 'src/assets/css/_bootstrap-custom.scss';

// @import "src/assets/css/index_map.scss";
// @import "src/assets/css/theme1.scss";
// #mainMap {
//   height: 100vh;
//   background-size: 100% 100%;
//   color: #fff;
//   position: relative;
//   left: 0;
//   overflow: inherit !important;
//   z-index: 6;
// }
// #app{
//   height: 100vh;
//   width: 100vw;
//   overflow: hidden;
// }

html {
  margin: 0;
  padding: 0;
  height: 100vh;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f4f4f4;
  background: url("http://192.168.50.179:81/veSystem/bigDataMap/src/assets/img/bg.png")
    center center no-repeat;
  background-size: cover;
}
* {
  box-sizing: inherit;

  &:before,
  &:after {
    box-sizing: inherit;
  }
}
img {
  width: 100%;
  height: auto;
  vertical-align: top;
  content: normal !important;
}
[aspectratio] {
  position: relative;
}
[aspectratio]::before {
  content: "";
  display: block;
  width: 1px;
  margin-left: -1px;
  height: 0;
}

[aspectratio-content] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
[flexContainer] {
  display: flex;
  // flex-direction: column;
  justify-content: top;
  align-items: flex-start;
  width: 1920px;
}
.block {
  margin-top: 15px;
}
ul,
li {
  list-style: none outside none;
  margin: 0;
  padding: 0;
}
figure {
  display: block;
  margin: 0;
}
.border1 {
  // border: 1px solid red;
  transition: border linear 0.2s, box-shadow linear 0.5s;
  -moz-transition: border linear 0.2s, -moz-box-shadow linear 0.5s;
  -webkit-transition: border linear 0.2s, -webkit-box-shadow linear 0.5s;
  outline: none;
  border-color: rgba(93, 149, 242, 0.75);
  box-shadow: 0 0 8px rgba(93, 149, 242, 0.105);
  -moz-box-shadow: 0 0 8px rgba(93, 149, 242, 0.5);
  -webkit-box-shadow: 0 0 8px rgba(93, 149, 242, 3);
}
</style>



