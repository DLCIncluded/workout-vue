export default {
    setError(state, msg){
        state.errorMsg = msg;
        setTimeout(function(){
            state.errorMsg = '';
        }, 3000);   
    },
    setSuccess(state,msg){
        state.successMsg = msg;
        setTimeout(function(){
            state.successMsg = '';
        }, 3000);   
    },
    clearMsg(state,msg){
        if(msg == 's'){
            state.successMsg = ''
        }else if(msg == 'e'){
            state.errorMsg = ''
        }
    },
    setAuth(state,msg){
        state.loggedIn = msg;
    },
    logout(state){
        state.loggedIn=false;
    },
    changeLoading(state, payload){
        state.pageLoading = payload;
    },
    changeCheckingAuth(state, payload){
        state.loadingAuth = payload;
    }
    
};