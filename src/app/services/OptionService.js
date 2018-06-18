
/**
 * provide public methods to perform dom actions
 */


class OptionService {
    /**
     * 
     * @param {*} reload the reload element
     * @param {*} notif the notification element
     * @param {*} cleanAll the cleanAll element
     * @param {*} since  the since input element
     * @param {*} range the range element
     */
    constructor(reload, notif, cleanAll, since, range) {
        this.defaultValue = true;
        this.defaultDuration = 10;
        this.reloadEle = reload;
        this.notifEle = notif;
        this.cleanAllEle = cleanAll;
        this.sinceEle = since;
        this.rangeEle = range;
    }

        /**
     * renders all the options values on reload
     */
    renderAllSyncValues(callback) {
        var _this = this;
        chrome.storage.sync.get(['reload', 'notification', 'cleanAll', 'since'], (r) => {
            console.log(r);
            _this.reloadEle.checked = r.reload;
            _this.notifEle.checked = r.notification;
            _this.cleanAllEle.checked = r.cleanAll;
            _this.sinceEle.value = r.since;
            _this.rangeEle.value = r.since;
            _this.toggleRangeClass(r.since,'custom-range-v1','custom-range-v2');
            _this.disbleRange_Since();

            if( callback  && typeof callback == 'function'){
                callback();
            }
        });
    }

    /** set the values to storage values upon a change in option */
    syncAllChanges() {
        this.setReload();
        this.setNotification();
        this.setCleanAll();
        this.setSince();
        this.setRange();
    }

       /** render states on change */
       renderStatesOnChange() {
        var _this = this;
        chrome.storage.onChanged.addListener((o, areaName) => {
            console.log("on change listner = ",o, areaName);
            if (areaName === 'sync') {
                if (o.reload) {

                    _this.renderReloadState(o.reload.newValue);
                }
                else if (o.notification) {
                    _this.renderNotificationState( o.notification.newValue);
                }
                else if (o.cleanAll) {
                    _this.renderCleanAllState( o.cleanAll.newValue);
                    _this.disbleRange_Since();
                }
                else if (o.since) {
                    _this.renderSinceState(o.since.newValue);
                    _this.renderRangeState(o.since.newValue);
                    _this.toggleRangeClass(o.since.newValue , 'custom-range-v1', 'custom-range-v2');
                }
            }
        });
    }

    /**set reload on changes */
    setReload() {
        var _this = this;
        _this.reloadEle.addEventListener('input', () => {
            chrome.storage.sync.set({ reload: _this.reloadEle.checked }, function () {
                console.log('reload Value is set to ' + _this.reloadEle.checked);
            });
        });
    }

    /**set notification on changes */
    setNotification() {
        var _this = this;
        _this.notifEle.addEventListener('input', () => {
            chrome.storage.sync.set({ notification: _this.notifEle.checked }, function () {
                console.log('notification Value is set to ' + _this.notifEle.checked);
            });
        });
    }

    /** set clean on changes */
    setCleanAll() {
        var _this = this;
        _this.cleanAllEle.addEventListener('input', () => {
            chrome.storage.sync.set({ cleanAll: _this.cleanAllEle.checked }, function () {
                console.log('cleanAll Value is set to ' + _this.cleanAllEle.checked);
            });
        });
    }

    /**set Since on changes */
    setSince() {
        var _this = this;
        _this.sinceEle.addEventListener('input', () => {
            var beforeSince =_this.rangeEle.value;
            chrome.storage.sync.get(['cleanAll'], (r) => {
                console.log("check for clean aal", r.cleanAll);
                if (!r.cleanAll) {
                    chrome.storage.sync.set({ since: _this.sinceEle.value }, function () {
                        console.log('since Value is set to ' + _this.sinceEle.value);
                    });
                }else{
                    _this.renderSinceState(beforeSince);
                    _this.renderRangeState(beforeSince);
                }
            });
        });
    }

    /**set range on changes */
    setRange() {
        var _this = this;
        _this.rangeEle.addEventListener('input', () => {
            var beforeSince =_this.sinceEle.value;
            chrome.storage.sync.get(['cleanAll'], (r) => {
                console.log("check for clean aal", r.cleanAll);
                if (!r.cleanAll) {
                    chrome.storage.sync.set({ since: _this.rangeEle.value }, function () {
                        console.log('since/range Value is set to ' + _this.rangeEle.value);
                    });
                }else{
                    _this.renderSinceState(beforeSince);
                    _this.renderRangeState(beforeSince);
                }
            });
        });
    }

     renderReloadState(value) {
        var _this = this;
        _this.reloadEle.checked = value;
    }
    renderNotificationState(value) {
        var _this = this;
        _this.notifEle.checked = value;
    }
    renderCleanAllState(value) {
        var _this = this;
        _this.cleanAllEle.checked = value;
    }
    renderSinceState(value) {
        var _this = this;
        _this.sinceEle.value = value;
    }
    renderRangeState(value) {
        var _this = this;
        _this.rangeEle.value = value
    }



    toggleRangeClass(value, clsToRemove, clsToAdd) {
        var _this = this;
        if (parseFloat(value) > 0) {
            console.log("toggle on >= ",value)
            _this.rangeEle.classList.remove(clsToRemove);
            _this.rangeEle.classList.add(clsToAdd);
        }
        else if (parseFloat(value) === 0) {
            console.log("toggle on === ", value)
            _this.rangeEle.classList.remove(clsToAdd);
            _this.rangeEle.classList.add(clsToRemove);
        }
    }

    /** disable range and since fields if cleanALl is true */
    disbleRange_Since(){
        var _this = this;
        if(_this.cleanAllEle.checked){
            _this.sinceEle.disabled = true;
            _this.rangeEle.disabled = true;
            _this.toggleRangeClass(0,'custom-range-v1','custom-range-v2');
        }else{
            _this.sinceEle.removeAttribute("disabled");
            _this.rangeEle.removeAttribute("disabled");
            _this.toggleRangeClass(_this.sinceEle.value,'custom-range-v1','custom-range-v2');
        }
    }

    static setDefaults() {
        var defaultValue = true;
        var defaultDuration = 10;
        chrome.storage.sync.set({ reload: defaultValue }, function () {
            console.log('reload Value is set to ' + defaultValue);
        });
        chrome.storage.sync.set({ notification: defaultValue }, function () {
            console.log('reload Value is set to ' + defaultValue);
        });
        chrome.storage.sync.set({ cleanAll: defaultValue }, function () {
            console.log('reload Value is set to ' + defaultValue);
        });
        chrome.storage.sync.set({ since: defaultDuration }, function () {
            console.log('reload Value is set to ' + defaultDuration);
        });

    }

}
export default OptionService;