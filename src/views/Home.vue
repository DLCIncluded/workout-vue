<template>
  <div class="container">

    <errors title="Home"/>
    
    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Home</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <p>Hello world </p>
        </div>
      </div>
    </div>



  </div>
      <!-- <base-card>
      <p>test</p>
    </base-card> -->
    <!-- <page-loading-spinner/> -->
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      successMsg:"test"
    }
  },
  computed: {
    fuck(){
      return this.$store.getters.fuckGetter;
    }
  },
  components: {

  }
}
</script>
