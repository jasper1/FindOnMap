application.initApp = function()
{
	// Создаем окна которые будут содержаться в табах
	application.createWindows();
	
	// Устанавливаем обработчики
	application.search.addEventListener('return', function(e)
	{
		if (e.value.length > 2){
			application.makeSearchRequest(e.value, application.tableView);
		}
	});
	
	application.tableView.addEventListener('click', function(e)
	{
		var mv = application.mapview;
		
		var x = parseFloat(e.rowData.x);
		var y = parseFloat(e.rowData.y);
		
		application.win.setActiveTab(1);
		 
		mv.removeAllAnnotations();
		mv.addAnnotation(Titanium.Map.createAnnotation({
							latitude:x, longitude:y,
							title:e.rowData.title,
							animate:true
							})
						);
		
		mv.setLocation ({
					latitude:x,longitude:y,
					latitudeDelta:.01, longitudeDelta:.01,
					animate:true}
					);
											
		
	});

	
	// Создаем табы
	var search_tab = Titanium.UI.createTab({
										title:'Поиск',
										icon:'magnifyingglass.png',
										window:application.search_win
										});
									
	var map_tab =  Titanium.UI.createTab({
										title:'Карта',
										icon:'world.png',
										window:application.map_win
										});
	
	// Добавляем табы в табгруп
	application.win.addTab(search_tab);
	application.win.addTab(map_tab);
}

application.makeSearchRequest = function(query, tableView)
{
	var url='http://alloy.ru/gate/companies?query=' + query;
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = function()
	{
		 var json = JSON.parse(this.responseText);
		 var data = [];
		 
		 for (var c=0;c<json.length;c++)
		 {
		 	data[c] = { hasChild:false, title:json[c].n, x:json[c].x, y:json[c].y };
		 }
		 tableView.setData(data);
	}
	
	xhr.open("GET", url, true);			
	xhr.send();
	
}

application.createWindows = function()
{
	application.search_win = Titanium.UI.createWindow({
		title:'Поиск'
	});
	
	application.search = Titanium.UI.createSearchBar({
        showCancel:false,
        height:43,
        top:0
	});
	
	application.tableView = Titanium.UI.createTableView({
        searchHidden:true,
        top:43
	});
	
	
	application.search_win.add(application.search);
	application.search_win.add(application.tableView);

	application.map_win = Titanium.UI.createWindow({title:'Карта'});
	
	application.mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		animate:true,
		regionFit:true,
		userLocation:true
	});

	application.map_win.add(application.mapview);	
}
