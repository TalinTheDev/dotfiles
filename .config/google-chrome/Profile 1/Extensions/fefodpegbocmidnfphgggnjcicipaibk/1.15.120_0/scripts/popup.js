var address_site = 'https://notepad-online.ru';
var address = address_site+'/server_real.php';


// var seria_offline = '';
 // localStorage.clear();
 // var lng = navigator.browserLanguage || navigator.language || navigator.userLanguage;
// var lng = chrome.i18n.getMessage("@@ui_locale");
// var lng_array = ["en", "ru", "zh", "es", "pt", "hi"];
localStorage.setItem('color', '');

 // Генератор строки
function _gen(a=5) {
	var ch = 'abcdefghijklmnopqrstuvwxyz';
	var code = '';
	var clen = ch.length;
	while (code.length < a) {
		code = code + ch[Math.floor(Math.random()*(clen))];
	}
	return code;
}

 // Open / close new tabs
var bg = chrome.extension.getBackgroundPage();
bg._window_close();
$('.maximize').on("click", function() {
	// localStorage.setItem('sync', 'false');
	window.close();
	var bg = chrome.extension.getBackgroundPage();
	bg._window_open();
});


var editor = 0;
if (localStorage.getItem('settings_edit') != null &&
localStorage.getItem('settings_edit') != 'undefined' &&
localStorage.getItem('settings_edit') != '' &&
localStorage.getItem('settings_edit') == 1) {
	editor = 1;
	$('.jqte-test').jqte();
	// settings of status
	var jqteStatus = false;
	$(".status").click(function() {
		jqteStatus = jqteStatus ? false : true;
		$('.jqte-test').jqte({"status" : jqteStatus})
	});
}

 // Условие выбора языка из стандартного и изменённого
if (typeof localStorage.getItem('language') != 'undefined' && localStorage.getItem('language') != null &&
	localStorage.getItem('language') != '' && lng_array.indexOf(localStorage.getItem('language')) !== -1 &&
	typeof localStorage.getItem('language_text') != 'undefined' && localStorage.getItem('language_text') != null &&
	localStorage.getItem('language_text') != '') { // Если language есть в массиве
		lng = localStorage.getItem('language');
} else {
	localStorage.setItem('language', lng);
}

if (localStorage.getItem('settings_list') != null &&
localStorage.getItem('settings_list') != 'undefined' &&
localStorage.getItem('settings_list') != '' &&
localStorage.getItem('settings_list') == 1) {
	if (localStorage.getItem('settings_list_show') != null &&
	localStorage.getItem('settings_list_show') != 'undefined' &&
	localStorage.getItem('settings_list_show') != '' &&
	localStorage.getItem('settings_list_show') == 1) {
		_show_hide_list('show');
	} else {
		_show_hide_list('hide');
	}

	$('.new_left_block').css({'position': 'fixed',
							'backgroundColor': 'var(--color-bg-body)',
							'borderRight': '1px solid #777',
							'box-shadow': '5px 0px 29px -5px #333',
							'transition': 'left 0.4s cubic-bezier(0.2, 1, 1, 1)'});

	if (localStorage.getItem('settings') == 's') {
		var settings_width = 467;
		var settings_right_block = 483;
	} else if (localStorage.getItem('settings') == 0) {
		var settings_width = 567;
		var settings_right_block = 583;
	} else if (localStorage.getItem('settings') == 2) {
		var settings_width = 767;
		var settings_right_block = 783;
	} else {
		var settings_width = 667;
		var settings_right_block = 683;
	}
	$('.active_first .textarea').css({'min-width': settings_width+'px'});
	$('.new_right_block').css({'width': settings_right_block+'px'});
	$('.p_conteiner').addClass('active_show').removeClass('active_hide');
} else {
	$('.new_left_block').css({'left': '0px'});
	$('.left_block_slip_div').css({'display': 'none'});
	$('.p_conteiner').addClass('active_hide').removeClass('active_show');
}


if (typeof localStorage.getItem('settings_fontsize') !== undefined &&
localStorage.getItem('settings_fontsize') !== '' && 
localStorage.getItem('settings_fontsize') != null && 
localStorage.getItem('settings_fontsize') !== 'undefined') {
	$('.textarea').css({'fontSize': localStorage.getItem('settings_fontsize')+'.3333px'});
}


/***
 *    ███████╗████████╗ █████╗ ██████╗ ████████╗     ██████╗ ███╗   ██╗
 *    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔═══██╗████╗  ██║
 *    ███████╗   ██║   ███████║██████╔╝   ██║       ██║   ██║██╔██╗ ██║
 *    ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██║   ██║██║╚██╗██║
 *    ███████║   ██║   ██║  ██║██║  ██║   ██║       ╚██████╔╝██║ ╚████║
 *    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═╝  ╚═══╝
 */
 // Выбор показа content/login/registration
function _start_on(e) {
	_fix('_start_on');
	$('body').removeClass('body_width');
	localStorage.setItem('choice', 'on');
	localStorage.setItem('sync', 'true');
	$('#p_login, #p_conteiner, #p_registration, .menu_login_reg, .menu_hello, .p_menu_menu, .maximize').css({'display': 'none'});
	$('#p_list_string_history, #p_list_string_session, #p_list_string_pass').css({'display': 'block'});
	$('#a_sync').css({'display': 'inline-block'});
	// $('.seria').css({'width': '66%'});
	$('.menu_notepad_online').text('online');
	if (e == 'conteiner' && localStorage.getItem('start') == 'true') {
		_load_contents();
	} else if (e == 'login' || localStorage.getItem('start') == 'false') {
		$('.menu_login_reg').css({'display': 'inline-block'});
		$('#p_login').css({'display': 'flex'});
	} else {
		$('.menu_login_reg').css({'display': 'inline-block'});
		$('#p_registration').css({'display': 'flex'});
	}
}


/***
 *    ██████╗ ██╗███████╗██████╗ ██╗      █████╗ ██╗   ██╗     ██████╗ ███╗   ██╗██╗     ██╗███╗   ██╗███████╗
 *    ██╔══██╗██║██╔════╝██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝    ██╔═══██╗████╗  ██║██║     ██║████╗  ██║██╔════╝
 *    ██║  ██║██║███████╗██████╔╝██║     ███████║ ╚████╔╝     ██║   ██║██╔██╗ ██║██║     ██║██╔██╗ ██║█████╗  
 *    ██║  ██║██║╚════██║██╔═══╝ ██║     ██╔══██║  ╚██╔╝      ██║   ██║██║╚██╗██║██║     ██║██║╚██╗██║██╔══╝  
 *    ██████╔╝██║███████║██║     ███████╗██║  ██║   ██║       ╚██████╔╝██║ ╚████║███████╗██║██║ ╚████║███████╗
 *    ╚═════╝ ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝
 */
 // Если online
function _display_online() {
	_fix('_display_online');
	$('#email').val(localStorage.getItem('email'));
	if (localStorage.getItem('start')) {
		if (localStorage.getItem('start') == 'true') {
			if (!localStorage.getItem('sync') || localStorage.getItem('sync') == '') {
				localStorage.setItem('sync', 'true');
			} else {
				if (localStorage.getItem('sync') == 'false') {
					$('.load').css({'marginLeft': '0px', 'opacity': '1'});
					function _wait() {
						if (localStorage.getItem('sync') == 'false') {
							setTimeout(_wait, 50);
						} else {
							_load_contents();
						}
					}
					setTimeout(_wait, 50);
				} else {
					_load_contents();
				}
			}
		} else {
			_fix('_start_2 > false > _start("login")');
			_start_on('login');
		}
	} else {
		_fix('_start_2 > undefined > _start("login")');
		_start_on('login');
	}
}


/***
 *    ███████╗████████╗ █████╗ ██████╗ ████████╗    ██████╗ 
 *    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ╚════██╗
 *    ███████╗   ██║   ███████║██████╔╝   ██║        █████╔╝
 *    ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██╔═══╝ 
 *    ███████║   ██║   ██║  ██║██║  ██║   ██║       ███████╗
 *    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚══════╝
 */
 // Старт основного скрипта
function _start_2() {
	_fix('_start_2');
	if (localStorage.getItem('choice') && localStorage.getItem('choice') === 'off') {
		_start_off();
	} else {
		if (localStorage.getItem('user_id')) {
			_display_online();
		} else {
			_start_on_off();
		}
	}
}



/***
 *    ███████╗███╗   ██╗████████╗███████╗██████╗ 
 *    ██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
 *    █████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
 *    ██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
 *    ███████╗██║ ╚████║   ██║   ███████╗██║  ██║
 *    ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
 */
 // Вход в контейнер
function _enter(email, pass) {
	_fix('_enter');
	$.ajax({
		beforeSend: function() {
			$('.load').css({'marginLeft': '0px', 'opacity': '1'});
		},
		complete: function() {
			$('.load').css({'marginLeft': '-100%', 'opacity': '0'});
		},
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'first',
			email: email,
			pass: pass
		}
	}).done(function(msg) {
		$('#pass').val('');
		if (msg.result == 'ok') {
			_fix('_enter > ajax > ok');

			 // Изменить язык везде (background_page)
			var pop_bg = chrome.extension.getBackgroundPage();
			pop_bg._func_lng();

			localStorage.setItem('login', msg.login);
			localStorage.setItem('session', msg.session);
			localStorage.setItem('user_id', msg.user_id);
			localStorage.setItem('start', 'true');
			_start_on('conteiner');
		} else {
			_fix('error > _enter > ajax');
			// _popup('e_not_email_or_pass');
			if (msg.status) {
				_popup('e_incorrect', msg.status);
			} else {
				_popup('e_not_email_or_pass');
			}
		}
		// _context_menus();
		_scroller();
	}).fail(function() {
		_fix('error > _enter > fail');
		_popup('e_server_not');
		_context_menus('not');
	});
}


/***
 *    ██████╗ ███████╗ ██████╗ ██╗███████╗████████╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
 *    ██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   ██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
 *    ██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
 *    ██║  ██║███████╗╚██████╔╝██║███████║   ██║   ██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
 *    ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 */
 // Регистрация
function _registration(login, pass, email) {
	_fix('_registration');
	$.ajax({
		beforeSend: function() {
			$('.load').css({'marginLeft': '0px', 'opacity': '1'});
		},
		complete: function() {
			$('.load').css({'marginLeft': '-100%', 'opacity': '0'});
		},
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'registration',
			lng: localStorage.getItem('language'),
			login: login,
			pass: pass,
			email: email,
			uid: get_cookie('notepad_uid')
		}
	}).done(function(msg) {
		if (msg.result == 'ok') {
			_fix('_registration > ajax > ok');
			localStorage.setItem('login', login);
			localStorage.setItem('email', email);
			localStorage.setItem('session', msg.session);
			localStorage.setItem('user_id', msg.user_id);
			localStorage.setItem('start', 'true');
			$('#r_login, #r_email, #r_pass').val('');
			_start_on('conteiner');
		} else if (msg.result == 'notice') {
			_fix('_registration > ajax > notice');
			$('#pass').val('');
			_popup('e_email_use');
		} else {
			_fix('_registration > ajax > error');
			$('#pass').val('');
			if (msg.status) {
				_popup('e_incorrect', msg.status);
			} else {
				_popup();
			}
		}
		_context_menus();
		_scroller();
	}).fail(function() {
		_fix('error > _registration > fail');
		_popup('e_server_not');
		_context_menus('not');
	});
}


/***
 *    ██╗      ██████╗  ██████╗  ██████╗ ██╗   ██╗████████╗
 *    ██║     ██╔═══██╗██╔════╝ ██╔═══██╗██║   ██║╚══██╔══╝
 *    ██║     ██║   ██║██║  ███╗██║   ██║██║   ██║   ██║
 *    ██║     ██║   ██║██║   ██║██║   ██║██║   ██║   ██║
 *    ███████╗╚██████╔╝╚██████╔╝╚██████╔╝╚██████╔╝   ██║
 *    ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝
 */
 // Выход logout
function _logout(session, user_id) {
	_fix('_logout');
	$.ajax({
		beforeSend: function() {
			$('.load').css({'marginLeft': '0px', 'opacity': '1'});
		},
		complete: function() {
			$('.load').css({'marginLeft': '-100%', 'opacity': '0'});
		},
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'logout',
			session: session,
			user_id: user_id
		}
	}).done(function(msg) {
		if (msg.result == 'ok') {
			_fix('_logout > ajax > ok');
			$('.p_menu_menu_list_bg').css({'height': '0%', 'opacity': 0});
			$('.p_menu_menu_list').css({'top': '-330px', 'opacity': 0, 'visibility': 'hidden'});
			var email_mem = localStorage.getItem('email');
			var scroller_mem = localStorage.getItem('scroller');
			var language_mem = localStorage.getItem('language');
			var language_text_mem = localStorage.getItem('language_text');
			localStorage.clear();
			localStorage.setItem('email', email_mem);
			localStorage.setItem('scroller', scroller_mem);
			localStorage.setItem('language', language_mem);
			localStorage.setItem('language_text', language_text_mem);
			$("#tab").children("ul").html('');
			$('.textarea, #pass, #r_login, #r_email, #r_pass').val('');
			$('#email').val(email_mem);
			_start_on('login');
		} else {
			_fix('error > _logout > ajax');
			if (msg.status) {
				_popup("e_invalid", msg.status);
			} else {
				_popup('e_invalid_session');
			}
		}
		_context_menus('not');
	}).fail(function() {
		_fix('error > _logout > fail');
		_popup('e_server_not');
		_context_menus('not');
	});
}


/***
 *    ██╗      ██████╗  █████╗ ██████╗      ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗███████╗
 *    ██║     ██╔═══██╗██╔══██╗██╔══██╗    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 *    ██║     ██║   ██║███████║██║  ██║    ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   ███████╗
 *    ██║     ██║   ██║██╔══██║██║  ██║    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 *    ███████╗╚██████╔╝██║  ██║██████╔╝    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   ███████║
 *    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝      ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 */
 // Отправка и получение данных с сервера > second
function _load_contents() {
	_fix('_load_contents');
	// localStorage.setItem('sync_2', 'false');
	localStorage.setItem('choice', 'on');
	$('.menu_hello, .p_menu_menu, .maximize').css({'display': 'inline-block'});
	$('#p_conteiner').css({'display': 'block'});
	$('#a_hello').text(localStorage.getItem('login'));
	$.ajax({
		beforeSend: function() {
			$('.load').css({'marginLeft': '0px', 'opacity': '1'});
		},
		complete: function() {
			$('.load').css({'marginLeft': '-100%', 'opacity': '0'});
		},
		url: address,
		dataType: "json",
		// async: true,
		type: "POST",
		data: {
			method: 'second',
			lng: localStorage.getItem('language'),
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session')
		}
	}).done(function(msg) {
		_fix('_load_contents > ajax');
		if (msg.result == 'ok') {
			_fix('_load_contents > ajax > ok');
			localStorage.setItem('seria', JSON.stringify(msg.seria));
			localStorage.setItem('server_contents', JSON.stringify(msg.contents));
			localStorage.setItem('sort', JSON.stringify(msg.sort));
			$(".menu_email > div").text(localStorage.getItem('email'));
			_copy_contents(JSON.stringify(msg.contents));
			_scroller();
			_msg_view();
			if (localStorage.getItem('active')) {
				_json_contents(localStorage.getItem('active'));
			} else {
				_json_contents();
			}
		} else {
			_fix('error > _load_contents > ajax');
			localStorage.clear();
			_start_on('login');
			_popup('e_invalid', msg.status);
		}
		_context_menus();
		_scroller();
		_scroller_view();
	}).fail(function(msg) {
		_fix('error > _load_contents > fail');
		_popup('e_server_not');
		_context_menus('not');
	});
}


/***
 *         ██╗███████╗ ██████╗ ███╗   ██╗     ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗███████╗
 *         ██║██╔════╝██╔═══██╗████╗  ██║    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 *         ██║███████╗██║   ██║██╔██╗ ██║    ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   ███████╗
 *    ██   ██║╚════██║██║   ██║██║╚██╗██║    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 *    ╚█████╔╝███████║╚██████╔╝██║ ╚████║    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   ███████║
 *     ╚════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 */
 // Распарсить контент и выводим список в Таб
function _json_contents(e) {
	_fix('_json_contents');
	if (localStorage.getItem('start') == 'true') {
		cont = JSON.parse(localStorage.getItem('seria'));
		var tmp = false;
		var tab = '';
		var arr = '';
		var cont_key = _chrome_i18n("name_list");

		sort = JSON.parse(localStorage.getItem('sort'));
		for (var sort_key in sort) {
			// tmp = key;
			tmp = sort[sort_key];
			arr = cont[tmp].substr(0,70);
			if (arr == '') { arr = cont_key; }
			tab += '<li class="li"><div class="submit_color"></div><div class="submit_delete">&times;</div>' +
			'<div class="notepad_a" id="' + tmp + '">' + arr + '</div></li>';
		}

		// for (var key in cont) {
		// 	tmp = key;
		// 	arr = cont[key].substr(0,70);
		// 	if (arr == '') { arr = cont_key; }
		// 	tab += '<li class="li"><div class="submit_color"></div><div class="submit_delete">&times;</div>' +
		// 	'<div class="notepad_a" id="' + key + '">' + arr + '</div><div class="submit_move">☰</div></li>';
		// }
		if (tmp !== false) {
			$("#tab").children("ul").html('');
			$("#tab").children("ul").append(tab);
			$(".tab_nano").nanoScroller();
			if (e) {
				_active(e);
			} else {
				_active(tmp);
			}
		} else {
			_fix('error > _json_contents');
			_create_note();
		}
	} else {
		localStorage.clear();
		_start_on('login');
	}
}

function _sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/***
 *         ██╗███████╗ ██████╗ ███╗   ██╗     ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗███████╗    ██████╗ 
 *         ██║██╔════╝██╔═══██╗████╗  ██║    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝    ╚════██╗
 *         ██║███████╗██║   ██║██╔██╗ ██║    ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   ███████╗     █████╔╝
 *    ██   ██║╚════██║██║   ██║██║╚██╗██║    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   ╚════██║    ██╔═══╝ 
 *    ╚█████╔╝███████║╚██████╔╝██║ ╚████║    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   ███████║    ███████╗
 *     ╚════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝    ╚══════╝
 */
 // Вывод списка в Таб
function _json_contents_2() {
	// await _sleep(20000);
	_fix('_json_contents_2');
	if (localStorage.getItem('start') == 'true') {
		cont = JSON.parse(localStorage.getItem('seria'));
		var tmp = false;
		var tab = '';
		var arr = '';
		var cont_key = _chrome_i18n("name_list");

		sort = JSON.parse(localStorage.getItem('sort'));
		for (var sort_key in sort) {
			// tmp = key;
			tmp = sort[sort_key];
			arr = cont[tmp].substr(0,70);
			if (arr == '') { arr = cont_key; }
			tab += '<li class="li"><div class="submit_color"></div><div class="submit_delete">&times;</div>' +
			'<div class="notepad_a" id="' + tmp + '">' + arr + '</div></li>';
		}

		// for (var key in cont) {
		// 	tmp = key;
		// 	arr = cont[key].substr(0,70);
		// 	if (arr == '') { arr = cont_key; }
		// 	tab += '<li class="li"><div class="submit_color"></div><div class="submit_delete">&times;</div>' +
		// 	'<div class="notepad_a" id="' + key + '">' + arr + '</div></li>';
		// }
		if (tmp !== false) {
			$("#tab").children("ul").html('');
			$("#tab").children("ul").append(tab);
			$(".nano").nanoScroller();
		}
	} else {
		localStorage.clear();
		_start_on('login');
	}
}


/***
 *     ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗    ███╗   ██╗ ██████╗ ████████╗███████╗
 *    ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝    ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝
 *    ██║     ██████╔╝█████╗  ███████║   ██║   █████╗      ██╔██╗ ██║██║   ██║   ██║   █████╗  
 *    ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝      ██║╚██╗██║██║   ██║   ██║   ██╔══╝  
 *    ╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗    ██║ ╚████║╚██████╔╝   ██║   ███████╗
 *     ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝
 */
 // Создать лист
function _create_note() {
	_fix('_create_note');
	$.ajax({
		beforeSend: function() {
			$('.load').css({'marginLeft': '0px', 'opacity': '1'});
		},
		complete: function() {
			$('.load').css({'marginLeft': '-100%', 'opacity': '0'});
		},
		url: address,
		dataType: "json",
		// async: true,
		type: "POST",
		data: {
			method: 'create',
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session')
		}
	}).done(function(msg) {
		_fix('_create_note > ajax');
		if (msg.result == 'ok') {
			_fix('_create_note > ajax > ok');
			cont = JSON.parse(localStorage.getItem('contents'));
			cont[msg.seria] = '';
			localStorage.setItem('contents', JSON.stringify(cont));

			ser = JSON.parse(localStorage.getItem('seria'));
			ser[msg.seria] = "";
			localStorage.setItem('seria', JSON.stringify(ser));
			_add_sort(msg.seria);
			_json_contents();
			document.getElementById("seria").focus();
		} else {
			_fix('error > _create_note > ajax');
			if (msg.status) {
				_popup("e_invalid", msg.status);
			} else {
				_popup('e_invalid_session');
			}
		}
		_save_color();
		_context_menus();
		_scroller();
		_scroller_view();
	}).fail(function() {
		_fix('error > _create_note > fail');
		_popup('e_server_not');
		_context_menus('not');
	});
}


/***
 *    ██████╗ ███████╗██╗     ███████╗████████╗███████╗    ███╗   ██╗ ██████╗ ████████╗███████╗
 *    ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝    ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝
 *    ██║  ██║█████╗  ██║     █████╗     ██║   █████╗      ██╔██╗ ██║██║   ██║   ██║   █████╗  
 *    ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝      ██║╚██╗██║██║   ██║   ██║   ██╔══╝  
 *    ██████╔╝███████╗███████╗███████╗   ██║   ███████╗    ██║ ╚████║╚██████╔╝   ██║   ███████╗
 *    ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝    ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝
 */
 // Удалить лист
function _delete_note(note) {
	_fix('_delete_note');
	$.ajax({
		beforeSend: function() {
			$('.load').css({'marginLeft': '0px', 'opacity': '1'});
		},
		complete: function() {
			$('.load').css({'marginLeft': '-100%', 'opacity': '0'});
		},
		url: address,
		dataType: "json",
		// async: true,
		type: "POST",
		data: {
			method: 'delete',
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session'),
			note: note
		}
	}).done(function(msg) {
		_fix('_delete_note > ajax');
		if (msg.result == 'ok') {
			_fix('_delete_note > ajax > ok');
			var tmp_color = note;
			tmp_color = new RegExp(tmp_color, 'i');
			if (tmp_color.test(localStorage.getItem('color'))) {
				localStorage.setItem('color', localStorage.getItem('color').replace(tmp_color,'')); // color
			}
			_delete_seria(note);
			_delete_sort(note);
			_delete_contents(note);
		} else {
			_fix('error > _delete_note > ajax');
			if (msg.status) {
				_popup("e_invalid", msg.status);
			} else {
				_popup('e_invalid_session');
			}
		}
		_save_color();
		_context_menus();
		_scroller('del');
		_scroller_view();
	}).fail(function() {
		_fix('error > _delete_note > fail');
		_popup('e_server_not');
		_context_menus('not');
	});
}


/***
 *    ██████╗ ███████╗██╗     ███████╗████████╗███████╗    ███████╗███████╗██████╗ ██╗ █████╗ 
 *    ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝    ██╔════╝██╔════╝██╔══██╗██║██╔══██╗
 *    ██║  ██║█████╗  ██║     █████╗     ██║   █████╗      ███████╗█████╗  ██████╔╝██║███████║
 *    ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝      ╚════██║██╔══╝  ██╔══██╗██║██╔══██║
 *    ██████╔╝███████╗███████╗███████╗   ██║   ███████╗    ███████║███████╗██║  ██║██║██║  ██║
 *    ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝    ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
 */
 // Удаление seria
function _delete_seria(note) {
	_fix('_delete_seria');
	res = JSON.parse(localStorage.getItem('seria'));
	delete res[note];
	localStorage.setItem('seria', JSON.stringify(res));
}


/***
 *    ██████╗ ███████╗██╗     ███████╗████████╗███████╗     ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗███████╗
 *    ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 *    ██║  ██║█████╗  ██║     █████╗     ██║   █████╗      ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   ███████╗
 *    ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝      ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 *    ██████╔╝███████╗███████╗███████╗   ██║   ███████╗    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   ███████║
 *    ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 */
 // Удаление контента
function _delete_contents(note) {
	_fix('_delete_contents');
	cont = JSON.parse(localStorage.getItem('contents'));
	delete cont[note];
	localStorage.setItem('contents', JSON.stringify(cont));
	_json_contents();
}


/***
 *     ██████╗ ██████╗ ██████╗ ██╗   ██╗     ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗███████╗
 *    ██╔════╝██╔═══██╗██╔══██╗╚██╗ ██╔╝    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 *    ██║     ██║   ██║██████╔╝ ╚████╔╝     ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   ███████╗
 *    ██║     ██║   ██║██╔═══╝   ╚██╔╝      ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 *    ╚██████╗╚██████╔╝██║        ██║       ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   ███████║
 *     ╚═════╝ ╚═════╝ ╚═╝        ╚═╝        ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 */
 // Копирование контента
function _copy_contents(cont) {
	_fix('_copy_contents');
	if (localStorage.getItem('contents')) {
		if (localStorage.getItem('start') == 'true') {
			localStorage.setItem('contents', cont);
		} else {
			_fix('error > _copy_contents');
			_popup('e_load_content');
		}
	} else {
		localStorage.setItem('contents', cont);
	}
}


/***
 *     █████╗  ██████╗████████╗██╗██╗   ██╗███████╗
 *    ██╔══██╗██╔════╝╚══██╔══╝██║██║   ██║██╔════╝
 *    ███████║██║        ██║   ██║██║   ██║█████╗  
 *    ██╔══██║██║        ██║   ██║╚██╗ ██╔╝██╔══╝  
 *    ██║  ██║╚██████╗   ██║   ██║ ╚████╔╝ ███████╗
 *    ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝  ╚═══╝  ╚══════╝
 */
 // последний активный лист
function _active(key) {
	_fix('_active');
	if (key) {
		localStorage.setItem('active', key);
		_return_textarea(key, 'active');
		_bold();
	} else {
		cont = JSON.parse(localStorage.getItem('contents'));
		var tmp = false;
		for (var i in cont) {
			tmp = i;
		}
		if (tmp !== false) {
			_fix('_active > yes');
			localStorage.setItem('active', tmp);
			// _seria();
			_return_textarea(localStorage.getItem('active'), 'active');
			_bold();
		} else {
			_fix('error > _active');
			_popup('e_not_active');
			_create_note();
			_bold();
		}
	}
}


/***
 *    ███████╗██╗    ██╗ █████╗ ██████╗     ███████╗███████╗██████╗ ██╗ █████╗ 
 *    ██╔════╝██║    ██║██╔══██╗██╔══██╗    ██╔════╝██╔════╝██╔══██╗██║██╔══██╗
 *    ███████╗██║ █╗ ██║███████║██████╔╝    ███████╗█████╗  ██████╔╝██║███████║
 *    ╚════██║██║███╗██║██╔══██║██╔═══╝     ╚════██║██╔══╝  ██╔══██╗██║██╔══██║
 *    ███████║╚███╔███╔╝██║  ██║██║         ███████║███████╗██║  ██║██║██║  ██║
 *    ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝         ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
 */
 // Заменить старые данные на новые в storage.seria
function _swap_seria() {
	_fix('_swap_seria');
	cont = JSON.parse(localStorage.getItem('seria'));
	for (var key in cont) {
		if (key == localStorage.getItem('active')) {
			cont[key] = $(".seria").val();
			break;
		}
	}
	localStorage.setItem('seria', JSON.stringify(cont));
	localStorage.setItem('sync', 'false');
	var tmp_color = localStorage.getItem('active');
	tmp_color = new RegExp(tmp_color, 'i');
	if (tmp_color.test(localStorage.getItem('color'))) {
	} else {
		localStorage.setItem('color', localStorage.getItem('color')+','+localStorage.getItem('active')); // color
	}
	_json_contents_2();
	_save_color();
}


/***
 *    ███████╗██╗    ██╗ █████╗ ██████╗      ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗███████╗
 *    ██╔════╝██║    ██║██╔══██╗██╔══██╗    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 *    ███████╗██║ █╗ ██║███████║██████╔╝    ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   ███████╗
 *    ╚════██║██║███╗██║██╔══██║██╔═══╝     ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 *    ███████║╚███╔███╔╝██║  ██║██║         ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   ███████║
 *    ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝          ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 */
 // Заменить старые данные на новые в storage.contents
function _swap_contents(e) {
	_fix('_swap_contents');
	cont = JSON.parse(localStorage.getItem('contents'));
	for (var key in cont) {
		if (key == localStorage.getItem('active')) {
			if (e == 1) {
				cont[key] = $('.jqte_editor').html();
			} else {
				cont[key] = $(".textarea").val();
			}
			break;
		}
	}
	cont = JSON.stringify(cont);
	localStorage.setItem('contents', cont);
	localStorage.setItem('sync', 'false');
	var tmp_color = localStorage.getItem('active');
	tmp_color = new RegExp(tmp_color, 'i');
	if (tmp_color.test(localStorage.getItem('color'))) {
	} else {
		localStorage.setItem('color', localStorage.getItem('color')+','+localStorage.getItem('active')); // color
	}
	_save_color();
	// _json_contents(localStorage.getItem('active'));
}


/***
 *    ██████╗ ███████╗████████╗██╗   ██╗██████╗ ███╗   ██╗    ████████╗███████╗██╗  ██╗████████╗ █████╗ ██████╗ ███████╗ █████╗ 
 *    ██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗████╗  ██║    ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
 *    ██████╔╝█████╗     ██║   ██║   ██║██████╔╝██╔██╗ ██║       ██║   █████╗   ╚███╔╝    ██║   ███████║██████╔╝█████╗  ███████║
 *    ██╔══██╗██╔══╝     ██║   ██║   ██║██╔══██╗██║╚██╗██║       ██║   ██╔══╝   ██╔██╗    ██║   ██╔══██║██╔══██╗██╔══╝  ██╔══██║
 *    ██║  ██║███████╗   ██║   ╚██████╔╝██║  ██║██║ ╚████║       ██║   ███████╗██╔╝ ██╗   ██║   ██║  ██║██║  ██║███████╗██║  ██║
 *    ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝       ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
 */
 // Вывод в textarea
function _return_textarea(e, tab) {
	_fix('_return_textarea');
	// _bold();
	if (e) {
		cont = JSON.parse(localStorage.getItem('contents'));
		var tmp = false;
		for (var i in cont) {
			if (i == e) {
				tmp = cont[i];
				break;
			}
		}
		if (tab == 'active') {
			if (tmp !== false) {
				_fix('_return_textarea > true1');
				if (editor == 1) {
					$('.jqte_editor').html(tmp);
				} else {
					$('.textarea').val(tmp);
				}
				_seria();
			} else {
				_fix('_return_textarea > false1');
				_json_contents();
			}
		} else if (tab == 'tab') {
			if (tmp !== false) {
				_fix('_return_textarea > true2');
				localStorage.setItem('active', e);
				if (editor == 1) {
					$('.jqte_editor').html(tmp);
				} else {
					$('.textarea').val(tmp);
				}
				_seria();
			} else {
				_fix('_return_textarea > false2');
			}
		}
	} else {
		_fix('_return_textarea > undefined');
		JSON.parse(JSON.stringify(localStorage.getItem('contents')), function(key, value) {
			var tmp_value = false;
			if (key !== 'hash' && key !== 'contents' && key == localStorage.getItem('active')) {
				tmp_value = value;
			}
		});
		if (tmp_value !== false) {
			_fix('_return_textarea > undefined > true');
			if (editor == 1) {
				$('.jqte_editor').html(tmp_value);
			} else {
				$('.textarea').val(tmp_value);
			}
		} else {
			_fix('error > _return_textarea > undefined');
			_popup('e_no_data');
		}
	}
}


/***
 *     ██████╗ ███████╗████████╗     ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗███████╗
 *    ██╔════╝ ██╔════╝╚══██╔══╝    ██╔════╝██╔═══██╗██╔═══██╗██║ ██╔╝██║██╔════╝
 *    ██║  ███╗█████╗     ██║       ██║     ██║   ██║██║   ██║█████╔╝ ██║█████╗  
 *    ██║   ██║██╔══╝     ██║       ██║     ██║   ██║██║   ██║██╔═██╗ ██║██╔══╝  
 *    ╚██████╔╝███████╗   ██║       ╚██████╗╚██████╔╝╚██████╔╝██║  ██╗██║███████╗
 *     ╚═════╝ ╚══════╝   ╚═╝        ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝
 */
 // Получить куки
function get_cookie( cookie_name ) {
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	if ( results ) {
		return ( unescape ( results[2] ) );
	} else {
		return null;
	}
}

 // Пишет из active в seria имя листа
function _seria() {
	_fix('_seria');
	res = JSON.parse(localStorage.getItem('seria'));
	for (var key in res) {
		if (key == localStorage.getItem('active')) {
			$(".seria").val(res[key]);
			break;
		}
	}
}


/***
 *    ███████╗███████╗██████╗ ██╗ █████╗ 
 *    ██╔════╝██╔════╝██╔══██╗██║██╔══██╗
 *    ███████╗█████╗  ██████╔╝██║███████║
 *    ╚════██║██╔══╝  ██╔══██╗██║██╔══██║
 *    ███████║███████╗██║  ██║██║██║  ██║
 *    ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
 */
 // Выделение листа из списка
function _bold(e) {
	_fix('_bold');
	$('.notepad_a').css({'font-weight': 'normal', 'color': 'var(--color-text-not-active)'});
	$('.notepad_a').parent().css({'backgroundColor': 'var(--color-bg-li, rgba(173, 173, 173, 0.17))'});
	$(".li").removeClass("li_strong");
	$(".tab_full").css({"font-weight": "500", "color": "var(--color-text-tab_full, #000)"});
	if (e) {
		$('#'+e).css({'font-weight': '500', 'color': 'var(--color-text-tab_full, #000)'});
		$('#'+e).parent().css({'backgroundColor': 'var(--color-bg, #81d2c3)'});
		$('#'+e).parent().addClass('li_strong');
	} else {
		$('#'+localStorage.getItem('active')).css({'font-weight': '500', 'color': 'var(--color-text-tab_full, #000)'});
		$('#'+localStorage.getItem('active')).parent().css({'backgroundColor': 'var(--color-bg, #81d2c3)'});
		$('#'+localStorage.getItem('active')).parent().addClass('li_strong');
	}
	_search();
}


/***
 *     ██████╗ ██████╗ ███╗   ██╗████████╗███████╗██╗  ██╗████████╗    ███╗   ███╗███████╗███╗   ██╗██╗   ██╗███████╗
 *    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝    ████╗ ████║██╔════╝████╗  ██║██║   ██║██╔════╝
 *    ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗   ╚███╔╝    ██║       ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║███████╗
 *    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗    ██║       ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║╚════██║
 *    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██╔╝ ██╗   ██║       ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝███████║
 *     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
 */
 // Обновление контекстного меню ContextMenus
function _context_menus(e) {
	_fix('_context_menus');
	var background_update = chrome.extension.getBackgroundPage();
	background_update._update(e);
}


/***
 *    ███████╗██╗   ██╗███╗   ██╗ ██████╗
 *    ██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝
 *    ███████╗ ╚████╔╝ ██╔██╗ ██║██║     
 *    ╚════██║  ╚██╔╝  ██║╚██╗██║██║     
 *    ███████║   ██║   ██║ ╚████║╚██████╗
 *    ╚══════╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝
 */
 // Send response to background for sync
chrome.runtime.onMessage.addListener(
	function(req, sender, response) {
		if (req.type=='getResponse') {
			response({ok:"ok", path: location.pathname});
		}
		if (req.type=='contextMenus') {
			if (location.pathname.includes('second')) {
				if (localStorage.getItem('choice') && localStorage.getItem('choice') === 'off') {
					_return_textarea_off(localStorage.getItem('active'), 'active');
				} else {
					_return_textarea(localStorage.getItem('active'), 'active');
				}
				_bold();
			}
		}
	}
);


 // Сохранение
var save_timer = '';
var sync_count = 0;
function _sync() {
	_fix('sync');
	sync_count += 1;
	$.ajax({
		beforeSend: function() {
			clearTimeout(save_timer);
			$('#img_save_ok_load').css({'opacity': '1'});
			$('#img_save, #img_save_ok, #img_save_er').css({'opacity': '0'});
		},
		/*complete: function() {
			$('#img_save_ok').css({'opacity': '1'});
			$('#img_save_ok_load, #img_save, #img_save_er').css({'opacity': '0'});
		},*/
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'sync',
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session'),
			sort: localStorage.getItem('sort'),
			seria: localStorage.getItem('seria'),
			contents: localStorage.getItem('contents')
		}
	}).done(function(msg) {
		_fix('sync > ajax');
		if (msg.result == 'ok') {
			$('#img_save_ok').css({'opacity': '1'});
			$('#img_save_ok_load, #img_save, #img_save_er').css({'opacity': '0'});
			save_timer = setTimeout(function() {
				$('#img_save').css({'opacity': '1'});
				$('#img_save_ok_load, #img_save_ok, #img_save_er').css({'opacity': '0'});
			}, 2000);
			_fix('sync > ajax > ok');
			localStorage.setItem('sync', 'true');
			localStorage.setItem('color', ''); // color
			sync_count = 0;
			_save_color();
		} else {
			clearTimeout(save_timer);
			$('#img_save_er').css({'opacity': '1'});
			$('#img_save_ok_load, #img_save_ok, #img_save').css({'opacity': '0'});
			save_timer = setTimeout(function() {
				$('#img_save').css({'opacity': '1'});
				$('#img_save_ok_load, #img_save_ok, #img_save_er').css({'opacity': '0'});
			}, 2000);
			sync_count = 0;
			_fix('error > sync > ajax > error');
			if (msg.status) {
				_popup('e_invalid', msg.status);
			} else {
				_popup('e_invalid_session');
			}
		}
		_context_menus();
		_scroller();
	}).fail(function() {
		clearTimeout(save_timer);
		$('#img_save_er').css({'opacity': '1'});
		$('#img_save_ok_load, #img_save_ok, #img_save').css({'opacity': '0'});
		save_timer = setTimeout(function() {
			$('#img_save').css({'opacity': '1'});
			$('#img_save_ok_load, #img_save_ok, #img_save_er').css({'opacity': '0'});
		}, 2000);
		_fix('sync > ajax > fail');
		if (sync_count < 4) {
			_sync();
			return;
		}
		sync_count = 0;
		_popup('e_server_not');
		_context_menus('not');
	});
}


/***
 *     ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗
 *    ██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝
 *    ██║     ███████║█████╗  ██║     █████╔╝ 
 *    ██║     ██╔══██║██╔══╝  ██║     ██╔═██╗ 
 *    ╚██████╗██║  ██║███████╗╚██████╗██║  ██╗
 *     ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝
 */
 // Checkbox выборка имен для списка экспорта
function _check() {
	var check = '';
	var arr = '';
	var cont_key = _chrome_i18n("name_list");
	_fix('_check');
	cont = JSON.parse(localStorage.getItem('seria'));
	for (var key in cont) {
		arr = cont[key].substr(0,70);
		if (arr == '') { arr = cont_key; }
		check += '<div><input type="checkbox" class="checkbox chb" id="ch_' + key + '" name_id="' + arr + '"/>' +
		'<label for="ch_' + key + '">' + arr + '</label></div>';
	}
	data_a = '';
	$(".export_list_div").html('');
	$(".export_list_div").append(check);
	$(".expo_nano").nanoScroller();
}


/***
 *    ██████╗  ██████╗ ██████╗ ██╗   ██╗██████╗     ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗
 *    ██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔══██╗    ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝
 *    ██████╔╝██║   ██║██████╔╝██║   ██║██████╔╝    ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  
 *    ██╔═══╝ ██║   ██║██╔═══╝ ██║   ██║██╔═══╝     ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  
 *    ██║     ╚██████╔╝██║     ╚██████╔╝██║         ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗
 *    ╚═╝      ╚═════╝ ╚═╝      ╚═════╝ ╚═╝         ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 */
 // Сообщение popup
var popup_timer = '';
function _popup(e, t) {
	clearTimeout(popup_timer);
	if (e) {
		if (e !== 'i') {
			// $('.message_div').html(e);
			if (t) {
				$('.message_div').html(_chrome_i18n(e, t));
			} else {
				$('.message_div').html(_chrome_i18n(e));
			}
		} else {
			$('.message_div').html(t);
		}
	} else {
		$('.message_div').html(_chrome_i18n('e_error'));
	}
	var doc_w = $(document).width();
	var mes_w = $('#message').width()+120;
	var left_w = (doc_w-mes_w)/2;
	$('.message').css({'left': left_w, 'opacity': '1'});
	popup_timer = setTimeout(function() {
		$('.message').css({'left': '-2300px', 'opacity': '0'});
		$('.message_div').val('');
	}, 3000);
}


/***
 *    ███╗   ███╗███████╗ ██████╗      ██████╗██╗      ██████╗ ███████╗███████╗
 *    ████╗ ████║██╔════╝██╔════╝     ██╔════╝██║     ██╔═══██╗██╔════╝██╔════╝
 *    ██╔████╔██║███████╗██║  ███╗    ██║     ██║     ██║   ██║███████╗█████╗  
 *    ██║╚██╔╝██║╚════██║██║   ██║    ██║     ██║     ██║   ██║╚════██║██╔══╝  
 *    ██║ ╚═╝ ██║███████║╚██████╔╝    ╚██████╗███████╗╚██████╔╝███████║███████╗
 *    ╚═╝     ╚═╝╚══════╝ ╚═════╝      ╚═════╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝
 */
 // Отправить данные о закрытии строки снизу
function _msg_close() {
	_fix('_msg_close');
	$('.msg_div').css({'display': 'none'});
	$.post(address, {
		method: 'msg_close',
		session: localStorage.getItem('session')
	});
}


/***
 *    ███╗   ███╗███████╗ ██████╗     ██╗   ██╗██╗███████╗██╗    ██╗
 *    ████╗ ████║██╔════╝██╔════╝     ██║   ██║██║██╔════╝██║    ██║
 *    ██╔████╔██║███████╗██║  ███╗    ██║   ██║██║█████╗  ██║ █╗ ██║
 *    ██║╚██╔╝██║╚════██║██║   ██║    ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
 *    ██║ ╚═╝ ██║███████║╚██████╔╝     ╚████╔╝ ██║███████╗╚███╔███╔╝
 *    ╚═╝     ╚═╝╚══════╝ ╚═════╝       ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ 
 */
 // Показывать блок информации снизу
function _msg_view() {
	_fix('_msg_view');
	$.ajax({
		url: address,
		dataType: "json",
		async: true,
		type: "POST",
		data: {
			method: 'view',
			user_id: localStorage.getItem('user_id'),
			locale: localStorage.getItem('language')
		}
	}).done(function(msg) {
		if (msg.result == 'ok') {
			_fix('_msg_view > ajax > ok');
			if (msg.different == 1) {
				$('.msg_view').html(msg.view);
				$('.msg_div').css({'display': 'table'});
				_fix('_msg_view > ajax > ok > if');
			} else {
				$('.msg_div').css({'display': 'none'});
				_fix('_msg_view > ajax > ok > else');
			}
		} else {
			_fix('error > _msg_view > ajax');
			$('.msg_div').css({'display': 'none'});
		}
	}).fail(function() {
		_fix('error > _msg_view > fail');
		$('.msg_div').css({'display': 'none'});
	});

}


/***
 *    ███████╗ █████╗ ██╗   ██╗███████╗     ██████╗ ██████╗ ██╗      ██████╗ ██████╗ 
 *    ██╔════╝██╔══██╗██║   ██║██╔════╝    ██╔════╝██╔═══██╗██║     ██╔═══██╗██╔══██╗
 *    ███████╗███████║██║   ██║█████╗      ██║     ██║   ██║██║     ██║   ██║██████╔╝
 *    ╚════██║██╔══██║╚██╗ ██╔╝██╔══╝      ██║     ██║   ██║██║     ██║   ██║██╔══██╗
 *    ███████║██║  ██║ ╚████╔╝ ███████╗    ╚██████╗╚██████╔╝███████╗╚██████╔╝██║  ██║
 *    ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝     ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝
 */
 // Изменить цвет 'save' кнопки при изменении
function _save_color(active) {
	_fix('_save_color');
	var count = 0;
	if (typeof localStorage.getItem('color') !== "undefined" && localStorage.getItem('color') !== null) {
		if (localStorage.getItem('color')) {
			var arr = localStorage.getItem('color').split(',');
			for (var key in arr) {
				if (arr[key] != '' && arr[key] !== null) {
					count++;
					$('#'+arr[key]).prev().prev().css({'borderLeft': '2px solid rgba(185, 0, 0, 0.3)'});
				}
			}
			if (count == 0) {
				$('#a_sync').removeClass('a_sync_red');
				$('.submit_color').css({'borderLeft': '2px solid rgba(0, 0, 0, 0)'});
				return;
			}
			if (localStorage.getItem('sync') == 'true') {
				$('#a_sync').removeClass('a_sync_red');
				$('.submit_color').css({'borderLeft': '2px solid rgba(0, 0, 0, 0)'});
			} else {
				$('#a_sync').addClass('a_sync_red');
			}
		} else {
			localStorage.setItem('color', ',');
			$('#a_sync').removeClass('a_sync_red');
			$('.submit_color').css({'borderLeft': '2px solid rgba(0, 0, 0, 0)'});
		}
	} else {
		localStorage.setItem('color', ',');
	}
}


/***
 *    ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗
 *    ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
 *    ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   
 *    ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   
 *    ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   
 *    ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
 */
 //import
var upload_count = 0;
function _upload(name_upload, text_upload) {
	_fix('_upload');
	_popup('upload_go');
	upload_count += 1;
	$.ajax({
		beforeSend: function() {
			$('.load').css({'marginLeft': '0px', 'opacity': '1'});
		},
		complete: function() {
			$('.load').css({'marginLeft': '-100%', 'opacity': '0'});
		},
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'upload',
			session: localStorage.getItem('session'),
			user_id: localStorage.getItem('user_id'),
			name: name_upload,
			text: text_upload
		}
	}).done(function(msg) {
		if (msg.result == 'ok') {
			_fix('_upload > ajax > ok');
			cont = JSON.parse(localStorage.getItem('contents'));
			cont[msg.seria] = text_upload;
			localStorage.setItem('contents', JSON.stringify(cont));

			ser = JSON.parse(localStorage.getItem('seria'));
			ser[msg.seria] = name_upload;
			localStorage.setItem('seria', JSON.stringify(ser));
			upload_count = 0;

			var d_up = [];
			d_up = JSON.parse(localStorage.getItem('sort'));
			d_up[JSON.parse(localStorage.getItem('sort')).length] = msg.seria;
			localStorage.setItem('sort', JSON.stringify(d_up));
			_json_contents();
			_popup('upload_ok');
		} else {
			_fix('error > _upload > ajax');
			upload_count = 0;
			if (msg.status) {
				_popup('e_incorrect', msg.status);
			} else {
				_popup('e_not_email_or_pass');
			}
		}
		_context_menus();
		_scroller();
	}).fail(function() {
		_fix('error > _upload > fail');
		if (upload_count < 5) {
			clearTimeout(popup_timer);
			$('.message_div').html('Попытки: ('+upload_count+'/5)<br/>'+_chrome_i18n('e_file_choose'));
			var doc_w = $(document).width();
			var mes_w = $('#message').width()+120;
			var left_w = (doc_w-mes_w)/2;
			$('.message').css({'left': left_w, 'opacity': '1'});
			popup_timer = setTimeout(function() {
				$('.message').css({'left': '-2300px', 'opacity': '0'});
				$('.message_div').val('');
			}, 10000);
			_upload(name_upload, text_upload);
			return;
		}
		upload_count = 0;
		_popup('e_file_no');
	});
}


/***
 *    ███████╗ ██████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ 
 *    ██╔════╝██╔════╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗
 *    ███████╗██║     ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝
 *    ╚════██║██║     ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗
 *    ███████║╚██████╗██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║
 *    ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝
 */
 // Заполняем массив с scroller (прокруткой)
function _scroller(del) {
	_fix('_scroller');
	cont = JSON.parse(localStorage.getItem('seria'));
	if (del) {
		var arr = localStorage.getItem('scroller').split(',');
		for (var y in arr) {
			if (y == 0) { continue; }
			search = false;
			if (arr[y] == '') { continue; }
			for (var k in cont) {
				if (k == arr[y].split(':')[0]) {
					search = true;
				} else {
					continue;
				}
			}
			if (!search) {
				arr.splice(y, 1);
			}
		}
		localStorage.setItem('scroller', arr.join(','));
	} else {
		if (localStorage.getItem('scroller')) {
			var arr = localStorage.getItem('scroller').split(',');
			for (var k in cont) {
				search = false;
				for (var y in arr) {
					if (arr[y] == '') { continue; }
					if (k == arr[y].split(':')[0]) {
						search = true;
						break;
					} else {
						search = false;
					}
				}
				if (search == false) {
					localStorage.setItem('scroller', localStorage.getItem('scroller')+','+k+':0');
				}
			}
		} else {
			localStorage.setItem('scroller', '');
			for (var key in cont) {
				localStorage.setItem('scroller', localStorage.getItem('scroller')+','+key+':0');
			}
		}
	}
}


/***
 *    ███████╗ ██████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗     ████████╗███████╗██╗  ██╗████████╗ █████╗ ██████╗ ███████╗ █████╗ 
 *    ██╔════╝██╔════╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗    ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
 *    ███████╗██║     ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝       ██║   █████╗   ╚███╔╝    ██║   ███████║██████╔╝█████╗  ███████║
 *    ╚════██║██║     ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗       ██║   ██╔══╝   ██╔██╗    ██║   ██╔══██║██╔══██╗██╔══╝  ██╔══██║
 *    ███████║╚██████╗██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║       ██║   ███████╗██╔╝ ██╗   ██║   ██║  ██║██║  ██║███████╗██║  ██║
 *    ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝       ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
 */
 // Изменяем положение прокрутки скролла
function _scroller_textarea(scroll_textarea) {
	var arr = localStorage.getItem('scroller').split(',');
	for (var y in arr) {
		if (y == 0) { continue; }
		scroll_split = arr[y].split(':');
		if (localStorage.getItem('active') == scroll_split[0]) {
			scroll_split[1] = scroll_textarea;
			arr[y] = scroll_split.join(':');
		}
	}
	localStorage.setItem('scroller', arr.join(','));
}


/***
 *    ███████╗ ██████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗     ██╗   ██╗██╗███████╗██╗    ██╗
 *    ██╔════╝██╔════╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗    ██║   ██║██║██╔════╝██║    ██║
 *    ███████╗██║     ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝    ██║   ██║██║█████╗  ██║ █╗ ██║
 *    ╚════██║██║     ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗    ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
 *    ███████║╚██████╗██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║     ╚████╔╝ ██║███████╗╚███╔███╔╝
 *    ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝      ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ 
 */
 // Получить значение прокрутки скролла
function _scroller_view() {
	_fix('_scroller_view');
	localStorage.getItem('active');
	scroll_textarea = $(".textarea").scrollTop();

	var arr = localStorage.getItem('scroller').split(',');
	for (var y in arr) {
		if (y == 0) { continue; }
		if (localStorage.getItem('active') == arr[y].split(':')[0]) {
			$(".textarea").scrollTop(arr[y].split(':')[1]);
		}
	}
}


/***
 *    ███████╗ █████╗ ██╗   ██╗███████╗     ██████╗████████╗██████╗ ██╗            ██╗        ███████╗
 *    ██╔════╝██╔══██╗██║   ██║██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗██║            ██║        ██╔════╝
 *    ███████╗███████║██║   ██║█████╗      ██║        ██║   ██████╔╝██║        ██████████╗    ███████╗
 *    ╚════██║██╔══██║╚██╗ ██╔╝██╔══╝      ██║        ██║   ██╔══██╗██║        ╚═══██╔═══╝    ╚════██║
 *    ███████║██║  ██║ ╚████╔╝ ███████╗    ╚██████╗   ██║   ██║  ██║███████╗       ██║        ███████║
 *    ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝     ╚═════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝       ╚═╝        ╚══════╝
 */
 // Сохранение с помощью Ctrl+s
var isCtrl = false;
$(document).keyup(function (e) {
	if(e.which == 17) {
		isCtrl = false;
	}
}).keydown(function (e) {
	if(e.which == 17) {
		isCtrl = true;
	}
	if(e.which == 83 && isCtrl == true) {
		$('#a_sync').click();
		return false;
	}
});


/***
 *    ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
 *    ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
 *    ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
 *    ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
 *    ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 */
// Открытые сессии
function _session() {
	_fix('_session');
	$.ajax({
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'session',
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session')
		}
	}).done(function(msg) {
		$('#pass').val('');
		if (msg.result == 'ok') {
			_fix('_session > ajax > ok');
			var not_defined = _chrome_i18n('session_not_defined');
			var time_tmp1 = not_defined, time_tmp2 = not_defined;
			var go = '<div class="session_div_title"><div>№</div><div>'+_chrome_i18n('session_delete')+'</div>'+
					'<div>'+_chrome_i18n('session_create')+'</div>'+
					'<div>'+_chrome_i18n('session_last')+'</div><div>ip</div></div>';
			for (var key in msg.data) {
				ses = msg.data[key].split(':')[0];
				if (ses == localStorage.getItem('session')) {
					ses = '';
				} else {
					ses = '<input class="session_input" type="checkbox" id="ses_'+ses+'">';
				}
				t1 = msg.data[key].split(':')[1];
				t2 = msg.data[key].split(':')[2];
				ip = msg.data[key].split(':')[3];
				if (t1 == 0) { time_tmp1 = not_defined; } else {
					time_tmp1 = new Date(+t1 * 1000);
					time_tmp1 = ('0' + time_tmp1.getHours()).slice(-2)+':'+
					('0' + time_tmp1.getMinutes()).slice(-2)+':'+
					('0' + time_tmp1.getSeconds()).slice(-2)+' '+
					('0' + time_tmp1.getDate()).slice(-2)+'.'+
					('0' + (time_tmp1.getMonth() + 1)).slice(-2)+'.'+
					time_tmp1.getFullYear();
				}
				if (t2 == 0) { time_tmp2 = not_defined; } else {
					time_tmp2 = new Date(+t2 * 1000);
					time_tmp2 = ('0' + time_tmp2.getHours()).slice(-2)+':'+
					('0' + time_tmp2.getMinutes()).slice(-2)+':'+
					('0' + time_tmp2.getSeconds()).slice(-2)+' '+
					('0' + time_tmp2.getDate()).slice(-2)+'.'+
					('0' + (time_tmp2.getMonth() + 1)).slice(-2)+'.'+
					time_tmp2.getFullYear();
				}
				if (ip == 'null') { ip = not_defined; }
				go = go + '<div class="session_div_line"><div>'+(+key+1)+'</div><div>'+ses+'</div><div>'+time_tmp1+'</div><div>'+time_tmp2+'</div><div>'+ip+'</div></div>';
			}
			$('.session_div_table').html(go);
			$(".session_text_div").nanoScroller();
		} else {
			_fix('error > _session > ajax');
		}
	}).fail(function() {
		_fix('error > _session > fail');
		_popup('e_server_not');
	});
}


/***
 *    ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗    ██╗  ██╗██╗██╗     ██╗         ███████╗███████╗██╗     ███████╗ ██████╗████████╗
 *    ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║    ██║ ██╔╝██║██║     ██║         ██╔════╝██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝
 *    ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║    █████╔╝ ██║██║     ██║         ███████╗█████╗  ██║     █████╗  ██║        ██║   
 *    ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║    ██╔═██╗ ██║██║     ██║         ╚════██║██╔══╝  ██║     ██╔══╝  ██║        ██║   
 *    ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║    ██║  ██╗██║███████╗███████╗    ███████║███████╗███████╗███████╗╚██████╗   ██║   
 *    ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   
*/
 // Удалить выделенные сессии
function _session_kill_select() {
	_fix('_session_kill_select');
	$.ajax({
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'session_delete',
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session'),
			data: data_ses
		}
	}).done(function(msg) {
		if (msg.result == 'ok') {
			_fix('session_kill_select > ajax > ok');
			$('#p_list_string_session').click();
		} else {
			_fix('error > session_kill_select > ajax');
		}
	}).fail(function() {
		_fix('error > session_kill_select > fail');
		_popup('e_server_not');
	});
	data_ses = '';
	$(".session_input").prop('checked', false);
}


/***
 *    ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗    ██╗  ██╗██╗██╗     ██╗          █████╗ ██╗     ██╗     
 *    ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║    ██║ ██╔╝██║██║     ██║         ██╔══██╗██║     ██║     
 *    ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║    █████╔╝ ██║██║     ██║         ███████║██║     ██║     
 *    ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║    ██╔═██╗ ██║██║     ██║         ██╔══██║██║     ██║     
 *    ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║    ██║  ██╗██║███████╗███████╗    ██║  ██║███████╗███████╗
 *    ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝    ╚═╝  ╚═╝╚══════╝╚══════╝
 */
 // Удалить все сессии, кроме текущей
function _session_kill_all() {
	_fix('_session_kill_all');
	$.ajax({
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'session_delete_all',
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session')
		}
	}).done(function(msg) {
		if (msg.result == 'ok') {
			_fix('session_kill_all > ajax > ok');
			$('#p_list_string_session').click();
		} else {
			_fix('error > session_kill_all > ajax');
		}
	}).fail(function() {
		_fix('error > session_kill_all > fail');
		_popup('e_server_not');
	});
}


/***
 *    ███████╗██╗██╗  ██╗     ██████╗ ██████╗ ███╗   ██╗███████╗ ██████╗ ██╗     ███████╗     ██╗      ██████╗  ██████╗ 
 *    ██╔════╝██║╚██╗██╔╝    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██╔═══██╗██║     ██╔════╝     ██║     ██╔═══██╗██╔════╝ 
 *    █████╗  ██║ ╚███╔╝     ██║     ██║   ██║██╔██╗ ██║███████╗██║   ██║██║     █████╗       ██║     ██║   ██║██║  ███╗
 *    ██╔══╝  ██║ ██╔██╗     ██║     ██║   ██║██║╚██╗██║╚════██║██║   ██║██║     ██╔══╝       ██║     ██║   ██║██║   ██║
 *    ██║     ██║██╔╝ ██╗    ╚██████╗╚██████╔╝██║ ╚████║███████║╚██████╔╝███████╗███████╗ ██╗ ███████╗╚██████╔╝╚██████╔╝
 *    ╚═╝     ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝ ╚═╝ ╚══════╝ ╚═════╝  ╚═════╝ 
 */
 // Ошибка
function _fix(err) {
	let err_tmp = (err) ? err : '_fix';
	// console.log(err);
}





/***
 *    bbbbbbbb                                                                                                                          
 *    b::::::b                                     tttt               tttt                                                              
 *    b::::::b                                  ttt:::t            ttt:::t                                                              
 *    b::::::b                                  t:::::t            t:::::t                                                              
 *     b:::::b                                  t:::::t            t:::::t                                                              
 *     b:::::bbbbbbbbb    uuuuuu    uuuuuuttttttt:::::tttttttttttttt:::::ttttttt       ooooooooooo   nnnn  nnnnnnnn        ssssssssss   
 *     b::::::::::::::bb  u::::u    u::::ut:::::::::::::::::tt:::::::::::::::::t     oo:::::::::::oo n:::nn::::::::nn    ss::::::::::s  
 *     b::::::::::::::::b u::::u    u::::ut:::::::::::::::::tt:::::::::::::::::t    o:::::::::::::::on::::::::::::::nn ss:::::::::::::s 
 *     b:::::bbbbb:::::::bu::::u    u::::utttttt:::::::tttttttttttt:::::::tttttt    o:::::ooooo:::::onn:::::::::::::::ns::::::ssss:::::s
 *     b:::::b    b::::::bu::::u    u::::u      t:::::t            t:::::t          o::::o     o::::o  n:::::nnnn:::::n s:::::s  ssssss 
 *     b:::::b     b:::::bu::::u    u::::u      t:::::t            t:::::t          o::::o     o::::o  n::::n    n::::n   s::::::s      
 *     b:::::b     b:::::bu::::u    u::::u      t:::::t            t:::::t          o::::o     o::::o  n::::n    n::::n      s::::::s   
 *     b:::::b     b:::::bu:::::uuuu:::::u      t:::::t    tttttt  t:::::t    tttttto::::o     o::::o  n::::n    n::::nssssss   s:::::s 
 *     b:::::bbbbbb::::::bu:::::::::::::::uu    t::::::tttt:::::t  t::::::tttt:::::to:::::ooooo:::::o  n::::n    n::::ns:::::ssss::::::s
 *     b::::::::::::::::b  u:::::::::::::::u    tt::::::::::::::t  tt::::::::::::::to:::::::::::::::o  n::::n    n::::ns::::::::::::::s 
 *     b:::::::::::::::b    uu::::::::uu:::u      tt:::::::::::tt    tt:::::::::::tt oo:::::::::::oo   n::::n    n::::n s:::::::::::ss  
 *     bbbbbbbbbbbbbbbb       uuuuuuuu  uuuu        ttttttttttt        ttttttttttt     ooooooooooo     nnnnnn    nnnnnn  sssssssssss    
 */





 // Изменение высоты textarea и сохренение значения
function _size_texarea() {
	if (location.pathname.includes('index')) {
		var h = 300;
		if (localStorage.getItem('height')) {
			if (localStorage.getItem('height') > 600) {
				h = 600;
			} else if (localStorage.getItem('height') < 300) {
				h = 300;
			} else {
				h = localStorage.getItem('height');
			}
		}
		$('body').css({'height': +h + 'px'});
		$('.panel_div').css({'height': +h-82 + 'px'});
		// $('.textarea').css({'height': +h-100+16 + 'px'});
		$('.textarea_resize').css({'top': +h-14 + 'px', 'width': +settings_width+16+'px'}); // Положение полоски resize
		$('.tab_conteiner').css({'height': +h-72 + 'px'});
		// $('.jqte_editor').css({'height': +h-140 + 'px'});
		// $('.jqte_source').css({'height': +h-120 + 'px'});
	} else {
		$('.textarea_size, .textarea_resize').css({'display': 'none'});
		$('.tab_conteiner').css({'height': 'calc(100vh - 72px)'});
		$('.p_conteiner').css({'width': 'auto'});
		$('.panel_div').css({'height': 'calc(100vh - 80px)'});
		// $('textarea').css({'height': 'calc(100vh - 80px)'});
		$('#loc_save').css({'display': 'none'});
		// $('.seria').css({'width': 'calc(100% - 48px)'});
		if (localStorage.getItem('settings_list') == 1) {
			$('.new_right_block').css({'width': 'calc(100% - 15px)'});
		} else {
			$('.new_right_block').css({'width': 'calc(100% - 195px)'});
		}
		if (localStorage.getItem('settings_edit') == 1) {
			// $('body').css({'min-width': '700px'});
			// $('.jqte_editor, .jqte_source').css({'max-height': 'calc(100vh - 152px)','min-height': 'calc(100vh - 152px)'});
		} else {
			// $('.textarea').css({'width': '100%', 'min-width': 'auto', 'box-sizing': 'border-box'});
		}
	}
}
_size_texarea();


/***
 *    ██████╗ ███████╗███████╗██╗███████╗███████╗    ████████╗███████╗██╗  ██╗████████╗ █████╗ ██████╗ ███████╗ █████╗ 
 *    ██╔══██╗██╔════╝██╔════╝██║╚══███╔╝██╔════╝    ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
 *    ██████╔╝█████╗  ███████╗██║  ███╔╝ █████╗         ██║   █████╗   ╚███╔╝    ██║   ███████║██████╔╝█████╗  ███████║
 *    ██╔══██╗██╔══╝  ╚════██║██║ ███╔╝  ██╔══╝         ██║   ██╔══╝   ██╔██╗    ██║   ██╔══██║██╔══██╗██╔══╝  ██╔══██║
 *    ██║  ██║███████╗███████║██║███████╗███████╗       ██║   ███████╗██╔╝ ██╗   ██║   ██║  ██║██║  ██║███████╗██║  ██║
 *    ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚══════╝╚══════╝       ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
 */
 // resize textarea
$('.textarea_resize').mousedown(function(e) {
	_fix('click > resize');
	$('body').css({'-webkit-user-select':'none','user-select':'none','-khtml-user-select':'none','cursor':'s-resize'}); // Запрет выделения
	$('.textarea_resize').addClass('act'); // Помечаем начало движения, добавлением класса
	$(window).mousemove(function(event) {
		if ($('.textarea_resize').hasClass('act')) { // Если не отпустили мышь
			var pos = event.clientY; // Позиция курсора
			if (pos < 285) {
				text_h = 300;
				$('.textarea_resize').removeClass('act'); // Помечаем конец движения, удалением класса
			} else if (pos > 585) {
				text_h = 592;
				$('.textarea_resize').removeClass('act'); // Помечаем конец движения, удалением класса
			} else {
				text_h = +pos+14;
			}
			$('body').css({'height': +text_h + 'px'});
			$('.panel_div').css({'height': +text_h-82 + 'px'});
			// $('.textarea').css({'height': +text_h-100+16 + 'px'});
			$('.textarea_resize').css({'top': +text_h-14 + 'px'});
			$('.tab_conteiner').css({'height': +text_h-72 + 'px'});
			$('.jqte_editor').css({'height': +text_h-140 + 'px'});
			$('.jqte_source').css({'height': +text_h-120 + 'px'});
			localStorage.setItem('height', text_h);
		} else {
			$('body').css({'-ms-user-select':'','-webkit-user-select':'','user-select':'','cursor':'default'}); // Запрет выделения, изменяем курсор
		}
	});
}).mouseup(function(){
	$('body').css({'-ms-user-select':'','-webkit-user-select':'','user-select':'','cursor':'default'}); // Запрет выделения, изменяем курсор
	$('.textarea_resize').removeClass('act'); // Помечаем конец движения, удалением класса
});

 // Отслеживать изменение поля textarea
$('textarea, .jqte_editor').keyup(function() {
	_fix('touch_textarea');
	_swap_contents_function(editor);
});
 // Отслеживать изменение поля textarea
function _swap_contents_function(editor) {
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_swap_contents(editor);
	} else {
		_swap_contents_off(editor);
	}
}


/***
 *     ██████╗ ██████╗ ██████╗ ██╗   ██╗     ██████╗  █████╗ ███████╗████████╗███████╗         ██████╗██╗   ██╗████████╗
 *    ██╔════╝██╔═══██╗██╔══██╗╚██╗ ██╔╝     ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝        ██╔════╝██║   ██║╚══██╔══╝
 *    ██║     ██║   ██║██████╔╝ ╚████╔╝      ██████╔╝███████║███████╗   ██║   █████╗          ██║     ██║   ██║   ██║   
 *    ██║     ██║   ██║██╔═══╝   ╚██╔╝       ██╔═══╝ ██╔══██║╚════██║   ██║   ██╔══╝          ██║     ██║   ██║   ██║   
 *    ╚██████╗╚██████╔╝██║        ██║▄█╗     ██║     ██║  ██║███████║   ██║   ███████╗▄█╗     ╚██████╗╚██████╔╝   ██║   
 *     ╚═════╝ ╚═════╝ ╚═╝        ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝      ╚═════╝ ╚═════╝    ╚═╝   
 */
 // copy, paste, cut
var copy_count = 0;
var timerId;
$('textarea, .jqte_editor').on({
	paste: function(){
		_copy_count();
	},
	cut: function(){
		_copy_count();
	}
});
function _copy_count() {
	copy_count = 0;
	clearInterval(timerId);
	timerId = setInterval(function() {
		if (copy_count >= 2) {
			copy_count = 0;
			clearInterval(timerId);
		} else {
			copy_count++;
			_swap_contents_function(editor);
		}
	}, 20);
}


 // Отслеживать изменение seria
$('.seria').keyup(function() {
	_fix('touch_seria');
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_swap_seria();
	} else {
		_swap_seria_off();
	}
	_bold();
});

 // Нажали на Online
$('.choice > div').click(function() {
	if ($(this).hasClass('choice_on')) {
		_start_on();
	} else {
		_start_off();
	}
	_choice_off('-50%');
	$('.choice').fadeOut('slow');
})

 // Нажали на "Выбрать другую версию"
$('.choce_prev').click(function() {
	$('body').addClass('body_width');
	_choice_off('0%');
	$('.choice').fadeIn('slow');
})

 // Закрыть popup
$('.message_close, .about_prog_bg, .upload_div_no, .delete_div_no, .exit_div_no').on('click', function() {
	_fix('click > li');
	data_ses = ''; $(".session_input").prop('checked', false); // Удалить из памяти checkbox'ы сессии
	event.preventDefault();
	clearTimeout(popup_timer);
	$('.message, .about_prog, .upload_file_div, .delete_div, .exit_div, .session_div').css({'left': '-2300px', 'opacity': '0'});
	$('.about_prog_bg').css({'display': 'none'});
	$('.message_div, .about_div, #import_input').val('');
});

 // Скрыть/показать блок new_left
function _show_hide_list(e) {
	if (e == 'show') {
		$('.new_left_block').css({'left': '-190px'});
		$('.left_block_slip').css({'backgroundImage': 'url(../img/arrow_right.png)'});
	} else {
		$('.new_left_block').css({'left': '0px'});
		$('.left_block_slip').css({'backgroundImage': 'url(../img/arrow_left.png)'});
	}
}

 // Нажали свернуть left_block_slip_div
$('.left_block_slip_div').click(function() {
	_fix('click > left_block_slip_div');
	if (localStorage.getItem('settings_list_show') == 1) {
		_show_hide_list('hide');
		localStorage.setItem('settings_list_show', 0);
	} else {
		_show_hide_list('show');
		localStorage.setItem('settings_list_show', 1);
	}
});

 // Закрыть msg (строку снизу)
$('.msg_close, .a_msg_view').on('click', function() {
	_fix('click > msg_close');
	$('.msg_div').css({'display': 'none'});
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_msg_close();
	}
});

 // Нажали на лист из списка
$('#tab').on('click', '.notepad_a', function() {
	_fix('click > notepad_a');
	event.preventDefault();
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_return_textarea($(this).attr('id'), 'tab');
	} else {
		_return_textarea_off($(this).attr('id'), 'tab');
	}
	_scroller_view();
	_bold();
});

 // Нажали на создание листа
$('#submit_create').click(function() {
	_fix('click > submit_create');
	$(".new_left_block").removeClass("active_search");
	$(".search_text").text("");
	event.preventDefault();
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_create_note();
	} else {
		_create_note_off();
	}
	_bold();
});

 // Нажали на удаление листа
$('#tab').on('click', '.submit_delete', function() {
	_fix('click > submit_delete');
	$('.delete_div_ok').attr('id', 'del_'+$(this).next().attr('id'));
	$('.about_prog_bg').css({'display': 'block'});
	$('.delete_div').css({'top': '20%', 'left': 'calc(50% - 200px)', 'opacity': '1'});
});

 // Нажатие на кнопку войти
$('#submit_login').click(function() {
	_fix('click > submit_login');
	event.preventDefault();
	if (localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		var email = $("#email").val();
		var password = $("#pass").val();
		// var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var emailReg = /.+@.+\..+/;
		var error_mes = [];
		var er_i = 0;
		if (!email || !emailReg.test(email)) {
			error_mes[er_i++] = 'email';
		}
		if (!password || password.length<6) {
			error_mes[er_i++] = 'password';
		}

		if (er_i > 0) {
			var error_mes_new = '';
			var please = _chrome_i18n('e_please_valid');
			for (var i in error_mes) {
				error_mes_new += '<div>' + please + ' <b>' + error_mes[i] + '</b>.</div>';
			}
			_popup("i", error_mes_new);
		} else {
			localStorage.setItem('email', email);
			_enter(email, password);
		}
	}
});

 // Нажатие на кнопку Регистрация
$('#submit_reg').click(function() {
	_fix('click > submit_reg');
	event.preventDefault();
	if (localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		var username = $("#r_login").val();
		var email = $("#r_email").val();
		var password = $("#r_pass").val();
		// var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var emailReg = /.+@.+\..+/;
		var error_mes = [];
		var er_i = 0;
		if (!username || username.length<3 || username.length>15) {
			error_mes[er_i++] = 'username';
		}
		if (!email || !emailReg.test(email)) {
			error_mes[er_i++] = 'email';
		}
		if (!password || password.length<6 || password.length>64) {
			error_mes[er_i++] = 'password';
		}

		if (er_i > 0) {
			var error_mes_new = '';
			var please = _chrome_i18n('e_please_valid');
			for (var i in error_mes) {
				error_mes_new += '<div>' + please + ' <b>' + error_mes[i] + '</b>.</div>';
			}
			_popup("i", error_mes_new);
		} else {
			_registration(username, password, email);
		}
	}
});

 // Нажатие на ссылку login
$('#a_login').click(function() {
	_fix('click > a_login');
	$('#p_conteiner, #p_registration').css({'display': 'none'});
	$('#p_login').css({'display': 'flex'});
});

 // Нажатие на ссылку registration
$('#a_registration').click(function() {
	_fix('click > a_registration');
	$('#p_conteiner, #p_login').css({'display': 'none'});
	$('#p_registration').css({'display': 'flex'});
});

 // Нажали на кнопку save
$('#a_sync').click(function() {
	_fix('click > a_sync');
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		// _sync();
		_sync_fake();
	}
});


 // Анимация сохранения
var sync_timer;
function _sync_fake() {
	clearTimeout(sync_timer);
	$('#img_save_ok_load').css({'opacity': '1'});
	$('#img_save').css({'opacity': '0'});
	$('#img_save_ok').css({'opacity': '0'});
	$('#img_save_er').css({'opacity': '0'});
	sync_timer = setTimeout(function() {
		$('#img_save_ok_load').css({'opacity': '0'});
		$('#img_save').css({'opacity': '0'});
		$('#img_save_ok').css({'opacity': '1'});
		$('#img_save_er').css({'opacity': '0'});
		$('#a_sync').removeClass('a_sync_red');
		sync_timer = setTimeout(function() {
			$('#img_save_ok_load').css({'opacity': '0'});
			$('#img_save').css({'opacity': '1'});
			$('#img_save_ok').css({'opacity': '0'});
			$('#img_save_er').css({'opacity': '0'});
		}, 3000);
	}, _random(1000, 2000));
}
 // Рандомное число
function _random(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }


 // Нажали на кнопку ДА upload
$('.upload_div_ok').click(function() {
	_fix('click > upload_div_ok');
	$('.upload_div_no').click();
	$('.p_menu_menu_list_bg').click();
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_upload(file_name_half, file_str);
	} else {
		_upload_off(file_name_half, file_str);
	}
	// _popup('upload_go');
	file_name_half = ''; file_str = '';
	$('#import_input').val('');
});

 // Нажали на кнопку ДА delete
$('.delete_div_ok').click(function() {
	_fix('click > delete_div_ok');
	event.preventDefault();
	var id_del = $(this).attr('id').substr(4);	
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_delete_note(id_del);
	} else {
		_delete_note_off(id_del);
	}
	$('.upload_div_no').click();
	_bold();
});

 // Нажали на кнопку ДА exit offline
$('.exit_div_ok').click(function() {
	_fix('click > exit_div_ok');
	if (localStorage.getItem('choice') === 'off') {
		_logout_off();
		$('.about_prog_bg').click();
		$('#textarea').val();
	}
});

 // Нажали на кнопку forget_pass
$('.forget_pass, #p_list_string_pass').click(function() {
	_fix('click > forget_pass or p_list_string_pass');
	window.open(address_site+'/change_password.html');
});

 // scroll textarea
$('.textarea').scroll(function(){
	scroll_textarea = $(".textarea").scrollTop();
	scroll_textarea = Math.floor(scroll_textarea);
	_scroller_textarea(scroll_textarea);
});

 // Нажатие на checkbox'ы session
var data_ses = '';
$('body').on('click', '.session_input', function() {
	_fix('click > session_input');

	var i = 0;
	var array_ses = [];
	data_ses = '';
	$('.session_div_in input:checkbox:checked').each(function(e){
		array_ses[e] = $(this).prop('id');
		i++;
	});
	if (i > 0) {
		for (var k in array_ses) {
			data_ses = array_ses[k].substr(4)+','+data_ses;
		}
	}
});

 // Нажали на кнопку Session kill select
document.getElementById('session_kill_select').onclick = function() {
	_fix('click > session_kill_select');	
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		if (data_ses !== '') {
			_session_kill_select();
		}
	}
};

 // Нажали на кнопку Session kill all
document.getElementById('session_kill_all').onclick = function() {
	_fix('click > session_kill_all');	
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_session_kill_all();
	}
};




/***
 *         MMMMMMMM               MMMMMMMM     EEEEEEEEEEEEEEEEEEEEEE     NNNNNNNN        NNNNNNNN     UUUUUUUU     UUUUUUUU
 *         M:::::::M             M:::::::M     E::::::::::::::::::::E     N:::::::N       N::::::N     U::::::U     U::::::U
 *         M::::::::M           M::::::::M     E::::::::::::::::::::E     N::::::::N      N::::::N     U::::::U     U::::::U
 *         M:::::::::M         M:::::::::M     EE::::::EEEEEEEEE::::E     N:::::::::N     N::::::N     UU:::::U     U:::::UU
 *         M::::::::::M       M::::::::::M       E:::::E       EEEEEE     N::::::::::N    N::::::N      U:::::U     U:::::U 
 *         M:::::::::::M     M:::::::::::M       E:::::E                  N:::::::::::N   N::::::N      U:::::D     D:::::U 
 *         M:::::::M::::M   M::::M:::::::M       E::::::EEEEEEEEEE        N:::::::N::::N  N::::::N      U:::::D     D:::::U 
 *         M::::::M M::::M M::::M M::::::M       E:::::::::::::::E        N::::::N N::::N N::::::N      U:::::D     D:::::U 
 *         M::::::M  M::::M::::M  M::::::M       E:::::::::::::::E        N::::::N  N::::N:::::::N      U:::::D     D:::::U 
 *         M::::::M   M:::::::M   M::::::M       E::::::EEEEEEEEEE        N::::::N   N:::::::::::N      U:::::D     D:::::U 
 *         M::::::M    M:::::M    M::::::M       E:::::E                  N::::::N    N::::::::::N      U:::::D     D:::::U 
 *         M::::::M     MMMMM     M::::::M       E:::::E       EEEEEE     N::::::N     N:::::::::N      U::::::U   U::::::U 
 *         M::::::M               M::::::M     EE::::::EEEEEEEE:::::E     N::::::N      N::::::::N      U:::::::UUU:::::::U 
 *         M::::::M               M::::::M     E::::::::::::::::::::E     N::::::N       N:::::::N       UU:::::::::::::UU  
 *         M::::::M               M::::::M     E::::::::::::::::::::E     N::::::N        N::::::N         UU:::::::::UU    
 *         MMMMMMMM               MMMMMMMM     EEEEEEEEEEEEEEEEEEEEEE     NNNNNNNN         NNNNNNN           UUUUUUUUU      
 */




 // Нажатие на logout
$('body').on('click', '#p_list_string_logout', function() {
	_fix('click > p_list_string_logout');
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_logout(localStorage.getItem('session'), localStorage.getItem('user_id'));
	} else {
		$('.about_prog_bg').css({'display': 'block'});
		$('.exit_div').css({'top': '20%', 'left': 'calc(50% - 200px)', 'opacity': '1'});
	}
});

 // Нажатие на Settings
$('#p_list_string_settings').click(function() {
	_fix('click > p_list_string_settings');
	window.open('../options.html',' _blank');
	return false;
});

 // Нажатие на About
$('#p_list_string_about').click(function() {
	_fix('click > p_list_string_about');
	// Определение/изменяем размера окна для about
	var he = $(window).height() * 0.72;
	var we = $(window).width();
	var we_mes = $('#about_prog').width()+40;
	var we_res = (we-we_mes)/2;
	// $('.about_div').css({'height': he+'px'});
	$(window).resize(function() {
		he = $(window).height() * 0.72;
		// $('.about_div').css({'height': he+'px'});
	});
	// Выбираем файл в соответствии с языком
	if (localStorage.getItem('language')) {
		lng = localStorage.getItem('language').substr(0,2);
		if (lng_array.indexOf(localStorage.getItem('language')) == -1) {
			lng = 'en';
		}
	} else {
		lng = 'en';
	}
	$.post('about/about_' + lng + '.txt', function(msg) {
		$('.about_div_div').html(msg);
		$('.about_prog_bg').css({'display': 'block'});
		$('.about_prog').css({'top': '8%', 'left': '10%', 'opacity': '1'});
		$(".nano_about").nanoScroller();
	});
});

 // Показали на star
$('#p_list_string_star').hover(function() {
	$(this).children().children('.p_list_img').css({'background-color': '#ffeb00', 'borderRadius': '50%', 'box-shadow': '0px 0px 12px 0px #6d6d6d'});
},function() {
	$(this).children().children('.p_list_img').css({'background-color': 'rgba(255, 255, 255, 0)', 'borderRadius': '0%', 'box-shadow': 'none'});
});

 // Нажили на кнопку donate
$('#p_list_string_donate').click(function() {
	_fix('click > p_list_string_donate');
	window.open(address_site+'/donate.html');
});

 // Нажили на кнопку star
$('#p_list_string_star').click(function() {
	_fix('click > p_list_string_star');
	window.open('https://chrome.google.com/webstore/detail/notepad-online/fefodpegbocmidnfphgggnjcicipaibk/reviews');
});

 // Нажили на кнопку session
$('#p_list_string_session').click(function() {
	_fix('click > p_list_string_session');
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		var he = $(window).height();
		$('.session_div_in').css({'padding': ' 20px 0px 20px 5px'});
		$('.session_div').css({'width': '100%', 'height': '100%', 'top': '0', 'right': '0', 'bottom': '0',
								'left': '0', 'opacity': '1', 'background-color': 'rgb(109, 109, 109)'});
		// $('.session_text_div').css({'height': he-90+'px'});
		_session();
	}
});

 // Нажили на кнопку History
$('#p_list_string_history').click(function() {
	_fix('click > p_list_string_history');
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		window.open(address_site+'/history.html?method=history&user_id='+localStorage.getItem('user_id')+'&session='+localStorage.getItem('session'));
	}
});

 // Нажатие на chechbox'ы экспорта
var data_a = '';
$('body').on('click', '.chb', function() {
	_fix('click > chb');
	// Выделить все checkbox'ы экспорта
	if ($(this).hasClass('check_all_input')) {
		_check_all($(this));
	}

	var i = 0;
	var array_id = [];
	var array_name = [];
	data_a = '';
	$('.export_list input:checkbox:checked').each(function(e){
		i++;
		array_id[e] = $(this).prop('id');
		array_name[e] = $(this).attr('name_id');
	});
	if (i > 0) {
		cont = JSON.parse(localStorage.getItem('contents'));
		for (var j in cont) {
			for (var k in array_id) {
				if (array_id[k].substr(3) == j) {
					if (cont[j] == '') {break;}
					data_a += '\n\n\n############### ' + array_name[k] + ' ###############\n' + cont[j];
					break;
				}
			}
		}
	}
});

 // Замена перехода на новую строку
function _nl2br(s) {
	s = s.split("\u000A").join("\r\n");
	return s;
}
 // Нажали на кнопку Dawnload
document.getElementById('export_btn_a').onclick = function() {
	_fix('click > export_btn_a');
	if (data_a !== '') {
		var text_new = _nl2br(data_a);
		data_a = '';
		var data = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text_new);
		this.href = data;
		this.target = '_blank';
		this.download = 'notepad-online.txt';
		$(".chb").prop('checked', false);
	} else {
		// event.preventDefault();
		$('#export_btn_a').removeAttr('href target download');
	}
};

 // Нажатие на кнопку menu
$('.p_menu_menu').click(function() {
	_fix('click > p_menu_menu');
	$('.p_menu_menu_list_bg').css({'height': '100%', 'opacity': 0.1});
	$('.p_menu_menu_list').css({'top': '-4px', 'opacity': 1, 'visibility': 'visible'});
});
 // Нажатие на p_menu_menu_list_bg
$('.p_menu_menu_list_bg').click(function() {
	_fix('click > p_menu_menu_list_bg');
	$('.p_menu_menu_list_bg').css({'height': '0%', 'opacity': 0});
	$('.p_menu_menu_list').css({'top': '-330px', 'opacity': 0, 'visibility': 'hidden'});
});

 // Нажатие на ссылку export
$('#p_list_string_export').click(function() {
	_fix('click > p_list_string_export');
	$(".checkbox, .check_all_input").prop("checked", false);
	_check();
	$('.export_choose_bg').css({'height': '100%', 'opacity': 0.1});
	$('.export_choose').css({'top': '20px', 'opacity': 1, 'visibility': 'visible'});
});
 // Нажатие на p_list_string_export_bg
$('.export_choose_bg').click(function() {
	_fix('click > export_choose_bg');
	$('.export_choose_bg, .p_menu_menu_list_bg').css({'height': '0%', 'opacity': 0});
	$('.export_choose').css({'top': '-270px', 'opacity': 0, 'visibility': 'hidden'});
	$('.p_menu_menu_list').css({'top': '-330px', 'opacity': 0, 'visibility': 'hidden'});
});

 // Выделение всех checkbox экспорт
function _check_all(e) {
	_fix('click > check_all_input');
	var $checks = '';
	$checks = $(".checkbox");
	$checks.prop('checked', e.prop('checked'));
}

 // Show full text in left_block li
$(".new_left_block .nano-content").on("mouseenter", ".li", function() {
	$(".tab_full").text($(this).children(".notepad_a").text());
	$(".tab_full").css({"display": "block", "top": $(this).offset().top, "color": "var(--color-text-not-active)"});
	if($(this).hasClass("li_strong")) {
		$(".tab_full").css({"font-weight": "500", "color": "var(--color-text-tab_full, #000)"});
	}
}).on("mouseleave", ".li", function() {
	$(".tab_full").css({"display": "none", "font-weight": "400", "color": "var(--color-text-not-active)"});
}).scroll(function() {
	$(".tab_full").css({"display": "none", "font-weight": "400", "color": "var(--color-text-not-active)"});
});


/***
 *    ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗
 *    ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
 *    ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   
 *    ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   
 *    ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   
 *    ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝  
 */
 // Import
var file_str = '';
var file_name_half = '';
$('.file_upload').on('change', 'input[type=file].import_input', function() {
	_fix('click > file_upload');
	var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;
	if (file_api && $(this).val() != ''){
		var file_full = $(this)[0].files[0];
		var arr_type = "text/plain,text/html,text/css,application/javascript";
		arr_type = arr_type.split(',');
		if ($.inArray(file_full.type, arr_type) == -1 || file_full.type == '') {
			_popup('e_file_choose');
			return;
		}
		var file_ok = 0;
		if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
			if (file_full.size > 102400) {
				if (file_full.size > 1048576) {
					_popup('e_file_big');
					return;
				} else {
					file_ok = 1;
					// _popup('e_file_little_big');
				}
			}
		}
		file_name_half = file_full.name.split(".");
		file_name_half.pop();
		file_name_half = file_name_half.join('.');

		var reader = new FileReader();
		reader.readAsText(file_full, 'CP1251');
		reader.onload = function(e) {
			file_str = e.target.result;
			// _fix('>>> '+file_name_half); // Имя файла без расширения
			// _fix('>>> '+file_full.size); // Количество символов
			// _fix('>>> '+file_str); // содержимое файла
			if (file_ok == 1) {
				$('.about_prog_bg').css({'display': 'block'});
				$('.upload_file_div').css({'top': '20%', 'left': 'calc(50% - 200px)', 'opacity': '1'});
			} else {
				$('.upload_div_no').click();
				$('.p_menu_menu_list_bg').click();
				// _popup('upload_go');
					if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
						_upload(file_name_half, file_str);
					} else {
						_upload_off(file_name_half, file_str);
					}
				$('#import_input').val('');
			}
		};
	} else {
		_popup('e_file_not');
		return;
	}
});

/*
 // Определение ip
$('.menu_notepad').click(function() {
	$.getJSON('https://notepad-online.ru/ip_view.php', function(data){
	  _fix('Your ip is: ' +  data.ip);
	});
});
*/

 // Move note list
$.fn.draggable = function(){
	function disableSelection(){
		if (window.getSelection) {window.getSelection().removeAllRanges()} else {document.selection.empty()}
			return false;
	}
	$(".tab").on("mousedown", ".li", function(e){
		var drag = $(this);
		var posParentTop = drag.parent().offset().top;
		var posParentBottom = posParentTop + drag.parent().height();
		var posOld = drag.offset().top;
		var posOldCorrection = e.pageY - posOld;
		var pagY = e.pageY;
		var move_li = false;
		var mouseMove = function(e){
			if(move_li === true) {
				drag.addClass('liActive');
			}
			if(pagY - e.pageY > 5 || pagY - e.pageY < -5 || move_li === true) {
				move_li = true;
				if (e.which==1) {
					var posNew = e.pageY - posOldCorrection;
					if (posNew < posParentTop){
						if (drag.prev().length > 0 ) {
							drag.insertBefore(drag.prev().css({'top':-drag.height()}).animate({'top':0}, 100));
						}
						drag.offset({'top': posParentTop});
					} else if (posNew + drag.height() > posParentBottom){
						if (drag.next().length > 0 ) {
							drag.insertAfter(drag.next().css({'top':drag.height()}).animate({'top':0}, 100));
						}
						drag.offset({'top': posParentBottom - drag.height()});
					} else {
						drag.offset({'top': posNew});
						if (posOld - posNew > drag.height() - 1 + 2){
							drag.insertBefore(drag.prev().css({'top':-drag.height()}).animate({'top':0}, 100));
							drag.css({'top':0});
							posOld = drag.offset().top;
							posOldCorrection = e.pageY - posOld;
						} else if (posNew - posOld > drag.height() - 1 + 2){
							drag.insertAfter(drag.next().css({'top':drag.height()}).animate({'top':0}, 100));
							drag.css({'top':0});
							posOld = drag.offset().top;
							posOldCorrection = e.pageY - posOld;
						}
					}
					$(".tab_full").css({"display": "none", "font-weight": "400", "color": "var(--color-text-not-active)"});
				} else {
					move_li = false;
					mouseUp();
				}
			}
		};
		var mouseUp = function(){
			$(document).off('mousemove', mouseMove).off('mouseup', mouseUp);
			$(document).off('mousedown', disableSelection);
			if (move_li === true) {
				// var sort = '{';
				var sort = [];
				$('.notepad_a').each(function (index) {
					// sort = JSON.parse(localStorage.getItem('sort'));
					// sort[$(this).attr('id')] = index;
					// localStorage.setItem('sort', JSON.stringify(sort));
					sort[index] = $(this).attr('id');
					// sort = sort + '"'+index+'":"'+$(this).attr('id')+'",';

				});
				// sort = sort.slice(0, -1) + '}';
				// localStorage.setItem('sort', sort);
				localStorage.setItem('sort', JSON.stringify(sort));
				localStorage.setItem('sync', 'false');
				$('#a_sync').addClass('a_sync_red');
				// $('#a_sync').css({'backgroundColor': 'var(--color-bg-a_sync, rgba(189, 76, 76, 0.4))', 'borderColor': '#a91515'});
				drag.animate({'top':0}, 100, function(){
					drag.removeClass('liActive');
				});
			}
		};
		$(document).on('mousemove', mouseMove).on('mouseup', mouseUp).on('contextmenu', mouseUp);
		$(document).on('mousedown', disableSelection);
		// $(window).on('blur', mouseUp);
	});
}

$('.tab').draggable();



$('#submit_search').click(function() {
	$(".new_left_block").toggleClass("active_search");
	$(".search_text").text("");
	_search();
});

$('.search_text').keyup(function() {
	_search();
});
var search_count = 0;
var timerId_search;
$('.search_text').on({
	paste: function(){
		_search_count();
	},
	cut: function(){
		_search_count();
	}
});
function _search_count() {
	search_count = 0;
	clearInterval(timerId_search);
	timerId_search = setInterval(function() {
		if (search_count >= 2) {
			search_count = 0;
			clearInterval(timerId_search);
		} else {
			search_count++;
			_search();
		}
	}, 20);
}

function _search() {
	_fix('_search');
	var search_tmp = $(".tab_conteiner .tab li");
	search_tmp.each(function(index) {
		if ($(".search_text").text() != "") {
			if($(this).children(".notepad_a").text().toLowerCase().search($(".search_text").text().toLowerCase()) != -1) {
				$(this).css({"display": "block"});
			} else {
				$(this).css({"display": "none"});
			}
		} else {
			$(this).css({"display": "block"});
		}
	});
	$(".tab_nano").nanoScroller();
}


_start_2();

