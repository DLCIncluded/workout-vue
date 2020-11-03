<template>
    <div class="container">
        <errors :title="pageName"/>

        <div class="card mb-3">
        <div class="card-header">
            <p class="card-header-title has-text-white">Login</p>
        </div>
        <div class="card-content">
            <div class="content has-text-white">
                <form @submit.prevent="login">
                    <div class="field">
                        <label class="label has-text-white">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-info" type="text" placeholder="Email or Username" v-model="username">
                            <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                            </span>
                            <!-- <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                            </span> -->
                        </div>
                        <!-- <p class="help is-success">This username is available</p> -->
                    </div>
                    <div class="field">
                        <label class="label has-text-white">Password</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-info" :type="pw" placeholder="password" v-model="password" @blur="resetPW">
                            <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                            </span>
                            <span class="icon is-small is-right" >
                            <i class="far fa-eye fav-icon" @click.prevent="toggleViewPW"> </i>
                            </span>
                        </div>
                        <!-- <p class="help is-success">This username is available</p> -->
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" type="submit">Submit</button>
                        </div>
                        <div class="control">
                            <router-link to="/" class="button is-link is-light">Cancel</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data: function(){
        return {
            pageName: 'Login',
            errorMsg:'',
            successMsg:'',
            username:"",
            password:"",      
            isLoading: true,
            ip: null,
            pw:'password',
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.authGetter;
        },  
    },
    methods: {
        async login(){
            var v=this;
            //clear any error / success message before submitting
            v.$store.dispatch('clearMsg','e')
            v.$store.dispatch('clearMsg','s')

            await v.$store.dispatch('login', {
                username: v.username,
                password: v.password,
            });
        },
        resetPW(){
            this.pw='password'
        },
        toggleViewPW(){
            if(this.pw == 'text'){
                this.pw='password'
            }else{
                this.pw='text'
            }
            
        }
    }
}
</script>

<style lang="scss">

</style>