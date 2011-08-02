// Метод в котором происходит иницилизация приложения
application.initApp = function()
{
	// Создаем окна которые будут содержаться в табах
	var search_win = Titanium.UI.createWindow( {title:'Поиск'} );
	var map_win = Titanium.UI.createWindow( {title:'Карта'} );
	
	// Создаем поле поиска, высота 43 точки, 0 точек от верха контейнера
	application.search = Titanium.UI.createSearchBar({
        showCancel:false,
        height:43,
        top:0
	});
	
	// Создаем TabView в который будут выводиться результаты поиска
	application.tableView = Titanium.UI.createTableView({
        searchHidden:true,
        top:43
	});
		
	// Создаем виджет карты на котором будут выставляться отметки
	application.mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		animate:true,
		regionFit:true,
		userLocation:true
	});

	// Добавляем виджеты в окна-контейнер
	search_win.add(application.search);
	search_win.add(application.tableView);
	map_win.add(application.mapview);

	// Устанавливаем обработчики (описаны в events.js)
	application.setEvents();
	
	// Создаем табы которые будут добавлены в основной TabGroup
	// window - указывает на контейнер который связан с табом 
	var search_tab = Titanium.UI.createTab({
										title:'Поиск',
										icon:'icons/magnifyingglass.png',
										window:search_win
										});
									
	var map_tab =  Titanium.UI.createTab({
										title:'Карта',
										icon:'icons/world.png',
										window:map_win
										});
	
	// Добавляем табы в табгруп
	application.win.addTab(search_tab);
	application.win.addTab(map_tab);
}