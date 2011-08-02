// Общий неймспей приложения
var application = {};

// Подключаем модуль в котором находится основное приложение
Ti.include('main.js');
// Подключаем модуль в котором находятся обработчики событий
Ti.include('events.js');

// Создание основного рабочего окна
// За основу берем TabGroup, будем работать с ним
application.win = Titanium.UI.createTabGroup();

// Вызываем инициилизацию приложения
application.initApp();

// Открываем TabGroup
application.win.open();