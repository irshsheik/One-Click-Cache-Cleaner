import '../assets/scss/app.scss';

import OptionService from '../services/OptionService'



var reloadEle = document.getElementById('reload');
var notifEle = document.getElementById('notif');
var cleanAllEle = document.getElementById('cleanAll');
var sinceEle = document.getElementById('since');
var rangeEle = document.getElementById('range');

console.log('reloadEle = ',reloadEle);

var optionService = new OptionService(reloadEle, notifEle,cleanAllEle,sinceEle,rangeEle);
optionService.renderAllSyncValues(()=>{
    optionService.syncAllChanges();
    optionService.renderStatesOnChange();
});





