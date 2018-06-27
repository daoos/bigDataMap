function ShowMessage_T( title_str, content_str,style_n ){

	var opts = {
		"closeButton": true,
		"debug": false,
		"positionClass": "toast-top-full-width",
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	};
	switch( style_n ){

		case 1:
			toastr.success(content_str, title_str, opts);
			break;

		case 2:
			toastr.error(content_str, title_str, opts);
			break;

		case 3:
			toastr.warning(content_str, title_str, opts);
			break;

		default:
			toastr.info( content_str, title_str, opts);
			break;

	}

}

var colorsN = ['black', 'red', 'green', 'blue', 'yellow'];
var currentColorN = 0;

function ShowMessage_N( title_str, content_str,style_n ){

	switch(style_n ){

		case 1:
			new jBox('Notice', {
				content: title_str+'<br/>'+content_str,
				position: {
					x: 15,
					y: 65
				},
				zIndex: 12000
			});
			break;

		case 2:
			new jBox('Modal', {
				attach: null,
				closeButton: null,
				animation: {
					open: 'slide:left',
					close: 'slide:right'
				},
				onCreated: function() {
					this.content.css({
						lineHeight: '40px',
						padding: '60px 80px',
						textAlign: 'center'
					})
				},
				onClose: function() {
					//alert('000000');
				},
				content: title_str+'<br/>'+content_str
			}).open();
			break;

		case 3:
			new jBox('Notice', {
				attributes: {
					x: 'left',
					y: 'bottom'
				},
				theme: 'NoticeBorder',
				color: 'black',
				audio: '/plugins/jBox/Source/audio/blob',
				volume: 100,
				animation: {
					open: 'slide:bottom',
					close: 'slide:left'
				},
				onInit: function() {
					this.options.color = colorsN[currentColorN];
					this.options.title = title_str;
					this.options.content = content_str;
					currentColorN++; (currentColorN >= colorsN.length) && (currentColorN = 0)
				},
			});
			break;

		case 4:
			new jBox('Notice', {
				autoClose: 10000,
				attributes: {
					x: 'right',
					y: 'bottom'
				},
				stack: false,
				animation: {
					open: 'tada',
					close: 'zoomIn'
				},
				title: title_str,
				content: content_str,
				onInit: function() {
					this.options.color = colorsN[currentColorN];
					currentColorN++; (currentColorN >= colorsN.length) && (currentColorN = 0)
				},
			});
			break;

		default:
			new jBox('Notice', {
				content: title_str+'<br/>'+content_str,
				position: {
					x: 15,
					y: 65
				},
				zIndex: 12000
			});
			break;
	}
}
