<template>
  <div class="workout-container">
    <div class="workout-container__workout-box" v-for="(workoutday,index) in workout" v-bind:key="index">
      {{workoutday.name}}
      <div class="workout-container__workout-box__sets">
        <ul>
          <li v-for="(reps,index) in workoutday.sets" v-bind:key="index">
            {{ reps }}
          </li>
        </ul>
      </div>
    </div>
    {{ dayOfWeek }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      workout: [
        {
          name: "bench",
          sets: [
            12, 12, 12
          ]
        },
        {
          name: "chest-fly",
          sets: [
            15, 12, 10
          ]
        }
      ]
    }
  },
  computed: {
    dayOfWeek(){
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      return weekday[currentDay]
    }
  }
  
}
</script>

<style lang="scss" scoped>
.workout-container {
  display: flex;
  flex-direction: column;

  &__workout-box {
    background-color: #9D9D9D;
    padding:10px;
    margin:10px auto;
    width: 30%;
  }
}
</style>