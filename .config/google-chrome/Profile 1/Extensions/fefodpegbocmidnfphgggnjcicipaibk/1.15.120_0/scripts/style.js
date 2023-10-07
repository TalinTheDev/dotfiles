
var st_setting = 1;
var st_setting_color = 'Default';
var st_setting_color_arr = ['Default', 'Dark', 'Light', 'Red', 'Green', 'Blue', 'Light-red', 'Light-green', 'Light-blue'];

 // Выбор стиля размера App
if (typeof localStorage.getItem('settings') != undefined &&
localStorage.getItem('settings') != 'undefined' &&
localStorage.getItem('settings') != null &&
localStorage.getItem('settings') != '') { // Если settings есть в localStorage
	st_setting = localStorage.getItem('settings');
}

 // Color style all notepad
if (localStorage.getItem('settings_color') && localStorage.getItem('settings_color') != '') {
	st_setting_color = localStorage.getItem('settings_color');
}

if (st_setting == 's') {
	$('#st_style').attr('href', 'styles/size/very_small.css');
} else if (st_setting == 0) {
	$('#st_style').attr('href', 'styles/size/small.css');
} else if (st_setting == 2) {
	$('#st_style').attr('href', 'styles/size/big.css');
} else {
	$('#st_style').attr('href', 'styles/size/normal.css');
}


function _find(array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) return i;
	}
	return -1;
}
if (_find(st_setting_color_arr, st_setting_color) != -1) {
	$('#st_style_color').attr('href', 'styles/color/'+st_setting_color.toLowerCase()+'.css');
} else {
	$('#st_style_color').attr('href', 'styles/color/default.css');
}
