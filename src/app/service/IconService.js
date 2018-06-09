
class IconService {
    static setLowIcon() {
            chrome.browserAction.setIcon({
                path: {
                    "16": chrome.extension.getURL("assets/icons/speedometer-l-16.png"),
                    "32": chrome.extension.getURL("assets/icons/speedometer-l-32.png"),
                    "64": chrome.extension.getURL("assets/icons/speedometer-l-64.png"),
                    "128": chrome.extension.getURL("assets/icons/speedometer-l-128.png"),
                    "256": chrome.extension.getURL("assets/icons/speedometer-l-256.png"),
                },
            });
        }
        static setMedIcon() {
            chrome.browserAction.setIcon({
                path: {
                    "16": chrome.extension.getURL("assets/icons/speedometer-h-16.png"),
                    "32": chrome.extension.getURL("assets/icons/speedometer-h-32.png"),
                    "64": chrome.extension.getURL("assets/icons/speedometer-h-64.png"),
                    "128": chrome.extension.getURL("assets/icons/speedometer-h-128.png"),
                    "256": chrome.extension.getURL("assets/icons/speedometer-h-256.png"),
                },
            });
        }
        static setHighIcon() {
            chrome.browserAction.setIcon({
                path: {
                    "16": chrome.extension.getURL("assets/icons/speedometer-16.png"),
                    "32": chrome.extension.getURL("assets/icons/speedometer-32.png"),
                    "64": chrome.extension.getURL("assets/icons/speedometer-64.png"),
                    "128": chrome.extension.getURL("assets/icons/speedometer-128.png"),
                    "256": chrome.extension.getURL("assets/icons/speedometer-256.png"),
                },
            });
        }
}

export default IconService;
