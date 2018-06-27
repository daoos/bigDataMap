/**
 * Created by chmi on 2018/3/21.
 */
(function() {
    $.fn.extend({
        /**
         * 动态变化数字
         * @param num 元素最终的数字
         * @param time 整个动画需要的时间
         */
        animateNum: function(num, time) {
            var zero = 0,
                addNum = parseInt(num / time / 10),
                timer = null,
                self = this;
            if (num > 20) {
                setTimeout(function() {
                    timer = setInterval(function() {
                        zero = zero + addNum
                        var seroHtml = '<span>' + String(zero).split('').join('</span><span>') + '</span>'
                        $(self).html(seroHtml);
                        if (num <= addNum + zero) {
                            clearInterval(timer)
                            var numHtml = '<span>' + String(num).split('').join('</span><span>') + '</span>'
                            $(self).html(numHtml)
                        }
                    }, 100)
                }, 1000)
            } else {
                var numHtml = '<span>' + String(num).split('').join('</span><span>') + '</span>'
                $(self).html(numHtml)
            }

        },
        showModal: function(modalParams) {
            var modalHtml = '<div class="modal fade" id="myModal" style="color: #000" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title" id="myModalLabel">' + modalParams.title + '</h4>' +
                '</div>' +
                '<div class="modal-body">' + modalParams.content + '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
                '<button type="button" class="btn btn-primary">提交更改</button>' +
                '</div>' +
                '</div><!-- /.modal-content -->' +
                '</div><!-- /.modal -->' +
                '</div>'
            $('body').append(modalHtml)

        },
        messageBox: function(type, message) {
            var alertClass = 'alert-danger',
                timestamp = Date.parse(new Date());
            switch (type) {
                case 'error':
                    alertClass = 'alertClass';
                    break;
            }
            var messageHtml = '<div class="alert alert-danger animated fadeInRight" id="alert' + timestamp + '" role="alert">' +
                '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                message +
                '</div>';
            $(this).append(messageHtml)
            setTimeout(function() {
                $('#alert' + timestamp).addClass('fadeOutRight')
            }, 3000)
            setTimeout(function() {
                $('#alert' + timestamp).addClass('fadeOutRight')
                $('#alert' + timestamp).remove()
            }, 5000)
        }
    });
})(jQuery);