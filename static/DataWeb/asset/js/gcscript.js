/**
 * Created by GaoChong on 2016/4/5.
 */

// 路径配置
require.config({
    paths: {
        echarts: './build/dist'
    }
});
var url_str = "http://192.168.50.179:8088/getdata/GetData.jsp";

//var SHD = false;
function ShowHDDiv() {

    if (!SHD) {

        $(".Bottom_Div").css('height', 40);
        SHD = true;
    } else {
        $(".Bottom_Div").css('height', 400);
        SHD = false;
    }
}

function printRandomData(){

    var outtext1 = "";

    outtext1 += '<p>' + Math.random() * 100 + '  , ' + Math.random() * 100 + '  , ' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '  , ' + Math.random() * 100 + '  , ' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';
    outtext1 += '<p>' + Math.random() * 100 + '</p>';


    $("#bdata_l").html(outtext1);

}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        var tName = decodeURI(  r[2] );
        //return unescape(r[2]);
        return tName;

    } else {
        return null;
    }
}


$(document).ready(function() {

    $(".MainDiv_Right").mousedown(function(e){
        $(this).css("cursor","move");//改变鼠标指针的形状

        var offset = $(this).offset();//DIV在页面的位置
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离
        $(document).bind("mousemove",function(ev){
            //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件

            $(".MainDiv_Right").stop();//加上这个之后

            var _x = ev.pageX - x;//获得X轴方向移动的值
            var _y = ev.pageY - y;//获得Y轴方向移动的值

            $(".MainDiv_Right").animate({left:_x+"px",top:_y+"px"},10);
        });

    });

    $(document).mouseup(function(){
        $(".MainDiv_Right").css("cursor","default");
        $(this).unbind("mousemove");
    })
});
