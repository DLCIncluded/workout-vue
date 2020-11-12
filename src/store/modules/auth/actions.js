import axios from 'axios'
import router from '@/router/index.js'

export default {
    async checkUsername({ commit }, payload){
        var fd = new FormData();
        fd.append('username', payload.username);
        // console.log(payload.username)
        return axios.post("workoutapi.php?action=checkuser",fd).then(function(response){
            // console.log(response.data)
            if(response.data.error){
                
                commit('setError', response.data.message);            
                return false;
            }else if(response.data.success){
                // console.log("success "+ response.data.message);
                return true;
            }else{
                commit('setError', "Something went wrong, please reach out to the admin");
            }
        })
    },
    async checkEmail({ commit }, payload){
        var fd = new FormData();
        fd.append('email', payload.email);
        // console.log(payload.email)
        return axios.post("workoutapi.php?action=checkemail",fd).then(function(response){
            // console.log(response.data)
            if(response.data.error){
                commit('setError', response.data.message);            
                return false;
            }else if(response.data.success){
                console.log("success "+ response.data.message);
                return true;
            }else{
                console.log(response.data)
                commit('setError', "Something went wrong, please reach out to the admin");
            }
        })
    },
    async login({ commit }, payload){

        var fd = new FormData();
        fd.append('username', payload.username);
        fd.append('password', payload.password);

        
        await axios.post("workoutapi.php?action=login",fd).then(function(response){
            // console.log(response.data)
            if(response.data.error){
                // console.log("error "+ response.data.message);
                commit('setError', response.data.message);
                // window.scrollTo(0,0);
                // v.showMsg('error',response.data.message);
            }else if(response.data.success){
                // console.log("success "+ response.data.message);

                localStorage.id = response.data.id;
                localStorage.username = response.data.username;
                localStorage.email = response.data.email;
                localStorage.token = response.data.token;
                localStorage.expires = response.data.expires;
                
                commit('setAuth', true)//need to set the state loggedIn variable as true
                commit('setSuccess', "Logged in successfully")
                //push user to page
                router.replace('/');
            }else{
                commit('setError', "Something went wrong, please reach out to the admin");
            }
        })
        
    },
    async register({ commit }, payload){

        var fd = new FormData();
        fd.append('username', payload.username);
        fd.append('email', payload.email);
        fd.append('password', payload.password);
        fd.append('gender', payload.gender);
        fd.append('ip', payload.ip);

        await axios.post("workoutapi.php?action=register",fd).then(response => {
            // console.log(response.data)
            if(response.data.error){
                // console.log("error: "+ response.data.message);
                commit('setError', response.data.message);
             
            }else{
                // console.log("success: "+ response.data.message);

                // console.log("id: "+response.data.id);
                // console.log("username: "+response.data.username);
                // console.log("email: "+response.data.email);
                // console.log("token: "+response.data.token);
                // console.log("expires: "+response.data.expires);

                localStorage.id = response.data.id;
                localStorage.username = response.data.username;
                localStorage.email = response.data.email;
                localStorage.token = response.data.token;
                localStorage.expires = response.data.expires;

                commit('setAuth', true)
                commit('setSuccess', response.data.message)
                router.replace('/');
            }
        })
    },

    pageDoneLoading({commit}, payload){
        commit('changeLoading', payload)
    },

    authCheck({ commit, dispatch }){
        // console.log("Has Token: "+!!localStorage.token)
        console.log('checking auth...')
        commit('changeCheckingAuth', true)
        commit('setAuth', !!localStorage.token) 

        //set auth to true if we have a token but we need to verify if it is accurate. 
        //Currently the only way I can get this to work with out it auto logging out
        //its bad practice, but with the db being a bit slow it auto redirects before the check is returned
        if(localStorage.token){
            //we need to check to see if we have a token, if we do, we should attempt to relogin
            console.log('verifying token in local storage...')

            var fd = new FormData();
            fd.append('username', localStorage.username);
            fd.append('token', localStorage.token);
            fd.append('expires', localStorage.expires);
            fd.append('relogin', true);

            axios.post("workoutapi.php?action=login",fd).then(function(response){
                console.log('sending token to api')
                if(response.data.error){
                    // console.log("token invalid");
                    console.log(response.data)
                    dispatch('logout', {type: 'error', msg: 'Session Invalid, please login again.'});
                    commit('changeCheckingAuth', false)
                }else{
                    // console.log("token valid");
                    // console.log(response.data)                        
                    commit('setAuth', true)
                    commit('changeCheckingAuth', false)
                }
                
            })            
        }else{
            commit('changeCheckingAuth', false)
        }
    },

    clearMsg({commit}, msg){
        commit('clearMsg', msg)
    },

    setMsg({commit}, msg){
        if (msg.type == 'success'){
            commit('setSuccess', msg.msg)
        }else if(msg.type == 'error'){
            commit('setError', msg.msg)
        }
    },

    async logout({commit},payload){
        
        var fd = new FormData();
        fd.append('username', localStorage.username); //get username before we destroy it
        // console.log(localStorage.username)
        
        await axios.post("workoutapi.php?action=logout",fd).then(function(response){
            // console.log(response.data)
            if(response.data.error){
                console.log(response.data.error);
                commit('changeCheckingAuth', false)
            }else{
                console.log(response.data.message)                        
                commit('setAuth', true)
                commit('changeCheckingAuth', false)
            }
            
        })

        if(payload){ // allow the sending of custom messages
            if (payload.type == 'error'){ 
                commit('setError', payload.msg);
            }else if(payload.type == 'success'){
                commit('setSuccess', payload.msg);
            }
        }else{
            commit('setSuccess', "Logged Out Successfully")
        }


        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("expires");

        commit('logout');
        
        router.replace('/');
    }
    
    // signup(context, payload){

    // }

};