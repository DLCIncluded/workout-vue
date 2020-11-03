<template>
  <div class="container">
    <errors title="About"/>
    <div class="card mb-3">
      <div class="card-header">
        <p class="title is-3 has-text-weight-normal card-header-title has-text-white">About this app</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <p class="subtitle is-4 has-text-white">Workout App</p>
          <p>I have created this tracker as a means of furthering my proficiency with web development as well as to create a workout tracker app that I both enjoy using, and has the features I want / needed that I could not find in an all in one solution that I enjoyed using. </p>
          
          <p>This tracker is fairly easy to use. The main way of using it has you follow a Push Pull Legs workout split, aka PPL. Currently if you go to the "Workout" link above, you will be taken to the workout I will follow today.</p>
          
          <ul>
            <li>Monday & Thursday Push</li>
            <li>Tuesday & Friday Pull</li>
            <li>Wednesday & Saturday Legs</li>
            <li>Rest</li>
          </ul>
          
          <p>This is a 6 day split. You can also follow the same plan, but do 3 days, by going under More and selecting the workout you wish to do. I set no default weights, only reps, so you can follow at your 'pace'</p>

          <p>Coming Soon...</p>
          
          <ul>
            <li>Custom workouts</li>
            <li>Guided workouts</li>
            <li>?? something awesome ??</li>
          </ul>

          <hr>
          <p class="subtitle is-4 has-text-white">Project Info</p>

          <p>
            Project developed to improve proficiency with HTML, CSS/SCSS, PHP, MySQL, and VueJs.
          </p>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'About',
  components: {
    
  }
}
</script>
