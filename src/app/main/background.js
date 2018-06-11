import cleanerService from '../service/CleanerService';

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
	console.log("cache size = ", cleanerService.sc);
});

 /* clear cache since 0
 * +will be changed once the option page
 */
chrome.browserAction.onClicked.addListener((e) => {
	cleanerService.removeAll();
});


