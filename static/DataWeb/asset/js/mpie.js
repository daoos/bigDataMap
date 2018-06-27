/**
 * Created by GaoChong on 2016/3/21.
 */

var url_str = "http://localhost:8080/getdata/GetData.jsp";
var err_i = 1;
var SHD = false;
function ShowHDDiv() {

    if (!SHD) {

        $(".Bottom_Div").css('height', 40);
        SHD = true;
    } else {
        $(".Bottom_Div").css('height', 400);
        SHD = false;
    }
}
/*
var print_testdata = setInterval( function () {

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

}, 500 );

var update_data = setInterval( function() {

    $.jsonp({
        'contentType': "application/json; charset=utf-8",
        'url': url_str,
        'data': {
            dtype: 'active_top10'
        },
        // 'dataType': 'jsonp',
        // 'jsonp': "jsonCallback",
        'dataType':"jsonp",
        'callbackParameter':"jsonCallback",
        'async':false,
        'type': 'get',
        'error': function (XMLHttpRequest, textStatus, errorThrown) {

            ShowError();
        },
        'success': function (data) {

            $("#mdata_t1").empty();
            for(  var i = 0 ;i < data.active2_top10.length   ; i++ ){

                var trv = "";
                trv += "<tr>";
                trv += "<td>"+  data.active2_top10[i].namestr +"</td>";
                trv += "<td>"+ data.active2_top10[i].customer +"</td>";
                trv += "<td>"+  data.active2_top10[i].active_n  +"</td>";
                trv += "</tr>";
                $("#mdata_t1").append(  trv );
            }

            $("#mdata_t2").empty();
            for(  var i = 0 ;i < data.active1_top10.length   ; i++ ){

                var trv = "";
                trv += "<tr>";
                trv += "<td>"+  data.active1_top10[i].servername +"</td>";
                trv += "<td>"+  data.active1_top10[i].khnmae  +"</td>";
                trv += "<td>"+ data.active1_top10[i].in +"</td>";
                trv += "<td>"+  data.active1_top10[i].out +"</td>";
                trv += "</tr>";
                $("#mdata_t2").append(  trv );
            }

        }
    });

},10000);
*/
function ShowError(){
    err_i++ ;
    ShowMessage_T('无法获取数据','连接数据服务器失败，无法获取更新数据...',2);

    if( err_i > 5 ){
        //clearInterval( print_testdata );
        //clearInterval( update_data );
        clearInterval( update_pie );
    }
}