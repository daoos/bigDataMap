exports.install = function(Vue, options) {
    Vue.prototype.myTool3 = function(echartsId, echartsHtml, option, self) { //全局函数1
        //关闭 菜单栏
        var menuIsOpen = $('#dragContainer').hasClass('open')
        if(menuIsOpen){
            $('.hamburger-container').click()
        }
        var html =
            `<div class = "left-map-container" id="fullScreenEchars">` +
            echartsHtml +
            `</div>`,
            parentId = $("#" + echartsId)
            .parent()
            .attr("id");
        if (parentId != "fullScreenEchars") {
            // 清空父容器的内容
            $("#" + echartsId)
                .parent()
                .html("");
            $("#fullScreen").html(html);
            // 再次渲染图标
            option.toolbox.feature.myTool3.icon = echartBtns.ExitFullScreenPng;
            self.init(echartsId, option);
            $("#fullScreenContainer").animate({ height: "100vh", width: "100vw" });
        } else {
            $("#fullScreen")
                .html("");
            $("#" + echartsId + "Container").html(echartsHtml);
            option.toolbox.feature.myTool3.icon = echartBtns.FullScreenPng;
            console.log(echartsId, option)
            self.init(echartsId, option);
            $("#fullScreenContainer").animate({ height: "0", width: "0" });
        }
    };
    Vue.prototype.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            var tName = decodeURI(r[2]);
            //return unescape(r[2]);
            return tName;

        } else {
            return null;
        }
    };
    Vue.prototype.canvasBg = function(id, starscolor, starsamount, starsradius, movrange, speed, trailing) {
        canvas(id, starscolor, starsamount, starsradius, movrange, speed, trailing)
    };
    Vue.prototype.percentDataFilter = function(data) { 
        return Math.floor( data* 10000) / 100+"%" 
    }
    Vue.prototype.randomData = function(min,max) { 
        return Math.floor(Math.random()*(max-min+1)+min)
    }
};