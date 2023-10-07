
var address = 'https://notepad-online.ru/server_real.php';

var lng_array = ["en", "ru", "zh_CN", "es", "pt_BR", "hi", "de", "fr", "it"];
var lng_bg = localStorage.getItem('language');
var lng_bg_text = localStorage.getItem('language_text');
var site = 'https://notepad-online.ru/server_get.php';


localStorage.setItem('sync', 'true');

 // Send response to popup for sync
var send_server = true;
var time_send = 500;
var page_script = path_script = 'first';
/**
// http://chrome-ext.blogspot.ru/2014/02/blog-post_4033.html
*/
function _play() {
	time_send = (localStorage.getItem('sync') == 'false') ? 100 : 500;
	if (localStorage.getItem('choice') == 'off') { time_send = 2000; }
	chrome.runtime.sendMessage({type:'getResponse'}, function(res) {
		if(!res) {
			_if_play();
		} else {
			if (res.path.includes('index')) {
				path_script = 'first';
			} else {
				path_script = 'second';
			}
			if (page_script != path_script) {
				_if_play();
			}
		}
	});
	setTimeout(_play, time_send);
}
setTimeout(_play, time_send);

function _if_play() {
	page_script = path_script;
	if (localStorage.getItem('start') == 'true' &&
	localStorage.getItem('sync') == 'false' &&
	send_server === true &&
	localStorage.getItem('choice') == 'on') {
		send_server = false;
		_sync2();
	}
}

// Сохранение файлов
function _sync2() {
	console.log('send message on server');
	_fix('sync');
	$.ajax({
		url: address,
		dataType: "json",
		type: "POST",
		data: {
			method: 'sync',
			user_id: localStorage.getItem('user_id'),
			session: localStorage.getItem('session'),
			sort: localStorage.getItem('sort'),
			contents: localStorage.getItem('contents'),
			seria: localStorage.getItem('seria')
		}
	}).done(function(msg) {
		_fix('sync > ajax');
		if (msg.result == 'ok') {
			_fix('sync > ajax > ok');
			localStorage.setItem('sync', 'true');
			send_server = true;
		} else {
			_fix('sync > ajax > error');
		}
	}).fail(function() {
		_fix('sync > ajax > fail');
		_update('not');
	});
}

 // Open / close new tabs
var win_open = [];
var win_i = 0;
var win_t = false;
function _window_close() {
	// localStorage.setItem('sync', 'false');
	// send_server = true;
	for (var i=0; i<=win_open.length-1; i++) {
		if (win_t == false) {
			win_open[i].close();
		}
	}
	win_t = false;
	// setTimeout(function() {}, 200);
}
function _window_open() {
	win_t = true;
	var width_tmp = (screen.width/2 - 734/2);
	var url = chrome.runtime.getURL("second.html");
	var params = "top=100,left="+width_tmp+",toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,width=750,height=650";
	win_open[win_i] = window.open(url, "second", params);
	win_i++;
}

 // Случайный ID
function _len(len = 5) {
	var len_res = '', len_array = '0123456789abcdefghijkmnpqrstuvwxyz';
	for (var i = 0; i < len; i++) {
		var len_pos = Math.floor(Math.random() * len_array.length);
		len_res = len_res + len_array[len_pos];
	}
	return len_res;
}

 // Получить куки
function get_cookie( cookie_name ) {
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	if ( results ) {
		return ( unescape ( results[2] ) );
	} else {
		return null;
	}
}

 // Страница запускается после установки расширения
chrome.runtime.onInstalled.addListener(function(e) {
	if (e.reason == 'install') {
		var notepad_uid_memory = _len(32);
		var cookie_date = new Date(2033, 01, 15);
		document.cookie = "notepad_uid="+notepad_uid_memory+";expires="+cookie_date.toGMTString();
		$.get(site, {notepad_uid: notepad_uid_memory, method: 'install'});
		chrome.tabs.create({url: './options.html', active: true});
		chrome.runtime.setUninstallURL(site+'?notepad_uid='+get_cookie('notepad_uid')+'&method=uninstall');
	}
});

 // Страница запускается после удаления расширения
chrome.runtime.setUninstallURL(site+'?notepad_uid='+get_cookie('notepad_uid')+'&method=uninstall');


 // Условие выбора языка из стандартного и изменённого
if (typeof lng_bg !== 'undefined' && lng_bg !== 'null' && lng_bg !== null && lng_bg != '' && lng_array.indexOf(lng_bg) !== -1 &&
	typeof lng_bg_text !== 'undefined' && lng_bg_text !== 'null' && lng_bg_text !== null && lng_bg_text != '') { // Если есть language в storage
	$.ajax({
		url: '_locales/'+lng_bg+'/messages.json',
		type: 'POST',
		async: false
	}).done(function(msg) {
		localStorage.setItem('language_text', msg);
	});
	var _chrome_i18n = function(mes, des) {
		var tmp = JSON.parse(localStorage.getItem('language_text'));
		if (des) {
			tmp = tmp[mes].message;
			return tmp.replace("$msg$", des);
		}
		return tmp[mes].message;
	}
} else {
	var _chrome_i18n = function(mes, des) {
		if (des) {
			return chrome.i18n.getMessage(mes, des);
		} else {
			return chrome.i18n.getMessage(mes);
		}
	}
}

 // Изменение языка везде!
function _func_lng() {
	if (typeof localStorage.getItem('language') != 'undefined' &&
		localStorage.getItem('language') != '' &&
		localStorage.getItem('language') != 'null' &&
		localStorage.getItem('language') != null &&
		localStorage.getItem('language') != 'undefined') {
		$.ajax({
			url: '_locales/'+localStorage.getItem('language')+'/messages.json',
			type: 'POST',
			// async:false
		}).done(function(msg) {
			localStorage.setItem('language_text', msg);
		});
	} else {
		return;
	}
	var _chrome_i18n = function(mes, des) {
		var tmp = JSON.parse(localStorage.getItem('language_text'));
		if (des) {
			tmp = tmp[mes].message;
			return tmp.replace("$msg$", des);
		}
		return tmp[mes].message;
	}
}

// Ошибка
function _fix(err) {
	var err_tmp = (err) ? err : '_fix';
	// console.log(err);
}


// Сохранение выделеного текста
var _click = function(info, tab) {
	_fix('_click');
	var cont = JSON.parse(localStorage.getItem('contents'));
	var param = info.menuItemId[0];
	var pls = info.menuItemId.substr(1);

	if (param == 'p') {
		cont[pls] = cont[pls] + '\n' + info.pageUrl;
	} else if (param == 'l') {
		cont[pls] = cont[pls] + '\n' + info.linkUrl;
	} else if (param == 's') {
		cont[pls] = cont[pls] + '\n' + info.selectionText;
	}
	localStorage.setItem('contents', JSON.stringify(cont));
	_slide();
	if (localStorage.getItem('user_id') && localStorage.getItem('choice') && localStorage.getItem('choice') === 'on') {
		_sync2();
	}
	chrome.runtime.sendMessage({type:'contextMenus'});
};

// Анимация блокнота
var i_slide = 1;
function _slide() {
	if (i_slide <= 6) {
		chrome.browserAction.setIcon({path:"../img/a_" + i_slide + ".png"});
		i_slide++;
		setTimeout(_slide, 100);
	} else {
		i_slide = 1;
	}
}

// Обновление контекстного меню
function _update(e) {
	if (e) {
		chrome.contextMenus.removeAll();
	} else {
		_fix('_update');
		_slide();
		// var seria = localStorage.getItem('seria');
		// var seria = JSON.stringify(localStorage.getItem('seria'));
		var seria = JSON.parse(localStorage.getItem('seria'));
		var ser = '';
		chrome.contextMenus.removeAll();
		var bg_copy = _chrome_i18n("bg_copy");
		context_link = bg_copy + ": '" + _chrome_i18n("bg_link") + "'";
		context_page = bg_copy + ": '" + _chrome_i18n("bg_address") + "'";
		context_text = bg_copy + ": '" + _chrome_i18n("bg_text") + "'";
		chrome.contextMenus.create({"title": context_link, "contexts": ["link"], "id": "parent_link"});
		chrome.contextMenus.create({"title": context_page, "contexts": ["page"], "id": "parent_page"});
		chrome.contextMenus.create({"title": context_text, "contexts": ['selection'], "id": "parent_select"});
		for (var key in seria) {
			ser = seria[key];
			if (ser == '') {ser = _chrome_i18n("name_list");}
			chrome.contextMenus.create({"title": ser, "contexts": ["link"], 	 "id": 'l' + key, "parentId": "parent_link", "onclick": _click});
			chrome.contextMenus.create({"title": ser, "contexts": ["page"], 	 "id": 'p' + key, "parentId": "parent_page", "onclick": _click});
			chrome.contextMenus.create({"title": ser, "contexts": ['selection'], "id": 's' + key, "parentId": "parent_select", "onclick": _click});
		}
	}
}


_update();

/*
// Проверка доступности ресурса
var go = setInterval(function(){
	$.post('https://notepad-online.ru/online.php', function() {
	}).done(function() {
		_fix('done');
		_update();
	}).fail(function() {
		_fix('fail');
		_update('not');
	});
}, 60000);
*/

document.title = _chrome_i18n("ext_name");



