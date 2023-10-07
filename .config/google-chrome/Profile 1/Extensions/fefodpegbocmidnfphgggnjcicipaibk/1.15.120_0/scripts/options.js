
var opt_count = 0;
var opt_lng_new,
	opt_load_timer,
	opt_ok_load_timer,
	opt_color = 'Default',
	fontsize = 13;

var arr_color = [];
arr_color['Default'] = ['#ccc', '#333', '#909090', 'none', '#b5b5b5', '#76C5B7', '#808080', '#808080', '#eee', '#b1b1b1'];
arr_color['Dark'] = ['#484848','#fff','#f7f7f7','none','#666','#666','#fff','#333','#666','#fff'];
arr_color['Light'] = ['#fff','#000','#ccc','none','#fff','#fff','#000','#b5b5b5','#fff','#000'];
arr_color['Red'] = ['#ff8f8f','#000','#b1b1b1','none','#ffabab','#ffabab','#fff','#cc7a7a','#ffabab','#fff'];
arr_color['Green'] = ['#7adca5','#000','#b1b1b1','none','#aaf5cb','#aaf5cb','#fff','#71c797','#aaf5cb','#fff'];
arr_color['Blue'] = ['#76b2ce','#000','#b1b1b1','none','#90cce8','#90cce8','#fff','#72acc7','#90cce8','#fff'];
arr_color['Light-red'] = ['#de5555','#fff','#de5555','1px solid #fff','#eee','#eee','#e80000','#ec7474','#eee','#e80000'];
arr_color['Light-green'] = ['#3fd620','#fff','#3fd620','1px solid #fff','#eee','#eee','#06de00','#42d424','#eee','#06de00'];
arr_color['Light-blue'] = ['#6147d2','#fff','#6147d2','1px solid #fff','#eee','#eee','#0900b5','#5b44bd','#eee','#0900b5'];


if (lng_loc_true) {
	var lng_opt = lng_local;
} else {
	var lng_opt = lng;
}


if (localStorage.getItem('email')) {
	$('.opt_all_div .opt_login').text(localStorage.getItem('login'));
	$('.opt_all_div .opt_email').text(localStorage.getItem('email'));
} else {
	$('.opt_login_email').css({'display': 'none'});
}




$('#select_object option[value="'+lng_opt+'"]').prop('selected', true);
if (localStorage.getItem('settings') != '' && 
	localStorage.getItem('settings') != null && 
	localStorage.getItem('settings') != 'undefined') {
	$('#opt_'+localStorage.getItem('settings')).prop('checked', true);
} else {
	$('#opt_1').prop('checked', true);
}

if (localStorage.getItem('settings_list') != '' && 
	localStorage.getItem('settings_list') != null && 
	localStorage.getItem('settings_list') != 'undefined' &&
	localStorage.getItem('settings_list') == 1) {
	$('.opt_checkbox_tab').prop('checked', true);
} else {
	$('.opt_checkbox_tab').prop('checked', false);
}

if (localStorage.getItem('settings_edit') != '' && 
	localStorage.getItem('settings_edit') != null && 
	localStorage.getItem('settings_edit') != 'undefined' &&
	localStorage.getItem('settings_edit') == 1) {
	$('#opt_e_checkbox').prop('checked', true);
} else {
	$('#opt_e_checkbox').prop('checked', false);
}

if (localStorage.getItem('settings_fontsize') != '' && 
	localStorage.getItem('settings_fontsize') != null && 
	localStorage.getItem('settings_fontsize') != 'undefined') {
	$('.settings_s_text').val(localStorage.getItem('settings_fontsize')+'px');
	fontsize = localStorage.getItem('settings_fontsize');
} else {
	$('.settings_s_text').val('13px');
}
var opt_count = 1;

if (opt_count == 1) {
	$('body').on('change', "#select_object", function() {
		if($("#select_object").val()) {
			lng_opt = $("select#select_object").val();
		}
	});
}

if (localStorage.getItem('settings_color') != '' && 
localStorage.getItem('settings_color') != null && 
localStorage.getItem('settings_color') != 'undefined') {
	$('.settings_c_text').val(localStorage.getItem('settings_color'));
	opt_color = localStorage.getItem('settings_color');
} else {
	$('.settings_c_text').val(opt_color);
}


 // Анимация сохранения
function _opt_load() {
	clearTimeout(opt_load_timer);
	clearTimeout(opt_ok_load_timer);
	$('#img_save_ok_load').css({'opacity': '1'});
	$('#img_save_ok').css({'opacity': '0'});
	opt_load_timer = setTimeout(function() {
		$('#img_save_ok').css({'opacity': '1'});
		$('#img_save_ok_load').css({'opacity': '0'});
		opt_load_timer = setTimeout(function() {
			$('#img_save_ok_load, #img_save_ok').css({'opacity': '0'});
		}, 3000);
	}, _random_timer(200, 1500));
}
 // Рандомное число
function _random_timer(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }


 // Нажатие на кнопку "Сохранить настройки"
$('.opt_button').click(function() {

	 // Язык
	localStorage.setItem('language', lng_opt);

	 // Размер app
	localStorage.setItem('settings', $('input[name=opt_radio]:checked').val());

	 // Чекбокс убирает tab (список листов)
	if ($('#opt_checkbox_tab').prop('checked')) {
		localStorage.setItem('settings_list', '1');
	} else {
		localStorage.setItem('settings_list', '0');
	}

	 // Размер шрифта fontsize
	localStorage.setItem('settings_fontsize', fontsize.slice(0,-2));

	 // Цвет темы notepad
	localStorage.setItem('settings_color', opt_color);

	 // Чекбокс убирает visual editor
	if ($('#opt_e_checkbox').prop('checked')) {
		localStorage.setItem('settings_edit', '1');
	} else {
		localStorage.setItem('settings_edit', '0');
	}

	// var opt_tmp = $("select#select_object:selected").val();
	// localStorage.setItem('language', opt_tmp);
	 // Изменить язык везде (background_page)
	var opt_bg = chrome.extension.getBackgroundPage();
	opt_bg._func_lng();

	 // Анимация сохранения
	_opt_load();
});

 // Показывать preview при наведении на resize
$('.settings_radio_div').on('mouseenter', function() {
	$('.opt_prev').toggleClass('opt_prev_hide');
	$('.settings_radio_div').on('mouseenter', '.settings_r_s', function() { $('.opt_prev').css({'width': '200px'});
	}).on('mouseenter', '.settings_r_0', function() { $('.opt_prev').css({'width': '250px'});
	}).on('mouseenter', '.settings_r_1', function() { $('.opt_prev').css({'width': '300px'});
	}).on('mouseenter', '.settings_r_2', function() { $('.opt_prev').css({'width': '350px'});
	}).on('mouseleave', function() { $('.opt_prev').css({'width': '300px'});
	});
}).on('mouseleave', function() { $('.opt_prev').toggleClass('opt_prev_hide');
});

 // Показывать preview при наведении на checkbox
$('.settings_checkbox_div').on('mouseenter', function() {
	$('.opt_prev').toggleClass('opt_prev_hide');
	$('.opt_p_left').toggleClass('opt_p_left_tmp');
}).on('mouseleave', function() {
	$('.opt_prev').toggleClass('opt_prev_hide');
	$('.opt_p_left').toggleClass('opt_p_left_tmp');
});

 // Показывать preview при наведении на font-size
// $('.settings_size_text').on('mouseenter', function() {
// 	$('.opt_prev').toggleClass('opt_prev_hide');
// }).on('mouseleave', function() {
// 	$('.opt_prev').toggleClass('opt_prev_hide');
// });


 // Изменить preview font-size
var fontsize = $('.settings_s_text').val();
$('.settings_s_list').on('mouseover', '.opt_s_list', function(e) {
	$('.opt_p_lorem').css({'transform': 'scale('+(e.target.innerText-1)/10+')'});
	$('.settings_s_text').val(e.target.innerText+'px');
}).on('mouseleave', function() {
	$('.settings_s_text').val(fontsize);
	$('.opt_p_lorem').css({'transform': 'scale('+(fontsize-1)/10+')'});
});
$('.opt_s_list').on('mousedown', function(e){
	fontsize = e.target.innerText+'px';
	$('.settings_s_text').val(fontsize);
});


 // Изменить color notepad
$('.settings_c_list').on('mouseover', '.opt_c_list', function(e) {
	$('.settings_c_text').val(e.target.innerText);
	_color_change(e.target.innerText);
}).on('mouseleave', function() {
	$('.settings_c_text').val(opt_color);
	_color_change();
});
$('.opt_c_list').on('mousedown', function(e){
	opt_color = e.target.innerText;
	$('.settings_c_text').val(opt_color);
	_color_change(opt_color);
});


$('.notSync button').on('click', function() {
	if (localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		localStorage.setItem('sync', 'true');
	}
})

 // Показывать visual editor при наведении на checkbox
$('.settings_e_div').on('mouseenter', function() {
	$('.opt_prev').toggleClass('opt_prev_hide');
	$('.opt_code').toggleClass('opt_code_tmp');
}).on('mouseleave', function() {
	$('.opt_prev').toggleClass('opt_prev_hide');
	$('.opt_code').toggleClass('opt_code_tmp');
});

function _color_change(a) {
	if (a) {
		$('.opt_p_top').css({'backgroundColor': arr_color[a][0], 'color': arr_color[a][1]});
		$('.opt_p_top > div:nth-child(2), .opt_p_top > div:nth-child(3)').css({'backgroundColor': arr_color[a][2], 'outline': arr_color[a][3]});
		$('.opt_p_left').css({'backgroundColor': arr_color[a][4]});
		$('.opt_p_left > span, .opt_p_right > div > div:nth-child(2)').css({'backgroundColor': arr_color[a][5], 'borderColor': arr_color[a][6]});
		$('.opt_p_left > div').css({'backgroundColor': arr_color[a][7]});
		$('.opt_p_right > div:nth-child(1), .opt_code').css({'backgroundColor': arr_color[a][8]});
		$('.opt_p_right > div > div:nth-child(1)').css({'borderColor': arr_color[a][9]});
	} else {
		$('.opt_p_top').css({'backgroundColor': '#ccc', 'color': '#333'});
		$('.opt_p_top > div:nth-child(2), .opt_p_top > div:nth-child(3)').css({'backgroundColor': '#909090', 'outline': 'none'});
		$('.opt_p_left').css({'backgroundColor': '#b5b5b5'});
		$('.opt_p_left > span, .opt_p_right > div > div:nth-child(2)').css({'backgroundColor': '#76C5B7', 'borderColor': '#808080'});
		$('.opt_p_left > div').css({'backgroundColor': '#808080'});
		$('.opt_p_right > div:nth-child(1), .opt_code').css({'backgroundColor': '#eee'});
		$('.opt_p_right > div > div:nth-child(1)').css({'borderColor': '#b1b1b1'});
	}
}