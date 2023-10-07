/*
* Online
* Пароль, для защиты Выших данных
* Хранение денных в облаке
* Синхронизация блокнота в другом браузере
* Восстановление удаленых листов
* 
* 
* Offline
* Независимость от интернета
* Без регистрации
* Данные хранятся только на Вашем ПК
* 
*/

console.time('script');

 // Если online/offline
function _start_on_off() {
	_fix('_start_on_off');
	$('body').addClass('body_width');
	$('.choice').show();
	localStorage.setItem('choice', 'none');
}

 // Если offline
function _start_off() {
	_fix('_start_off');
	$('body').removeClass('body_width');
	$('#email').val(localStorage.getItem('email'));
	$('#a_sync, #p_list_string_history, #p_list_string_session, #p_list_string_pass, .p_login, .p_registration, .menu_login_reg').css({'display': 'none'});
	// $('.seria').css({'width': 'calc(100% - 22px)'});
	$('.seria').css({'width': '100%'});
	$('.menu_notepad_online').text('offline');
	localStorage.setItem('choice', 'off');
	localStorage.setItem('sync', 'true');
	localStorage.setItem('email', 'offline');
	localStorage.setItem('login', _chrome_i18n("lord"));
	_load_contents_off();
}

 // if this old version without sort
function _old_version() {
	var bool_i = false;
	var sss_d = [];
	var sss = JSON.parse(localStorage.getItem('seria'));
	var sortsort = (localStorage.getItem('sort')) ? JSON.parse(localStorage.getItem('sort')) : [];
	var sss_i = 0;
	for (var tmp_sss in sortsort) {
		sss_d[sss_i++] = sortsort[tmp_sss];
	}
	for (var sss_key in sss) {
		for (var sortsort_key in sortsort) {
			if (sss_key == sortsort[sortsort_key]) {
				bool_i = true;
			}
		}
		if (bool_i === false) {
			sss_d[sss_i] = sss_key;
			localStorage.setItem('sort', JSON.stringify(sss_d));
			sss_i++;
		}
		bool_i = false;
	}
}

 // Отправка и получение данных с сервера > second
function _load_contents_off() {
	_fix('_load_contents_off');
	$('.menu_hello, .p_menu_menu, .maximize').css({'display': 'inline-block'});
	$('#p_conteiner').css({'display': 'block'});
	$('#a_hello').text(localStorage.getItem('login'));
	$(".menu_email > div").text(localStorage.getItem('email'));
	var seria_offline = parseInt(new Date().getTime()/1000) + '_' + _gen(5);

	if (localStorage.getItem('seria') == "undefined" || localStorage.getItem('seria') === null) {
		localStorage.setItem('seria', '{"' + seria_offline + '":""}');
		localStorage.setItem('contents', '{"' + seria_offline + '":""}');
		var d = [];
		d[0] = seria_offline;
		localStorage.setItem('sort', JSON.stringify(d));
	} else {
		_old_version();
	}

	if (localStorage.getItem('active')) {
		_json_contents_off(localStorage.getItem('active'));
	} else {
		_json_contents_off();
	}

	_context_menus();
	_scroller();
	_scroller_view();
}

 // Выход logout
function _logout_off() {
	_fix('_logout_off');
	// $('.p_menu_menu_list_bg').css({'height': '0%', 'opacity': 0});
	// $('.p_menu_menu_list').css({'top': '-330px', 'opacity': 0, 'visibility': 'hidden'});
	$('.p_menu_menu_list_bg').click();
	var scroller_mem = localStorage.getItem('scroller');
	var language_mem = localStorage.getItem('language');
	var language_text_mem = localStorage.getItem('language_text');
	localStorage.clear();
	localStorage.setItem('scroller', scroller_mem);
	localStorage.setItem('language', language_mem);
	localStorage.setItem('language_text', language_text_mem);
	$("#tab").children("ul").html('');
	$('.textarea, #pass, #r_login, #r_email, #r_pass').val('');
	_choice_off('0%');
	$('.choice').fadeOut('slow');
	_start_on_off();
	_context_menus('not');
}

//  // Распарсить контент и выводим список в Таб
// function _json_contents_off(e) {
// 	_fix('_json_contents_off');
// 	cont = JSON.parse(localStorage.getItem('seria'));
// 	var tmp = false;
// 	var tab = '';
// 	var arr = '';
// 	var cont_key = _chrome_i18n("name_list");

// 	for (var key in cont) {
// 		tmp = key;
// 		arr = cont[key].substr(0,70);
// 		if (arr == '') { arr = cont_key; }
// 		tab += '<li class="li"><div class="submit_color"></div><div class="submit_delete">&times;</div>' +
// 		'<div class="notepad_a" id="' + key + '">' + arr + '</div></li>';
// 	}
// 	if (tmp !== false) {
// 		$("#tab").children("ul").html('');
// 		$("#tab").children("ul").append(tab);
// 		$(".tab_nano").nanoScroller();
// 		if (e) {
// 			_active_off(e);
// 		} else {
// 			_active_off(tmp);
// 		}
// 	} else {
// 		_fix('error > _json_contents_off');
// 		_create_note_off();
// 	}
// }


 // Распарсить контент и выводим список в Таб
function _json_contents_off(e) {
	_fix('_json_contents_off');
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
		$(".tab_nano").nanoScroller();
		if (e) {
			_active_off(e);
		} else {
			_active_off(tmp);
		}
	} else {
		_fix('error > _json_contents_off');
		_create_note_off();
	}
}

 // Вывод списка в Таб
function _json_contents_2_off() {
	_fix('_json_contents_2_off');
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
}

 // Создать лист
function _create_note_off() {
	_fix('_create_note_off');
	if (typeof localStorage.getItem('seria') !== "undefined" && localStorage.getItem('seria') !== null) {
		var seria_offline = parseInt(new Date().getTime()/1000) + '_' + _gen(5);
		cont = JSON.parse(localStorage.getItem('contents'));
		cont[seria_offline] = '';
		localStorage.setItem('contents', JSON.stringify(cont));

		ser = JSON.parse(localStorage.getItem('seria'));
		ser[seria_offline] = '';
		localStorage.setItem('seria', JSON.stringify(ser));
	} else {
		localStorage.setItem('seria', '{"' + seria_offline + '":""}');
		localStorage.setItem('contents', '{"' + seria_offline + '":""}');
	}
	_add_sort(seria_offline);
	_json_contents_off();
	document.getElementById("seria").focus();
	_save_color();
	_context_menus();
	_scroller();
	_scroller_view();
}

 // Add sort
function _add_sort(e) {
	_fix('_add_sort');
	var d = [];
	if (typeof localStorage.getItem('sort') !== "undefined" && localStorage.getItem('sort') !== null) {
		sort = JSON.parse(localStorage.getItem('sort'));
		sort[sort.length] = e;
		localStorage.setItem('sort', JSON.stringify(sort));
	} else {
		d[0] = e;
		localStorage.setItem('sort', JSON.stringify(d));
	}
}

 // Delete sort
function _delete_sort(e) {
	_fix('_delete_sort');
	sort = JSON.parse(localStorage.getItem('sort'));
	for (var k in sort) {
		if (sort[k] === e) {
			sort.splice(k,1);
		}
	}
	var sort_tmp = [];
	var i = 0;
	for (var k in sort) {
		sort_tmp[i] = sort[k];
		i++;
	}
	localStorage.setItem('sort', JSON.stringify(sort_tmp));
}

 // Удалить лист
function _delete_note_off(note) {
	_fix('_delete_note_off');
	var tmp_color = note;
	tmp_color = new RegExp(tmp_color, 'i');
	if (tmp_color.test(localStorage.getItem('color'))) {
		localStorage.setItem('color', localStorage.getItem('color').replace(tmp_color,'')); // color
	}
	_delete_seria_off(note);
	_delete_sort(note);
	_delete_contents_off(note);
	_save_color();
	_context_menus();
	_scroller('del');
	_scroller_view();
}

 // Удаление seria
function _delete_seria_off(note) {
	_fix('_delete_seria_off');
	res = JSON.parse(localStorage.getItem('seria'));
	delete res[note];
	localStorage.setItem('seria', JSON.stringify(res));
}

 // Удаление контента
function _delete_contents_off(note) {
	_fix('_delete_contents_off');
	cont = JSON.parse(localStorage.getItem('contents'));
	delete cont[note];
	localStorage.setItem('contents', JSON.stringify(cont));
	// if (localStorage.getItem('choice') && localStorage.getItem('choice') !== 'off' && localStorage.getItem('user_id')) {
	// 	_json_contents_off();
	// } else {
	// 	_json_contents_off();
	// }
	_json_contents_off();
}

 // последний активный лист
function _active_off(key) {
	_fix('_active_off');
	if (key) {
		localStorage.setItem('active', key);
		_return_textarea_off(key, 'active');
		_bold();
	} else {
		cont = JSON.parse(localStorage.getItem('contents'));
		var tmp = false;
		for (var i in cont) {
			tmp = i;
		}
		if (tmp !== false) {
			_fix('_active_off > yes');
			localStorage.setItem('active', tmp);
			// _seria();
			_return_textarea_off(localStorage.getItem('active'), 'active');
			_bold();
		} else {
			_fix('error > _active_off');
			_popup('e_not_active_off');
			_create_note_off();
			_bold();
		}
	}
}

 // Заменить старые данные на новые в storage.seria
function _swap_seria_off() {
	_fix('_swap_seria_off');
	cont = JSON.parse(localStorage.getItem('seria'));
	for (var key in cont) {
		if (key == localStorage.getItem('active')) {
			cont[key] = $(".seria").val();
			break;
		}
	}
	localStorage.setItem('seria', JSON.stringify(cont));
	var tmp_color = localStorage.getItem('active');
	tmp_color = new RegExp(tmp_color, 'i');
	if (tmp_color.test(localStorage.getItem('color'))) {
	} else {
		localStorage.setItem('color', localStorage.getItem('color')+','+localStorage.getItem('active')); // color
	}
	_json_contents_2_off();
	_save_color();
}

 // Заменить старые данные на новые в storage.contents
function _swap_contents_off(e) {
	_fix('_swap_contents_off');
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
	var tmp_color = localStorage.getItem('active');
	tmp_color = new RegExp(tmp_color, 'i');
	if (tmp_color.test(localStorage.getItem('color'))) {
	} else {
		localStorage.setItem('color', localStorage.getItem('color')+','+localStorage.getItem('active')); // color
	}
	_save_color();
}

 // Вывод в textarea
function _return_textarea_off(e, tab) {
	_fix('_return_textarea_off');
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
				_fix('_return_textarea_off > true1');
				if (editor == 1) {
					$('.jqte_editor').html(tmp);
				} else {
					$('.textarea').val(tmp);
				}
				console.timeEnd('script');
				_seria();
			} else {
				_fix('_return_textarea_off > false1');
				_json_contents_off();
			}
		} else if (tab == 'tab') {
			if (tmp !== false) {
				_fix('_return_textarea_off > true2');
				localStorage.setItem('active', e);
				if (editor == 1) {
					$('.jqte_editor').html(tmp);
				} else {
					$('.textarea').val(tmp);
				}
				_seria();
			} else {
				_fix('_return_textarea_off > false2');
			}
		}
	} else {
		_fix('_return_textarea_off > undefined');
		JSON.parse(JSON.stringify(localStorage.getItem('contents')), function(key, value) {
			var tmp_value = false;
			if (key !== 'hash' && key !== 'contents' && key == localStorage.getItem('active')) {
				tmp_value = value;
			}
		});
		if (tmp_value !== false) {
			_fix('_return_textarea_off > undefined > true');
			if (editor == 1) {
				$('.jqte_editor').html(tmp_value);
			} else {
				$('.textarea').val(tmp_value);
			}
		} else {
			_fix('error > _return_textarea_off > undefined');
			_popup('e_no_data');
		}
	}
}

 //import
var upload_count = 0;
function _upload_off(name_upload, text_upload) {
	_fix('_upload_off');
	cont = JSON.parse(localStorage.getItem('contents'));
	var seria_offline = parseInt(new Date().getTime()/1000) + '_' + _gen(5);
	cont[seria_offline] = text_upload;
	localStorage.setItem('contents', JSON.stringify(cont));

	ser = JSON.parse(localStorage.getItem('seria'));
	ser[seria_offline] = name_upload;
	localStorage.setItem('seria', JSON.stringify(ser));
	upload_count = 0;

	var d_up = [];
	d_up = JSON.parse(localStorage.getItem('sort'));
	d_up[JSON.parse(localStorage.getItem('sort')).length] = seria_offline;
	localStorage.setItem('sort', JSON.stringify(d_up));

	_json_contents_off();
	_context_menus();
	_scroller();
}

 // Show/hide choice on/off
function _choice_off(a) {
	$('.choice_on').animate({'marginLeft': a}, 'slow');
	$('.choice_off').animate({'marginRight': a}, 'slow');
}




// var bg = chrome.extension.getBackgroundPage();
// bg._window_close();
// $('.menu_notepad').on("click", function() {
// 	window.close();
// 	var bg = chrome.extension.getBackgroundPage();
// 	bg._window_open();
// });
