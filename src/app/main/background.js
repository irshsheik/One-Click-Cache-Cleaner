import cleanerService from '../service/CleanerService';

chrome.tabs.onCreated.addListener(function (t) {
	console.log("created tab with id = ", t.id);
	cleanerService.query();
	console.log("cache size = ", cleanerService.sc);
});



/**
 * clear cache since 0
 * +will be changed once the option page
 */
chrome.browserAction.onClicked.addListener((e) => {
	if (chrome.browsingData) {
		chrome.browsingData.settings((result) => {
			console.log("setting = ", result);
			/** cacheStorage is not supported by remove method */
			delete (result.dataToRemove.cacheStorage);
			chrome.browsingData.remove(result.options, result.dataToRemove, () => {
				console.log("Cache cleared successfully");
				cleanerService.query();
			});
		});
	} else {
		console.error("Supported browser == Chrome Dev 19.0.1041.0")
	}
});

