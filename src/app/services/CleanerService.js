import iconService from '../services/IconService'

class CleanerService {
    constructor() {
        var _this = this;
        _this.LIMIT = 100;
        _this.sc = {
            appcache: 0,
            cache: 0,
            cookies: 0,
            downloads: 0,
            fileSystems: 0,
            formData: 0,
            history: 0,
            indexedDB: 0,
            localStorage: 0,
            passwords: 0,
            pluginData: 0,
            serverBoundCertificates: 0,
            serviceWorkers: 0,
            webSQL: 0,
        };

    }//constructor end

    query() {
        var _this = this;
        _this.sc.cookies = 0;
        console.log("calling query == cookie length = ", _this.sc.cookies);
        /**
         * Iterate through each cookie store and count the total number of cookies
         */
        chrome.cookies.getAllCookieStores((cks) => {
            var total = 0;
            cks.forEach((ck) => {
                console.log("each store..");
                chrome.cookies.getAll(
                    { storeId: ck.id },
                    (ck) => {
                        console.log('cookies', ck);
                        total = total + ck.length;
                        _this.add('cookies', total);
                    });
            });
        });

        /** calculate history values */
        chrome.history.search({ text: '', maxResults: 1000 }, (data) => {
            console.log("history data = ", data);
            _this.add('history', data.length);
            console.log("scc =", _this.sc);
        });
    };

    add(key, value) {
        this.sc[key] = value;
        var maxVal = this.caculate();
        console.log("app.caclutate = ", maxVal, this.LIMIT);
        if (maxVal >= this.LIMIT) {
            console.log("Limit is high");
            iconService.setHighIcon();
        }
        else if (maxVal >= this.LIMIT / 2) {
            console.log("limit is medium");
            iconService.setMedIcon();
        }
        else if (maxVal < this.LIMIT / 2) {
            console.log("limit is low");
            iconService.setLowIcon();
        }
    };

    /**
     * compares each of the configued object values.
     * returns the maximum one
     */
    caculate() {
        var _sc = this.sc;
        return Object.keys(_sc)
            .reduce(function (sum, key) {
                if (typeof _sc[key] === 'number') {
                    sum = ((sum || 0) < _sc[key]) ? _sc[key] : sum;
                }
                return sum;
            }, 0);
    };

    /**   */
    removeCache(callback) {
        var _this = this;

        chrome.storage.sync.get(['reload', 'reloadActive', 'notification', 'cleanAll', 'since'], (r) => {
            console.log(r);
            var since = 0;
            var config = { status: 'complete' };

            /** if cleanALl = true. then since is overridden to 0 */
            if (r.cleanAll) {
                since = 0;
            } else if (parseFloat(r.since) > 0) {
                var millis = 1000 * 60 * 60 * 24 * parseFloat(r.since);
                since = (new Date()).getTime() - millis;
            }

            /** if reloadActive is true. then only active tabs are set */
            if (r.reloadActive) {
                config.active = r.reloadActive;
            }

            if (chrome.browsingData) {
                chrome.browsingData.settings((result) => {
                    console.log("setting = ", result);
                    /** cacheStorage is not supported. removing it*/
                    delete (result.dataToRemove.cacheStorage);
                    console.log(" before result.options.since = ", result.options.since);
                    /** adding since .overrides the default browser settitngs */
                    result.options.since = since;
                    console.log("since = ", since);
                    console.log("result.options.since = ", result.options.since);
                    chrome.browsingData.remove(
                        result.options,
                        result.dataToRemove,
                        () => {
                            console.log("Cache cleared successfully");
                            if (r.reload || r.reloadActive) {
                                _this.reloadTabs(config);
                            }
                            _this.processCallback(callback);
                        });
                });
            } else {
                console.error("Supported browser == Chrome Dev 19.0.1041.0");
            }
        });
    }

    /**
     * 
     */
    removeAll(callback) {
        var _this = this;
        this.removeCache(() => {
            _this.processCallback(callback);
        });
       
    }

    /**
     * reload all tabs
     */
    reloadTabs(config) {
        chrome.tabs.query(config, (tabs) => {
            tabs.forEach((tab) => {
                if (tab.url) {
                    chrome.tabs.update(tab.id, { url: tab.url }, (t) => {
                        console.log('reload finished for tab ', t.id, t.url);
                    });
                }
            });
        });
    }

    processCallback(callback) {
        if (callback && typeof callback === 'function') {
            console.log("callback = ", callback);
            callback();
        }
    }

}//end class

export default new CleanerService();

