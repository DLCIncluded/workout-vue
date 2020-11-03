<template>
  <div class="container">
    <errors title="History"/>


    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Workout History</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">

          <div class="date-form">
            <p>Select the date you wish to view, and we will also pull the previous week as well. More 'reports' will hopefully come in the future.</p>
            <input type="date" v-model="myDate" class="input is-info mb-3 mr-3" style="width:50%"/>

            <button @click="getWorkouts(myDate)" class="button is-link">Pull Workout</button>
          </div>

          <hr>
          <div class="columns is-mobile">
            <div class="column">
              <h1 class="title has-text-link mb-1" v-if="workout!=''">Workout</h1>
              <p v-if="workout!=''">{{myDate}}</p>
              <div class="mb-3" v-for="(excersize,index) in workout" :key="index">
                <p class="subtitle has-text-link mb-1">{{excersize.displayName}}</p>
                <div v-for="(set,index) in JSON.parse(excersize.setsinfo)" :key="index">
                  Reps: {{set.reps}} - Weight: {{set.weight}}
                  <!-- {{reps}} -->
                </div>
              </div>
            </div>
            <div class="column">
              <h1 class="title has-text-link mb-1" v-if="lastWorkout!=''">Previous Week</h1>
              <p v-if="lastWorkout!=''">{{ myPastDate }}</p>
              <div class="mb-3" v-for="(excersize,index) in lastWorkout" :key="index">
                <p class="subtitle has-text-link mb-1">{{excersize.displayName}}</p>
                <div v-for="(set,index) in JSON.parse(excersize.setsinfo)" :key="index">
                  Reps: {{set.reps}} - Weight: {{set.weight}}
                  <!-- {{reps}} -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data: function(){
    return {
      successMsg: '',
      errorMsg: '',
      workout: '',
      lastWorkout: '',
      myDate: new Date(),
      myPastDate: new Date()
    }
  },
  computed: {
    userID(){
      return localStorage.id;
    }
  },
  created:function(){
    this.formatDate(this.myDate);
    this.getWorkouts(this.myDate);
  },
  methods: {
    getWorkouts(pullDate) {
      var v = this;
      v.workout = ''
      v.lastWorkout = ''
      // var pull = pullDate; //set as argument eventually
      //var pullDate = "2020-10-03";//set for now to test need to properly figure out how to pass in date
      
      axios.get("workoutapi.php?action=history&date="+pullDate+"&id="+v.userID).then(function(response){
        // console.log(response.data)
        v.myPastDate = response.data.prev
        if(response.data.error){
          // console.log("error "+ response.data.message);
          v.showMsg('error',response.data.message);
        }else{
          // console.log("success "+ response.data.workout);
          v.workout = response.data.workout
          v.lastWorkout = response.data.prevworkout
          v.showMsg('success',response.data.message);

        }
      })
    },
    showMsg(type,msg) {
      this.$store.dispatch('setMsg',{type:type, msg:msg})
    },
    formatDate(date){
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      this.myDate = [year, month, day].join('-');
    },
  }
}
</script>

<style lang="scss" scoped>
.workout-container {
  display: flex;
  flex-direction: column;

  &__workout-box {
    border-radius: 10px;
    background-color: #9D9D9D;
    padding:10px;
    margin:10px auto;
    width: 80%;

    &__sets {
      list-style-type: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin:0;
      padding: 0;

      &__reps{
        background-color: red;
        width: 20px;
        height: 20px;
        line-height: 20px;

        padding: 25px;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
      }
      
    }

  }
}

</style>