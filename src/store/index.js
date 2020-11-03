import { createStore } from 'vuex'

import authModule from './modules/auth/index.js'
// import errorHandler from './modules/errorHandler/index.js'

const store = createStore({
  state(){
    return {
      errorMsg: "",
      successMsg: "",
    };
  },
  modules: {
    auth: authModule,
    // errorHandler: errorHandler
  }
});

export default store;