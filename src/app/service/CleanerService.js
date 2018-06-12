import iconService from '../service/IconService'

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
                         total = total+ ck.length;
                         _this.add('cookies', total);
                    });
            });

            
        });
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
                    sum = ((sum || 0) < _sc[key] ) ? _sc[key] : sum ;
                } 
                return sum;
            }, 0);
    };

    removeHistory(){
        if(chrome.history){
            chrome.history.deleteAll(()=>{
                console.log("History cleared successfully");
            });
        }else{
            console.error("Supported browser == Chrome Dev 19.0.1041.0");
        }
    }

    removeCookies(){
        var _this = this;
        if (chrome.browsingData) {
            chrome.browsingData.settings((result) => {
                console.log("setting = ", result);
                /** cacheStorage is not supported by remove method */
                delete (result.dataToRemove.cacheStorage);
                chrome.browsingData.remove(result.options, result.dataToRemove, () => {
                    console.log("Cache cleared successfully");
                });
            });
        } else {
            console.error("Supported browser == Chrome Dev 19.0.1041.0");
        }
    }

    removeAll(){
        var _this = this;
        _this.removeCookies();
        _this.removeHistory();
        _this.query();
    }


}//end class

export default new CleanerService();

