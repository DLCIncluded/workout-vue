<template>
    <div class="msg has-background-danger-dark" v-if="errorMsg">
      <p>{{ errorMsg }}</p> <button type="button" class="delete" aria-hidden="true" @click="clearMsg('error')">&times;</button>
    </div>


    <div class="msg has-background-success-dark" v-if="successMsg">
      {{ successMsg }} <button type="button" class="delete" aria-hidden="true" @click="clearMsg('success')">&times;</button>
    </div>

    <div class="msg placeholder" v-if="!successMsg && !errorMsg">
        <p class="has-text-centered has-text-white title">{{ pageName }} </p>
    </div>
</template>

<script>
export default {
  name:'errors',
  props: ['title'],
  computed: {
    errorMsg() {
        return this.$store.getters.errorGetter;
    }, 
    successMsg() {
        return this.$store.getters.successGetter;
    }, 
    pageName(){
      return this.title;
    },
    
  },
  methods: {
    clearMsg(type){
      if(type == 'error'){
        this.$store.dispatch('clearMsg','e')
      }else if(type =='success'){
        this.$store.dispatch('clearMsg','s')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .msg {
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    width: 100%;
    padding: 20px;
    margin-top:20px;
    margin-bottom:10px;
    color:white;
  }
  .success {
    background-color: green;
    color: white;
    
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .error {
    background-color: red;
    color: white;
    
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .placeholder {
    display: block;
    height: 24px;
    margin-bottom: 34px;
  }
</style>