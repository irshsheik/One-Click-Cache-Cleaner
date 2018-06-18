import cleanerService from '../services/CleanerService';
import optionService from '../services/OptionService';

/** set the initial option defaults */
chrome.runtime.onInstalled.addListener(()=>{
	optionService.setDefaults();
});

chrome.tabs.onCreated.addListener(function (t) {
	console.log("created tab with id = ", t.id);
	cleanerService.query();
	console.log("cache size = ", cleanerService.sc);
});

chrome.tabs.onRemoved.addListener(function (t) {
	console.log("removed tab with id = ", t.id);
	cleanerService.query();
	console.log("cache size = ", cleanerService.sc);
});

chrome.runtime.onStartup.addListener(()=>{
	console.log("yo.. startup");
	cleanerService.query();
	console.log("cache size = ", cleanerService.sc);
});

chrome.runtime.onInstalled.addListener(()=>{
	console.log("yo.. installed..");
	cleanerService.query();
	
});

chrome.runtime.onMessage.addListener((message,sender, sendMessage)=>{
	if(message.action === 'clear-cache'){
		cleanerService.removeAll(()=>{
			console.log("callback called.. ");
			sendMessage({'status': true, "message":"cache cleared successfully"});
			console.log("after sendMessage");
			cleanerService.query();
		});
		//call send message asynchronously
		return true;
	}
});

 /* clear cache since 0
 * +will be changed once the option page
 */
chrome.browserAction.onClicked.addListener((e) => {
	cleanerService.removeAll(()=>{
		cleanerService.query();
	});
});


