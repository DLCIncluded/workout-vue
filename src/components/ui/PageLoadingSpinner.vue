<template>
    <div class="modal" v-if="modalOpen" :class="{ 'is-active': modalOpen }">
    <div class="modal-background" @click="toggleModal()">
    </div>

    <div class="modal-card">
      <div class="modal-card-head" style="border-bottom:none">
        <p class="modal-card-title has-text-white has-text-centered">Page Loading...</p>
        
      </div>
    
      <div class="modal-card-body has-text-white">
        <base-spinner/>
      </div>
      
      <div class="modal-card-foot" style="border-top:none">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
    computed:{
      modalOpen() {
        return this.$store.getters.loadingGetter;
      }
    }
}
</script>

