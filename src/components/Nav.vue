<template>

    <nav class="navbar is-black" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
        <div class="navbar-item" href="/">
        
        <!-- <img src="./assets/logo-wolf.png" alt="Logo" width="112"> -->
        <router-link to="/">
            <p class="title is-4 has-text-link">DLCWorkout</p>
            <p class="subtitle is-6 has-text-link has-text-centered">tracker</p>
            <!-- <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" > -->
            <!-- <img src="../assets/logo-wolf3.png" alt="Logo" width="112" height="28"> -->
        </router-link>
        </div>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="toggleNav()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu has-background-black" :class="{ 'is-active': isOpen }">
        <div class="navbar-start ">
        <router-link to="/" class="navbar-item" @click="toggleNav()">
            Home
        </router-link>

        <router-link to="/about" class="navbar-item" @click="toggleNav()">
            About
        </router-link>

        <router-link to="/workout" class="navbar-item" @click="toggleNav()">
            Workout
        </router-link>
         
        <!-- <router-link to="/test" class="navbar-item" @click="toggleNav()">
            Test
        </router-link> -->

        <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
            More
            </a>

            <div class="navbar-dropdown has-background-black">
            <router-link to="/push" class="navbar-item" @click="toggleNav()">
                Push
            </router-link>
            <router-link to="/pull" class="navbar-item" @click="toggleNav()">
                Pull
            </router-link>
            <router-link to="/legs" class="navbar-item" @click="toggleNav()">
                Legs
            </router-link>
            <router-link to="/history" class="navbar-item" @click="toggleNav()">
                History
            </router-link>
            <hr class="navbar-divider">
            <a class="navbar-item">
                More to come later
            </a>
            </div>
        </div>
        </div>

        <div class="navbar-end" >
        <div class="navbar-item">
            <div class="buttons" v-if="!isLoggedIn && !isCheckingAuth">
                <router-link to="register" class="button is-link sign-up-btn" @click="toggleNav()">
                    <strong>Sign up</strong>
                </router-link>
                <router-link to="login" class="button is-info is-light" @click="toggleNav()">
                    <strong>Log in</strong>
                </router-link>
            </div>
            <div class="buttons" v-else-if="isLoggedIn && !isCheckingAuth">
                <a class="button is-link" @click.prevent="logout">
                    <strong>Logout</strong>
                </a>
            </div>
            <div v-else>
                <small-loading-spinner>Checking Auth</small-loading-spinner>
            </div>
        </div>
        </div>
    </div>
    </nav>
    
</template>

<script>
// import * as firebase from 'firebase'
// import "firebase/auth"

export default {
    data: function() {
        return {
            isOpen: false,
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.getters.authGetter
        }, 
        isCheckingAuth(){
            return this.$store.getters.checkingAuth
        }
    },
    mounted() {
        
    },
    methods: {
        toggleNav(){
            this.isOpen = !this.isOpen
            console.log('toggle nav')
        },
        logout(){
            this.$store.dispatch('logout')
            this.toggleNav()//fix for mobile
        }
    }
}
</script>