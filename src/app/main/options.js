import '../assets/scss/app.scss';

import optionService from '../services/OptionService'


optionService.renderAllSyncValues('reload', 'notif','cleanAll','since','range');
// optionService.renderStatesOnChange('reload', 'notif','cleanAll','since','range');
optionService.syncAllChanges('reload', 'notif','cleanAll','since','range');
// optionService.toggleClassOnChange( 'since','rg-1', 'custom-range-v1','custom-range-v2');



