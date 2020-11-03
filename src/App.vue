<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/workout">Workout</router-link> |
    <router-link to="/history">History</router-link>
  </div> -->
  
  <Navbar />
  <router-view/>
  
</template>

<script>
import Navbar from '@/components/Nav.vue'
import axios from 'axios'
export default {
  data: function() {
    return {
      username:"",
      isLoggedIn:'',
      ip: null,
    }
  },
  mounted(){
    // this.$store.dispatch('setLoading',true);
    var v = this;
    axios.post("https://json.geoiplookup.io/").then(function(response){
        // console.log(response.data)
        //console.log(response.data.ip);
        v.ip = response.data.ip;
    })
  },
  created(){
    this.$store.dispatch('authCheck');
    // this.$store.dispatch('setLoading',false);
  },
  methods: {
    
  },
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
html {
  background-color: #212121!important;
}

.navbar {
  .navbar-item{
    color: white;
  }
  
    .router-link-exact-active {
      color: #3273dc!important;
    }

    .sign-up-btn.router-link-exact-active {
      color: white!important; //fix for signup button
    }
}

.card {
  border-radius: 15px;
  background-color: #323232;
}

.card-header {
  background-color: #323232;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px solid white;
}

.card-content {
  background-color: #323232;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.modal-card-head, .modal-card-body, .modal-card-foot {
  background-color: #323232;
}

.sets {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin:0;
  padding: 0;
  flex-wrap: wrap;
  margin-left: 0!important;
  margin-top: 0!important;
  .button{
    min-width: 120px;
  }
}


.logo {
  width:200px;
  height: auto;
}

.has-bottom-border-white {
  border-bottom: 1px white solid;
  padding-bottom: 10px;
}

.fav-icon{ pointer-events: all; cursor:pointer }
</style>
