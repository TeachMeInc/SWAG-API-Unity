mergeInto(LibraryManager.library, {
	swagApi: null,

	SWAG_Init: function (gameKey) {
	
	
	    var game = document.getElementById("swag");
		
		if (game == undefined)	
			alert ("SWAG_Init Game not found");

		swagApi = SWAGAPI.getInstance({
			wrapper: game,
			api_key: Pointer_stringify(gameKey),        // need to change
			theme: 'shockwave',
			debug: true
		});
	},

	SWAG_StartSession: function () {
		swagApi.startSession ()
			.then (function (){
				unityInstance.SendMessage('SwagObj', 'StartSessionComplete');
				console.log ("login Complete");
			});
	},

	SWAG_PostScore: function (level_key, score) {
		console.log ("PostScore: ", Pointer_stringify(level_key), score);
		swagApi.postScore (Pointer_stringify(level_key), score);
	},

	SWAG_PostDailyScore: function (date, level_key, score) {
		console.log ("PostDailyScore: ", date, Pointer_stringify(level_key), score);
        swagApi.postDailyScore (date, Pointer_stringify(level_key), score);
	},
		
	SWAG_GetScores (level_key, type, period, current_user, target_date, use_daily, value_formatter) {
		swagApi.getScores({
			level_key: Pointer_stringify(level_key),
			type: type,
			period: period,
			current_user: current_user,
			target_date: target_data,
			use_daily: use_daily,
			value_formatter: value_formatter
		})
			.then(function(data) {
				unityInstance.SendMessage('SwagObj', 'GetScoresCompleted', JSON.stringify (data));
			});
	},

	SWAG_ShowDialog: function (type, title, level_key, period, value_formatter) {
		console.log ("ShowDialog: ", Pointer_stringify (type), Pointer_stringify(level_key));
		swagApi.showDialog (Pointer_stringify (type), { 
			title: Pointer_stringify(title), 
			level_key: Pointer_stringify(level_key), 
			period: Pointer_stringify(period), 
			value_formatter: Pointer_stringify(value_formatter)
		});
	},
	
	SWAG_GetCurrentEntity: function (level_key) {
		var data = JSON.stringify(swagApi.getCurrentEntity())
		
		console.log (data);
		
		unityInstance.SendMessage('SwagObj', 'GetCurrentEntityComplete', data);
	},
	
	SWAG_GetUserDatastore: function () {
		swagApi.getUserDatastore()
			.then(function(data) {
				var data = JSON.stringify(data);
				console.log (data);
				
				unityInstance.SendMessage('SwagObj', 'GetUserDatastoreComplete', data);
			});
	},
	
	SWAG_PostDatastore: function (key, value) {
		swagApi.postDatastore(key, value);
	}

	SWAG_StartGame: function () {
		swagApi.startGame()
			.then(function() {
				unityInstance.SendMessage('SwagObj', 'StartGameCompleted');
			});
	},
	
	SWAG_EndGame: function (options) {
		swagApi.endGame(options)
			.then(function() {
				unityInstance.SendMessage('SwagObj', 'EndGameCompleted');
			});
	},
	
	SWAG_ShowAd: function () {
		swagApi.startGame()
			.then(function() {
				unityInstance.SendMessage('SwagObj', 'ShowAdCompleted');
			});
	},

	SWAG_GetScoreCategories () {
		swagApi.getScoreCategories()
			.then(function(data) {
				unityInstance.SendMessage('SwagObj', 'GetScoreCategoriesCompleted', JSON.stringify (data));
			});
	},

	SWAG_IsSubscriber () {
		swagApi.isSubscriber()
			.then(function(subscriber) {
				var data = {
					subscriber: subscriber
				};
				
				unityInstance.SendMessage('SwagObj', 'IsSubscriberComplete', JSON.stringify (data));
			});
	},

	SWAG_IsSubscriber () {
		swagApi.isSubscriber()
			.then(function(subscriber) {
				var data = {
					subscriber: subscriber
				};
				
				unityInstance.SendMessage('SwagObj', 'IsSubscriberComplete', JSON.stringify (data));
			});
	},

	SWAG_HasDailyScore () {
		swagApi.hasDailyScore()
			.then(function(score) {
				var data = {
					score: score
				};
				
				unityInstance.SendMessage('SwagObj', 'HasDailyScoreComplete', JSON.stringify (data));
			});
	},
	
	SWAG_GetCurrentDay  () {
		swagApi.getCurrentDay ()
			.then(function(data) {
				unityInstance.SendMessage('SwagObj', 'GetCurrentDayComplete', JSON.stringify (data));
			});
	},	
});