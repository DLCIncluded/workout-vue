<template>
  <Push v-if="today==1 || today==4"/>
  <Pull v-if="today==2 || today==5"/>
  <Legs v-if="today==3 || today==6"/>
  <div class="container" v-if="today==0">
    <errors title="Rest Day"/>
    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Rest Day</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          Today is a rest day, enjoy!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Push from "../components/Push";
import Pull from "../components/Pull";
import Legs from "../components/Legs";

export default {
  data: function(){
    return {
      today: 1
    }
  },
  created:function() {
    this.getDay();
  },
  components: {
    Push,
    Pull,
    Legs
  },
  methods:{
    getDay(){
      var date = new Date();
      var day = date.getDay();
      this.today = day;
    }
  }
}
</script>
