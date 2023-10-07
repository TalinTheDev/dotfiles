
var lng_loc_true = false;
var lng_array = ["en", "ru", "zh_CN", "es", "pt_BR", "hi", "de", "fr", "it"];
var lng_local = localStorage.getItem('language');
var lng = chrome.i18n.getMessage("@@ui_locale");

 // Условие выбора языка из стандартного и изменённого
// if (typeof lng_local != 'undefined' &&
// lng_local != 'null' &&
// lng_local != null &&
// lng_local != '' &&
// lng_array.indexOf(lng_local) !== -1) { // Если есть language в storage
if (lng_local &&
lng_local != 'null' &&
lng_local != null &&
lng_local != '' &&
lng_array.indexOf(lng_local) !== -1) { // Если есть language в storage
	$.ajax({
		url: '_locales/'+lng_local+'/messages.json',
		type: 'json',
		async: false
	}).done(function(msg_lng) {
		if (typeof msg_lng.ext_name == 'undefined') { msg_lng = JSON.parse(msg_lng); }
		localStorage.setItem('language_text', JSON.stringify(msg_lng));
	}).fail(function() {
		var _chrome_i18n = function(mes, des) {
			if (des) {
				return chrome.i18n.getMessage(mes, des);
			} else {
				return chrome.i18n.getMessage(mes);
			}
		}
		return;
	});
	lng_loc_true = true;
	var _chrome_i18n = function(mes, des) {
		var tmp_loc = JSON.parse(localStorage.getItem('language_text'));
		if (des) {
			tmp_loc = tmp_loc[mes].message;
			return tmp_loc.replace("$msg$", des);
		}
		return tmp_loc[mes].message;
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

// var _chrome_i18n = function(mes) { chrome.i18n.getMessage(mes); }







// Вывод версии
$.post('manifest.json', function(msg) {
	if (typeof msg.version == 'undefined') { msg = JSON.parse(msg); }
	$('.about_version_num').text(msg.version);
});

document.title = _chrome_i18n("ext_name");
$('.about_version_text').text(_chrome_i18n("about"));
$('#a_login').text(_chrome_i18n("login"));
$('#a_registration').text(_chrome_i18n("registration"));
$('#loc_menu').text(_chrome_i18n("menu"));
$('#loc_export').text(_chrome_i18n("export"));
$('#loc_import').html(_chrome_i18n("import"));
$('#loc_history').text(_chrome_i18n("history"));
$('#loc_recovery_pass').text(_chrome_i18n("recovery_pass"));
$('#loc_logout').text(_chrome_i18n("logout"));
$('#loc_donate').text(_chrome_i18n("donate"));
$('#loc_star').text(_chrome_i18n("star"));
$('#loc_settings').text(_chrome_i18n("settings"));
$('#loc_hello').text(_chrome_i18n("hello"));
$('#loc_add_list').text(_chrome_i18n("add_list"));
$('#loc_save').text(_chrome_i18n("save"));
$('#loc_session').text(_chrome_i18n("session"));
$('#a_hello').text(_chrome_i18n("lord"));
$('.upload_text_div').html(_chrome_i18n("upload_mes"));
$('.delete_text_div_span').html(_chrome_i18n("delete_mes"));
$('.exit_text_div_span').html(_chrome_i18n("exit_mes"));
$('.upload_div_ok, .delete_div_ok, .exit_div_ok').text(_chrome_i18n("upload_yes"));
$('.upload_div_no, .delete_div_no, .exit_div_no').text(_chrome_i18n("upload_cancel"));
$('#session_kill_select').text(_chrome_i18n("session_kill_select"));
$('#session_kill_all').text(_chrome_i18n("session_kill_all"));
$('#seria').prop('placeholder', _chrome_i18n("name_list"));
$('#loc_r_user').text(_chrome_i18n("username"));
$('#loc_l_email, #loc_r_email').text(_chrome_i18n("email"));
$('#loc_l_pass, #loc_r_pass').text(_chrome_i18n("pass"));
$('#loc_l_enter').text(_chrome_i18n("enter"));
$('#loc_r_reg').text(_chrome_i18n("registration"));
$('.forget_pass').text(_chrome_i18n("forget_pass"));
$('.load').text(_chrome_i18n("load"));
$('textarea').prop("placeholder", _chrome_i18n("textarea"));
$('.check_all_label').text(_chrome_i18n("select_all"));
$('.export_btn').text(_chrome_i18n("download"));
$('.opt_lang').text(_chrome_i18n("opt_lang"));
$('.opt_button').text(_chrome_i18n("opt_button"));
$('.settings_radio_name').text(_chrome_i18n("settings_radio_name"));
$('.opt_very_small').text(_chrome_i18n("opt_very_small"));
$('.opt_small').text(_chrome_i18n("opt_small"));
$('.opt_normal').text(_chrome_i18n("opt_normal"));
$('.opt_big').text(_chrome_i18n("opt_big"));
$('.opt_editor_use').text(_chrome_i18n("opt_editor_use"));
$('.opt_checkbox_hide').text(_chrome_i18n("opt_checkbox_hide"));
$('.settings_s_name').val(_chrome_i18n("settings_s_name"));
$('.choice_name').text(_chrome_i18n("choice_name"));
$('.choce_prev').text(_chrome_i18n("choce_prev"));
$('.chioce_with_authorization').text(_chrome_i18n("chioce_with_authorization"));
$('.chioce_without_authorization').text(_chrome_i18n("chioce_without_authorization"));
$('.chioce_with_text').text(_chrome_i18n("chioce_with_text"));
$('.chioce_without_text').text(_chrome_i18n("chioce_without_text"));
