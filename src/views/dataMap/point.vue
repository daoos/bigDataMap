<template>
  <div id="pageWaper" class="Main_Div">
    <header style="top: 57px">
      <h2>
        <span class="tx">
          <b>和信大数据可视化分析</b>
        </span>
      </h2>
    </header>
    <div id="MainMap" class="vpclist">
      <ul id="termList">
        <li v-for="(item, key) in listData" v-bind:key="key" :v-tip-hover="item" @mousemove="mousemove" @mouseout="mouseout">
          <div class="tip_trigger"><img src="~@/assets/img/0.png">VEVPC{{item.name}}</div>
        </li>
        <li v-for="(item, key) in listData" v-bind:key="key+100" :v-tip-hover="item" @mousemove="mousemove" @mouseout="mouseout">
          <div class="tip_trigger"><img src="~@/assets/img/0.png">VEVPC{{item.name}}</div>
        </li>
        <li v-for="(item, key) in listData" v-bind:key="key+1000" :v-tip-hover="item" @mousemove="mousemove" @mouseout="mouseout">
          <div class="tip_trigger"><img src="~@/assets/img/0.png">VEVPC{{item.name}}</div>
        </li>
        <li v-for="(item, key) in listData" v-bind:key="key+10000" :v-tip-hover="item" @mousemove="mousemove" @mouseout="mouseout">
          <div class="tip_trigger"><img src="~@/assets/img/0.png">VEVPC{{item.name}}</div>
        </li>

      </ul>
    </div>

    <div class="tip">
      <div style="text-align: center">
        <img src="~@/assets/img/1.png" alt="" />
        <p id="PCName">{{detail.name}}</p>
      </div>
      <hr class="no-margin">
      <ul class="pc-detail" style="list-style: none;">
        <li>终端IP： {{detail.ip}}</li>
        <li>所属单位： {{detail.motor_room}}</li>
        <li>离线时长：{{detail.offline_time}}</li>
        <li>在线时长：{{detail.onlineTime}}</li>
        <li>最后一次连接：{{detail.last_online_time}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listData: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
        { name: 8 },
        { name: 9 },
        { name: 10 },
        { name: 11 },
        { name: 12 },
        { name: 13 },
        { name: 14 },
        { name: 15 },
        { name: 16 },
        { name: 17 },
        { name: 18 },
        { name: 19 }
      ],
      detail: {
        ip: "192.168.50.59",
        motor_room: "未知地点",
        offline_time: "88.8 小时",
        onlineTime: "10188.8 小时",
        last_online_time: "2018-03-27 18:53:58.0"
      }
    };
  },
  methods: {
    mousemove(e) {
      var tip = (tip = $(".tip"));
      var mousex = e.pageX + 20; //Get X coodrinates
      var mousey = e.pageY + 20; //Get Y coordinates
      var tipWidth = tip.width(); //Find width of tooltip
      var tipHeight = tip.height(); //Find height of tooltip

      //Distance of element from the right edge of viewport
      var tipVisX = $(window).width() - (mousex + tipWidth);
      //Distance of element from the bottom of viewport
      var tipVisY = $(window).height() - (mousey + tipHeight);

      if (tipVisX < 20) {
        //If tooltip exceeds the X coordinate of viewport
        mousex = e.pageX - tipWidth - 20;
      }
      if (tipVisY < 20) {
        //If tooltip exceeds the Y coordinate of viewport
        mousey = e.pageY - tipHeight - 20;
      }
      tip.css({ top: mousey, left: mousex });
      tip.show();
    },
    mouseout() {
      $(".tip").hide();
    }
  }
};
</script>

<style>
#app {
  width: auto;
  background: #021637;
}
#pageWaper {
  height: 100vh;
}
#termList {
  margin: auto;
  width: 95%;
  min-height: 90vh;
  border: 2px solid #379082;
  border-radius: 15px;
  color: #00ff00;
  font-size: 14px;
  padding: 5vh 0;
}
.tip_trigger {
  display: inline-block;
}
.vpclist ul li {
  display: inline-block;
  margin: 25px;
  width: 125px;
  height: 125px;
  color: #fff;
  text-align: center;
}
.tip {
  background: #1d1d1d;
  display: none;
  position: absolute;
  z-index: 1000;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  width: 250px;
  height: 300px;
  border: 2px solid #379082;
  border-radius: 15px;
  padding: 20px;
  color: #00ff00;
  font-size: 14px;
  --font-family: "LED";
  background-color: rgba(1, 1, 1, 0.5);
}
</style>

