<template>
    <div class="container">

        <errors :title="pageName"/>
        
        <div class="card mb-3">
            <div class="card-header">
                <p class="card-header-title has-text-white">Create Workout</p>
            </div>
            <div class="card-content">
                <div class="content has-text-white">
                    <select name="exercise" v-model="newExercise.exercise">
                        <option value="EXERCISE">--EXERCISE--</option>
                        <option v-for="exercise in exercises" :key="exercise.id">{{exercise.name}}</option>
                    </select>
                    <input type="number" name="sets" id="sets" v-model="newExercise.sets">
                    <input type="number" name="reps" id="reps" v-model="newExercise.reps">
                    <button @click="addItem">add</button>
                </div>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-header">
                <p class="card-header-title has-text-white">Preview Your Workout</p>
            </div>
            <div class="card-content">
                <div class="content has-text-white">
                    <div>{{newExercise}}</div>
                    <div>{{customWorkout}}</div>
                    <button @click="reset">asdf</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return{ 
            pageName: "Create Workout",
            exercises: [],
            customWorkout: [],
            newExercise: {
                exercise: 'EXERCISE',
                sets: 0,
                reps: 0
            }
        }
    },
    created() {
        this.getExercises();
    },
    methods: {
        async getExercises() {
            console.log("get exercises")
            var v = this;
            await axios.get("workoutapi.php?action=exercises").then(function(response){
                // console.log(response.data.lists)
                if(response.data.error){
                    console.log(response.data)
                }else{
                    console.log(response.data)
                    v.exercises = response.data.exercises;
                }
            })
        },
        addItem(){
            if(this.newExercise.exercise!="EXERCISE" && this.newExercise.sets!=0 && this.newExercise.reps!=0){
                this.customWorkout.push(this.newExercise);               
            }
            
        },
    }
}
</script>
