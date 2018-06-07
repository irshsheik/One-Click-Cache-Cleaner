
chrome.browserAction.onClicked.addListener((e) => {
	if(chrome.browsingData){
	chrome.browsingData.settings((result) => {
		console.log("setting = ", result);
		/** cacheStorage is not supported by remove method */
		delete (result.dataToRemove.cacheStorage);
		chrome.browsingData.remove(result.options, result.dataToRemove, () => {
			console.log("Cache cleared successfully");
			console.log(chrome.extension.getURL('assets/icons/cpu0-128.png'));
			chrome.browserAction.setIcon({
				path :  {
					"16": chrome.extension.getURL("assets/icons/speedometer-l-16.png"),
					"32": chrome.extension.getURL("assets/icons/speedometer-l-32.png"),
					"64": chrome.extension.getURL("assets/icons/speedometer-l-64.png"),
					"128": chrome.extension.getURL("assets/icons/speedometer-l-128.png"),
					"256": chrome.extension.getURL("assets/icons/speedometer-l-256.png"),
				  },
			  });
		});
	});
	}else{
		console.error("Supported browser version should be >= Chrome Dev 19.0.1041.0")
	}
});



/**
 * to be used later when other options for extension are added
 */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	if (request.action === 'clearCache') {
		console.log("message received ", request);
		console.log("browsing data ", chrome.browsingData);

		chrome.browsingData.settings((result) => {
			console.log("setting = ", result);
			delete (result.dataToRemove.cacheStorage);
			chrome.browsingData.remove(result.options, result.dataToRemove, () => {
				console.log("Cache cleared successfully");
			});

		});
	}

});



