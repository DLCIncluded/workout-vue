import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            fuck: 'fuck this',
            successMsg: '',
            errorMsg: '',
            registered: false,
            loggedIn: false,
            pageLoading: true,
            loadingAuth: false,
        };
    },
    mutations:mutations,
    actions:actions,
    getters:getters,
};