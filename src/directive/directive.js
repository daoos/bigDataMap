import Vue from 'vue'
import store from '@/store'


// 检测浏览器的对象
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息   
            trident: u.indexOf("Trident") > -1, //IE内核  
            presto: u.indexOf("Presto") > -1, //opera内核  
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核  
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf("iPad") > -1, //是否iPad  
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部  
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

// 拖动指令
Vue.directive('drag',
    function(el, binding) {
        // pc 上的拖动事件
        if (!browser.versions.mobile) {
            el.onmousedown = function(ev) {
                var disX = ev.clientX - el.offsetLeft;
                var disY = ev.clientY - el.offsetTop;
                document.onmousemove = function(ev) {
                    var l = ev.clientX - disX;
                    var t = ev.clientY - disY;
                    el.style.left = l + 'px';
                    el.style.top = t + 'px';
                };
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        } else {
            el.ontouchstart = function(ev) {
                // var touch = e.touches[0];
                //  var x = Number(touch.clientX);
                //   var y = Number(touch.clientY);
                //    console.log("当前触摸点的横坐标"+x+"*****当前触摸点的纵坐标"+y);
                var disX = ev.clientX - el.offsetLeft;
                var disY = ev.clientY - el.offsetTop;
                document.ontouchmove = function(ev) {
                    var l = ev.clientX - disX;
                    var t = ev.clientY - disY;
                    el.style.left = l + 'px';
                    el.style.top = t + 'px';
                };
                document.ontouchend = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    });

Vue.directive('menu', function(el) {
    el.onclick = function() {
        $(el).find(".pull-right").toggleClass("is-active");
    }
})

Vue.directive('menudrag', function(el, binding) {
    var elHtml;
    el.ondragstart = function(e) {
        elHtml = el.innerHTML
        console.log(elHtml, binding.value.echartId)
            // el.innerHTML = 'dragstart';
        el.innerHTML = '将该部分所拽到任意一个方框';
        // container.style.backgroundColor = 'rgba(255,0,0,.1)';
        // 将自定义参数传给接受容器
        e.dataTransfer.setData('id', binding.value.echartId);
    }
    el.ondrag = function(e) {
            el.innerHTML = `<span class="menu-item-left">
            移动中...
          </span>`;
        }
        // 元素移动完成
    el.ondragend = function(e) {
        el.innerHTML = elHtml;
        // container.style.backgroundColor = 'rgba(255,0,0,0)';
    }
})

Vue.directive('beDraged', function(el, binding) {
    var key;
    el.ondragenter = function(e) {
        key = binding.value.key
        e.preventDefault();
        //drop之前没有获取不到data对象
    }
    el.ondragleave = function(e) {
            e.preventDefault();
        }
        //目标对象容许被拖拽元素拖拽进来 默认不容许
    el.ondragover = function(e) {
            e.preventDefault();
        }
        //目标对象接受被拖拽元素放下
    el.ondrop = function(e, binding) {
        // const target = e.target;
        const id = e.dataTransfer.getData('id');

        // console.log(key,id)
        // if(key=='left1'){
        //     store.dispatch('SET_LEFT_1',{left1:id})
        // }else if(key=='left2'){
        //     store.dispatch('SET_LEFT_2',{left2:id})
        // }
        sessionStorage.setItem('sidebarOpened',true)
        store.dispatch('SET_SLDEBAR', { opened: true })
        console.log(key,id)
        store.dispatch('SET_DRAG_CONFIG_DATA', { key: key, val: id })
    }
})

Vue.directive('tipHover', function(el, binding) {
    el.onmousemove = function(e) {
        console.log(1)
    }
})