export default {
    fuckGetter(state){
        return state.fuck;
    },
    successGetter(state){
        return state.successMsg;
    },
    errorGetter(state){
        return state.errorMsg;
    },
    registeredGetter(state){
        return state.registered;
    },
    authGetter(state){
        return state.loggedIn;
    },
    loadingGetter(state){
        return state.pageLoading;
    },
    checkingAuth(state){
        return state.loadingAuth;
    }
};