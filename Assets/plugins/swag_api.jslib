mergeInto(LibraryManager.library, {
	swagApi: null,

	SWAG_Init: function (gameKey, domObj) {
	    var game = document.getElementById(Pointer_stringify (domObj));
		
		if (game == undefined)	
			alert ("SWAG_Init Game not found");

		swagApi = SWAGAPI.getInstance({
			wrapper: game,
			api_key: Pointer_stringify(gameKey),
			theme: 'shockwave',
			debug: true
		});
	},

	SWAG_StartSession: function () {
		swagApi.startSession ()
			.then (function (){
				unityInstance.SendMessage('SwagObj', 'StartSessionComplete');
			});
	},

	SWAG_PostScore: function (level_key, score) {
		swagApi.postScore (Pointer_stringify(level_key), score);
	},

	SWAG_PostDailyScore: function (date, level_key, score) {
        swagApi.postDailyScore (Pointer_stringify(date), Pointer_stringify(level_key), score);
	},
		
	SWAG_GetScores: function (level_key, type, period, current_user, target_date, use_daily, value_formatter) {
		level_key = Pointer_stringify(level_key);
		type = Pointer_stringify(type);
		period = Pointer_stringify(period);
		target_date = Pointer_stringify(target_date);
		value_formatter = Pointer_stringify(value_formatter);
		
		if (current_user == 0)
			current_user = false;
		else
			current_user = true;
		
		if (use_daily == 0)
			use_daily = false;
		else
			use_daily = true;
		
		swagApi.getScores({
				level_key: level_key,
				type: type,
				period: period,
				current_user: current_user,
				target_date: target_date,
				use_daily: use_daily,
				value_formatter: value_formatter
			})
			.then(function(data) {
				unityInstance.SendMessage('SwagObj', 'GetScoresComplete', JSON.stringify (data));
			});
	},

	SWAG_ShowDialog: function (type, title, level_key, period, value_formatter) {
		type = Pointer_stringify (type);
		title = Pointer_stringify (title);
		level_key = Pointer_stringify (level_key);
		period = Pointer_stringify (period);
		value_formatter = Pointer_stringify (value_formatter);
		
		swagApi.showDialog (type, { 
			title: title, 
			level_key: level_key, 
			period: period, 
			value_formatter: value_formatter
		});
	},
	
	SWAG_GetCurrentEntity: function () {
		var data = JSON.stringify(swagApi.getCurrentEntity());
		unityInstance.SendMessage('SwagObj', 'GetCurrentEntityComplete', data);
	},
	
	SWAG_GetUserDatastore: function () {
		swagApi.getUserDatastore()
			.then(function(data) {
				unityInstance.SendMessage('SwagObj', 'GetUserDatastoreComplete', JSON.stringify(data));
			});
	},
	
	SWAG_PostDatastore: function (key, value) {
		swagApi.postDatastore(Pointer_stringify (key), Pointer_stringify (value));
	},

	SWAG_StartGame: function () {
		swagApi.startGame()
			.then(function() {
				unityInstance.SendMessage('SwagObj', 'StartGameComplete');
			});
	},
	
	SWAG_EndGame: function (options) {
		var data = JSON.parse (Pointer_stringify (options));
		swagApi.endGame(data)
			.then(function() {
				unityInstance.SendMessage('SwagObj', 'EndGameComplete');
			});
	},
	
	SWAG_ShowAd: function () {
		swagApi.startGame()
			.then(function() {
				unityInstance.SendMessage('SwagObj', 'ShowAdComplete');
			});
	},

	SWAG_GetScoreCategories: function () {
		swagApi.getScoreCategories()
			.then(function(data) {
				unityInstance.SendMessage('SwagObj', 'GetScoreCategoriesComplete', JSON.stringify (data));
			});
	},

	SWAG_IsSubscriber: function () {
		swagApi.isSubscriber()
			.then(function(subscriber) {
				var data = {
					subscriber: subscriber
				};
				
				unityInstance.SendMessage('SwagObj', 'IsSubscriberComplete', JSON.stringify (data));
			});
	},

	SWAG_HasDailyScore: function () {
		swagApi.hasDailyScore()
			.then(function(score) {
				var data = {
					score: score
				};
				
				unityInstance.SendMessage('SwagObj', 'HasDailyScoreComplete', JSON.stringify (data));
			});
	},
	
	SWAG_GetCurrentDay: function () {
		swagApi.getCurrentDay ()
			.then(function(data) {
				unityInstance.SendMessage('SwagObj', 'GetCurrentDayComplete', JSON.stringify (data));
			});
	}
});