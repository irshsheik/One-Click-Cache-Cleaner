
/**
 * provide public methods to perform dom actions
 */


class OptionService {
    constructor() {
        this.defaultValue = true;
        this.defaultDuration = 10;
    }

    syncAllChanges(reload, notif, cleanAll, since, range) {
        this.setReload(reload);
        this.setNotification(notif);
        this.setCleanAll(cleanAll);
        this.setSince(since, range);
        this.setRange(range, since);
    }


    setReload(reload) {
        var _this = this;
        var reloadEle = document.getElementById(reload);
        reloadEle.addEventListener('input', () => {
            chrome.storage.sync.set({ reload: reloadEle.checked }, function () {
                console.log('reload Value is set to ' + reloadEle.checked);
            });
        });
    }

    setNotification(notif) {
        var _this = this;
        var notifEle = document.getElementById(notif);
        notifEle.addEventListener('input', () => {
            chrome.storage.sync.set({ notification: notifEle.checked }, function () {
                console.log('notification Value is set to ' + notifEle.checked);
            });
        });
    }

    setCleanAll(cleanAll) {
        var _this = this;
        var cleanAllEle = document.getElementById(cleanAll);
        cleanAllEle.addEventListener('input', () => {
            chrome.storage.sync.set({ cleanAll: cleanAllEle.checked }, function () {
                console.log('cleanAll Value is set to ' + cleanAllEle.checked);
            });
        });
    }

    setSince(since) {
        var _this = this;
        var sinceEle = document.getElementById(since);
        sinceEle.addEventListener('input', () => {
            chrome.storage.sync.get(['cleanAll'], (r) => {
                if (!r.cleanAll) {
                    chrome.storage.sync.set({ since: sinceEle.value }, function () {
                        console.log('since Value is set to ' + sinceEle.value);
                    });
                }
            });
        });
    }
    setRange(range) {
        var _this = this;
        var rangeEle = document.getElementById(range);
        rangeEle.addEventListener('input', () => {
            chrome.storage.sync.get(['cleanAll'], (r) => {
                if (!r.cleanAll) {
                    chrome.storage.sync.set({ since: rangeEle.value }, function () {
                        console.log('since/range Value is set to ' + rangeEle.value);
                    });
                }
            });
        });
    }

    renderStatesOnChange(reload, notif, cleanAll, since, range) {
        var _this = this;
        chrome.storage.onChanged.addListener((o, areaName) => {
            if (areaName === 'sync') {
                if (o.reload) {
                    _this.renderReloadState(reload, o.reload.newValue);
                }
                else if (o.notification) {
                    _this.renderNotificationState(notif, o.notification.newValue);
                }
                else if (o.cleanAll) {
                    _this.renderCleanAllState(cleanAll, o.cleanAll.newValue);
                }
                else if (o.since) {
                    _this.renderSinceState(since, o.since.newValue);
                    _this.renderRangeState(range, o.since.newValue);
                }
            }
        });
    }


    renderAllSyncValues(reload, notif, cleanAll, since, range) {
        /** set default UI values from memory */
        var reloadEle = document.getElementById(reload);
        var notifEle = document.getElementById(notif);
        var cleanAllEle = document.getElementById(cleanAll);
        var sinceEle = document.getElementById(since);
        var rangeEle = document.getElementById(range);

        chrome.storage.sync.get(['reload', 'notification', 'cleanAll', 'since'], (r) => {
            console.log(r);
            reloadEle.checked = r.reload;
            notifEle.checked = r.notification;
            cleanAllEle.checked = r.cleanAll;
            sinceEle.value = r.since;
            rangeEle.value = r.since;
        });
    }

    renderReloadState(reload, value) {
        var reloadEle = document.getElementById(reload);
        reloadEle.checked = value;
    }
    renderNotificationState(notif, value) {
        var notifEle = document.getElementById(notif);
        notifEle.checked = value;
    }
    renderCleanAllState(cleanAll, value) {
        var cleanAllEle = document.getElementById(cleanAll);
        cleanAllEle.checked = value;
    }
    renderSinceState(since, value) {
        var sinceEle = document.getElementById(since);
        sinceEle.value = value;
    }
    renderRangeState(range, value) {
        var rangeEle = document.getElementById(range);
        rangeEle.value = value
    }



    /**
     *  rangeId    */
    // toggleClassOnChange(sinceId, rangeId, clsToRemove, clsToAdd) {
    //     var _this = this;
    //     var since = document.getElementById(sinceId);
    //     var range = document.getElementById(rangeId);
    //     range.addEventListener('input', () => {
    //         since.value = range.value;
    //         _this.toggle(range, clsToRemove, clsToAdd);
    //     });
    //     since.addEventListener('input', () => {
    //         range.value = since.value;
    //         _this.toggle(range, clsToRemove, clsToAdd);
    //     });
    // }

    // toggle(e, clsToRemove, clsToAdd) {
    //     if (parseFloat(e.value) >= 0) {
    //         e.classList.remove(clsToRemove);
    //         e.classList.add(clsToAdd);
    //     }
    //     else if (parseFloat(e.value) === 0) {
    //         e.classList.remove(clsToAdd);
    //         e.classList.add(clsToRemove);
    //     }
    // }

    setDefaults() {
        var _this = this;
        chrome.storage.sync.set({ reload: _this.defaultValue }, function () {
            console.log('reload Value is set to ' + _this.defaultValue);
        });
        chrome.storage.sync.set({ notification: _this.defaultValue }, function () {
            console.log('reload Value is set to ' + _this.defaultValue);
        });
        chrome.storage.sync.set({ cleanAll: _this.defaultValue }, function () {
            console.log('reload Value is set to ' + _this.defaultValue);
        });
        chrome.storage.sync.set({ since: _this.defaultDuration }, function () {
            console.log('reload Value is set to ' + _this.defaultDuration);
        });

    }

}
export default new OptionService();