var gui = require('nw.gui');
var win = gui.Window.get();

/*var windowMenu = new gui.Menu({type: 'menubar'});
var windowSubMenu = new gui.Menu();
var subMenuItem = new gui.MenuItem({label: '子菜单项', icon: 'images/Brush.png'});	
windowSubMenu.append(subMenuItem);
windowMenu.append(new gui.MenuItem({label: '子菜单', submenu: windowSubMenu}));
win.menu = windowMenu;*/


var menu = new gui.Menu();
menu.append(new gui.MenuItem({label: '前进', enabled: false})); // 禁用
menu.append(new gui.MenuItem({label: '后退'}));
menu.append(new gui.MenuItem({type: 'separator'}));
var　reloadItem = new gui.MenuItem({label: '重新加载'});
reloadItem.click = function() {
	// alert('我要刷新啦');
	location.reload();
};
var devToolItem = new gui.MenuItem({label: '开发工具'});
devToolItem.click = function() {
	win.showDevTools();
};
menu.append(reloadItem);
menu.append(devToolItem);

//menu.append(new gui.MenuItem({label: '重新加载'}));		
//menu.removeAt(4);

// 添加右键监听
var body = document.body;
body.addEventListener('contextmenu', function(e) {
	// menu.items.length 
	menu.popup(e.x, e.y); // 弹出菜单			
});