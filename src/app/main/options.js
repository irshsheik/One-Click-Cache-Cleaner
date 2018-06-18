import '../assets/scss/app.scss';
import OptionService from '../services/OptionService'

var reloadEle = document.getElementById('reload');
var reloadActiveEle = document.getElementById('reload-active');
var notifEle = document.getElementById('notif');
var cleanAllEle = document.getElementById('cleanAll');
var sinceEle = document.getElementById('since');
var rangeEle = document.getElementById('range');
var maxLimitEle = document.getElementById('max-limit');
var clearNowEle = document.getElementById('clean-now');


new OptionService(reloadEle, reloadActiveEle, notifEle, cleanAllEle, sinceEle, rangeEle, maxLimitEle, clearNowEle)
.renderAllSyncValues(function(_this){
    _this.syncAllChanges();
    _this.renderStatesOnChange();
    _this.processClearCache();
});






