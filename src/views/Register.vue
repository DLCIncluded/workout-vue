<template>
    <div class="container">
        <errors :title="pageName"/>

        <div class="card mb-3" >
            <div class="card-header">
                <p class="card-header-title has-text-white">Register</p>
            </div>
            <div class="card-content">
                <div class="content has-text-white" v-if="isLoading">
                    <base-spinner/>
                </div>
                <form @submit.prevent="register">
                    <div class="content has-text-white">
                        <div class="field">
                            <label class="label has-text-white">Username</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" :class="[userAvail ? 'is-primary' : 'is-danger']" placeholder="Username" v-model="username" @blur="checkUsername">
                                <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check has-text-success" v-if="userAvail"></i>
                                    <i class="fas fa-times has-text-danger" v-else></i>
                                </span>
                            </div>
                            <!-- <p class="help is-success">This username is available</p> -->
                        </div>
                        
                        <div class="field">
                            <label class="label has-text-white">Email</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input is-primary" type="email" :class="[emailAvail ? 'is-primary' : 'is-danger']" placeholder="Email" v-model="email" @blur="checkEmail">
                                <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check has-text-success" v-if="emailAvail"></i>
                                    <i class="fas fa-times has-text-danger" v-else></i>
                                </span>
                            </div>
                            <!-- <p class="help is-success">This username is available</p> -->
                        </div>
                        
                        <div class="field">
                            <label class="label has-text-white">Password <a @click.prevent="pwReqToggle" class="pwReqToggle">?</a></label> 
                            <div class="pw-req" v-if="pwReqShow">
                                <p>Password Requirements:</p>
                                <ul>
                                    <li>Min. Length: 8 - Max Length: 255</li>
                                    <li>At least one of each:</li>
                                    <ul>
                                        <li>Upper Case Letter</li>
                                        <li>Lower Case Letter</li>
                                        <li>Number</li>
                                        <li>Special Character</li>
                                    </ul>
                                </ul>   
                                <button class="button is-primary is-small" @click.prevent="pwReqToggle">Close</button>
                            </div>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input is-primary" :type="pw1" placeholder="Password" v-model="password" @blur="resetPW">
                                <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                                </span>
                                <span class="icon is-small is-right">
                                <i class="far fa-eye fav-icon" @click.prevent="toggleViewPW1"></i>
                                </span>
                            </div>
                            <!-- <p class="help is-success">This username is available</p> -->
                        </div>

                        <div class="field">
                            <label class="label has-text-white">Repeat </label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input is-primary" :type="pw2" placeholder="Repeat Password" v-model="repeatPassword" @blur="resetPW">
                                <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                                </span>
                                <span class="icon is-small is-right">
                                <i class="far fa-eye fav-icon" @click.prevent="toggleViewPW2"></i>
                                </span>
                            </div>
                            <!-- <p class="help is-success">This username is available</p> -->
                        </div>

                        <div class="field">
                            <label class="label has-text-white">Gender</label>
                            <div class="control has-icons-left has-icons-right">
                                <label class="radio has-text-white"><input type="radio" v-model="gender" value="male" name="male" checked/> Male</label>
                                <label class="radio has-text-white"><input type="radio" v-model="gender" value="female" name="female"/> Female</label>
                                <label class="radio has-text-white"><input type="radio" v-model="gender" value="other" name="other"/> Other</label>
                            </div>
                        </div>

                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link" type="submit">Submit</button>
                            </div>
                            <div class="control">
                                <router-link to="/" class="button is-link is-light">Cancel</router-link>
                            </div>
                        </div>
                        <!-- <div class="debug">
                            Debugging info: <br>
                            username: {{ username }}<br>
                            email: {{ email }}<br>
                            password: {{ password }}<br>
                            gender: {{ gender }}<br>
                        </div> -->
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'register',
    data: function(){
        return {
            pageName:'Register',
            username:'',
            email:'',
            password:'',
            repeatPassword:'',
            gender:'male',
            ip:'',
            isLoading:false,
            pwReqShow: false,
            pw1: 'password',
            pw2: 'password',
            userAvail: true,
            emailAvail: true
        }
    },
    computed: {
        isRegistered() {
            return this.$store.getters.registeredGetter;
        }  
    },
    methods: {
        pwReqToggle(){
            this.pwReqShow=!this.pwReqShow
        },
        async checkUsername(){
            var v=this;
            v.userAvail = await this.$store.dispatch('checkUsername',{username: v.username})
        },
        async checkEmail(){
            var v=this;
            v.emailAvail = await this.$store.dispatch('checkEmail',{email: v.email})
        },
        register() {
            var v = this;
            v.$store.dispatch('clearMsg','e')
            v.$store.dispatch('clearMsg','s')
            
            if(this.password != this.repeatPassword){
                var pass_error = "Passwords do not match.";
                v.$store.dispatch('setMsg',{type: 'error',msg:pass_error})
                return;// stop right her if pws do not match
            }
            if(this.username == '' || this.username == ' '){
                var username_error = "Username is required, and cannot be blank.";
                v.$store.dispatch('setMsg',{type: 'error',msg:username_error})
                return;// stop right her if pws do not match
            }
            if(this.password == '' || this.password == ' '){
                var password_error = "Password is required, and cannot be blank.";
                v.$store.dispatch('setMsg',{type: 'error',msg:password_error})
                return;// stop right her if pws do not match
            }
            if(this.repeatPassword == '' || this.repeatPassword == ' '){
                var password2_error = "Password Repeat is required, and cannot be blank.";
                v.$store.dispatch('setMsg',{type: 'error',msg:password2_error})
                return;// stop right her if pws do not match
            }

            v.isLoading = true;
            

            v.$store.dispatch('register', {
                username: v.username,
                password: v.password,
                email: v.email,
                gender: v.gender,
                ip: v.ip
            }).then(()=> {
                v.isLoading = false
            });
        },
        resetPW(){
            this.pw1='password'
            this.pw2='password'
        },
        toggleViewPW1(){
            if(this.pw1 == 'text'){
                this.pw1='password'
            }else{
                this.pw1='text'
            }
        },
        toggleViewPW2(){
            if(this.pw2 == 'text'){
                this.pw2='password'
            }else{
                this.pw2='text'
            }
        }
    }
}
</script>

<style lang="scss">
    .pwReqToggle {
        font-weight: bolder;
        text-shadow: 1px 1px 2px rgb(146, 146, 146);
        color: #a98aff ;
        padding-left:4px;
        padding-right:4px
    }
    .pw-req {
        padding:10px;
        background-color: #444444;
        margin-bottom: 20px;
        border-radius: 15px;
        // border-bottom-right-radius: 20px;
        // border-bottom-left-radius: 20px;
        line-height: 20px;
        p{
            margin: 0!important;
            padding:0!important;
        }
        ul{
            top:0;
            padding-top: 0!important;
            margin-top:0!important;

            li{
                padding-top: 0!important;
                margin-top:0!important;
            }
        }
    }
</style>