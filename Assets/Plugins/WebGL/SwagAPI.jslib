mergeInto(LibraryManager.library, {
	swagApi: null,

	SWAG_Init: function (gameKey, domObj, platform) {
		var game = document.getElementById(Pointer_stringify (domObj));
		platform = document.getElementById(Pointer_stringify (platform));
		
		if (game == undefined)	
			alert ("SWAG_Init Game not found");

		swagApi = SWAGAPI.getInstance({
			wrapper: game,
			api_key: Pointer_stringify(gameKey),
			theme: platform,
			debug: true
		});
	},

	SWAG_StartSession: function () {
		swagApi.startSession ()
			.then (function (){
				window.unityInstance.SendMessage('SwagObj', 'StartSessionComplete');
			});
	},

	SWAG_ShowBrandingAnimation: function (devElement) {
		document.swagBrandingShown = 0;
		SWAGAPI.showBrandingAnimation (Pointer_stringify(devElement), function (){
			window.unityInstance.SendMessage('SwagObj', 'BrandingAnimationShown');
			document.swagBrandingShown = 1;
		});
	},
		
	SWAG_HasBrandingAnimationShown: function () {
		var data = "false";
		if (document.swagBrandingShown)
			data = "true";
		
		window.unityInstance.SendMessage('SwagObj', 'HasBrandingAnimationShownComplete', data);
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
				window.unityInstance.SendMessage('SwagObj', 'GetScoresComplete', JSON.stringify (data));
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
		window.unityInstance.SendMessage('SwagObj', 'GetCurrentEntityComplete', data);
	},
	
	SWAG_GetUserDatastore: function () {
		swagApi.getUserDatastore()
			.then(function(data) {
				window.unityInstance.SendMessage('SwagObj', 'GetUserDatastoreComplete', JSON.stringify(data));
			});
	},
	
	SWAG_PostDatastore: function (key, value) {
		swagApi.postDatastore(Pointer_stringify (key), Pointer_stringify (value));
	},

	SWAG_StartGame: function () {
		swagApi.startGame()
			.then(function() {
				window.unityInstance.SendMessage('SwagObj', 'StartGameComplete');
			});
	},
	
	SWAG_EndGame: function (options) {
		var data = JSON.parse (Pointer_stringify (options));
		swagApi.endGame(data)
			.then(function() {
				window.unityInstance.SendMessage('SwagObj', 'EndGameComplete');
			});
	},
	
	SWAG_ShowAd: function () {
		swagApi.startGame()
			.then(function() {
				window.unityInstance.SendMessage('SwagObj', 'ShowAdComplete');
			});
	},

	SWAG_GetScoreCategories: function () {
		swagApi.getScoreCategories()
			.then(function(data) {
				window.unityInstance.SendMessage('SwagObj', 'GetScoreCategoriesComplete', JSON.stringify (data));
			});
	},

	SWAG_IsSubscriber: function () {
		swagApi.isSubscriber()
			.then(function(subscriber) {
				var data = {
					subscriber: subscriber
				};
				
				window.unityInstance.SendMessage('SwagObj', 'IsSubscriberComplete', JSON.stringify (data));
			});
	},

	SWAG_HasDailyScore: function (level_key) {
		level_key = Pointer_stringify(level_key);
		swagApi.hasDailyScore(level_key)
			.then(function(hasScore) {
				var data = {
					dailyScore: hasScore
				};
				window.unityInstance.SendMessage('SwagObj', 'HasDailyScoreComplete', JSON.stringify (data));
			});
	},
	
	SWAG_GetCurrentDay: function () {
		swagApi.getCurrentDay ()
			.then(function(data) {
				window.unityInstance.SendMessage('SwagObj', 'GetCurrentDayComplete', JSON.stringify (data));
			});
	},
	
	SWAG_GetAchievementCategories: function () {
		swagApi.getAchievementCategories()
			.then(function(data) {
				window.unityInstance.SendMessage('SwagObj', 'GetAchievementCategoriesComplete', JSON.stringify (data));
			});
	},

	SWAG_PostAchievement: function (achievement) {
		swagApi.postAchievement(achievement);
	},

	SWAG_GetUserAchievements: function () {
		console.log ("swagApi.getUserAchievements");
		swagApi.getUserAchievements()
			.then(function(data) {
				console.log (data);
				window.unityInstance.SendMessage('SwagObj', 'SWAG_GetUserAchievementsComplete', JSON.stringify (data));
			});
	},
});
