// Метод выставляющие все используемые события
application.setEvents = function()
{
	// Обработчик на событие return компонента SearchBar
	application.search.addEventListener('return', function(e)
	{
		// Урл по которому опрашиваем сервер
		// e.value содержит строку введенную пользователем
		var url='http://alloy.ru/gate/companies?query=' + e.value;
		
		// Создаем HTTPClient
		var xhr = Titanium.Network.createHTTPClient();
		
		// Указываем обработчик вызваемый по завершению загрузки
		xhr.onload = function()
		{
			// Создаем JSON объект и передем в него текст полученный с сервера 
			// В результате в переменной json мы имеем структуру
			// [{"y": 37.609416000000003, "x": 55.79721, "n": "Название компании"},
			//  {"y": 37.581541000000001, "x": 55.77993, "n": "Название компании"},
			//  ...
			// ]
			var json = JSON.parse(this.responseText);
			var data = [];
			
			//  Пробегаемся по всем строкам
			for (var c=0;c<json.length;c++)
			{
				// Создаем объект и добавляем в массив
				data[c] = { hasChild:false, title:json[c].n, x:json[c].x, y:json[c].y };
			}
			// Полученный массив указываем как источник данных для TableView
			application.tableView.setData(data);
		}
		// Указываем url и делаем асинхронное соединение 
		xhr.open("GET", url, true);			
		xhr.send();
	});

	// Обработчик на нажатие на стрку в таблице
	application.tableView.addEventListener('click', function(e)
	{
		
		var mv = application.mapview;
		
		// Получам x,y из строки.
		var x = e.rowData.x;
		var y = e.rowData.y;
		
		// Выбираем второй таб (который содержит карту)
		application.win.setActiveTab(1);
		 
		//  Удаляем все отметки которые были добавлены ранее
		mv.removeAllAnnotations();
		
		// Создаем и добавляем отметки с координатами и названием
		mv.addAnnotation(Titanium.Map.createAnnotation({
							latitude:x, longitude:y,
							title:e.rowData.title,
							animate:true
							})
						);
		// Перемещаем карту на нужные нам координаты чтобы отметка была видна
		mv.setLocation ({
					latitude:x,longitude:y,
					latitudeDelta:.01, longitudeDelta:.01,
					});		
	});
}