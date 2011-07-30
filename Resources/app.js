var application = {};

Ti.include('main.js');

application.win = Titanium.UI.createTabGroup();

application.initApp();

application.win.open();