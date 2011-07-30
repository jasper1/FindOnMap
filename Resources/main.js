application.initApp = function()
{
	// Создаем окна которые привязывются к табам
	application.createWindows();
	
	// Создаем сами табы
	var search_tab = Titanium.UI.createTab({
										title:'Поиск',
										window:application.search_window
										});
									
	var map_tab =  Titanium.UI.createTab({
										title:'Карта',
										window:application.map_window
										});
	
	// Добавляем табы в табгруп
	application.win.addTab(search_tab);
	application.win.addTab(map_tab);
	
}

application.createWindows = function()
{
	application.search_window = Titanium.UI.createWindow({title:'Поиск'});
	
	application.search = Titanium.UI.createSearchBar({
        showCancel:false,
        height:43,
        top:0,

	});
	
	var url='http://alloy.ru/gate/companies/';
	var data = [];
	
	var tableView = Titanium.UI.createTableView({
        searchHidden:true,
        data:data,
        top:43
	});
	
	application.search.addEventListener('return', function(e)
	{
		if (e.value.length > 2){
			var xhr = Titanium.Network.createHTTPClient();
			url_final = url + "?query="+e.value
			xhr.open("GET",url_final, true);			
			xhr.send()
			xhr.onload = function()
			{
				 var json = JSON.parse(this.responseText);
				 data = []
				 for (var c=0;c<json.length;c++)
				 {
				 	data[c] = {hasChild:false,title:json[c].n, address:json[c].a};
				 }
				 tableView.setData(data);
			}
			
		}

	});

	
	application.search_result = Titanium.UI.createTableView()
	
	application.search_window.add(application.search);
	application.search_window.add(tableView);

	application.map_window = Titanium.UI.createWindow({title:'Карта'});
	
	application.mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		animate:true,
		regionFit:true,
		userLocation:true
		//annotations:[atlanta,apple]
	});

	application.map_window.add(application.mapview);
	
	
	tableView.addEventListener('click', function(e)
	{
		var rowdata = e.rowData;
		//var prop = rowdata.xy;
	
		 
		var prop = rowdata.address;
		var xhr = Titanium.Network.createHTTPClient();
		
		var url_f_geocode = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false';
		url_f_geocode = url_f_geocode+'&address='+prop
		url_f_geocode = encodeURI(url_f_geocode);
		xhr.open("GET",url_f_geocode);
		xhr.send();
		xhr.onload = function()
		{
			var json = JSON.parse(this.responseText);
			
			//Ti.API.info(json);
			///Ti.API.debug(json);
			var latitude = json.results[0].geometry.location.lat;
			var longitude = json.results[0].geometry.location.lng;
		
			
			application.mapview.removeAllAnnotations();
		
			application.win.setActiveTab(1);
		
			application.mapview.addAnnotation(Titanium.Map.createAnnotation({
												latitude:latitude,
												longitude:longitude,
												title:rowdata.title,
												animate:true
												}));
												
			application.mapview.setLocation ({latitude:latitude,longitude:longitude, animate:true});
			 
		}
	});
}
