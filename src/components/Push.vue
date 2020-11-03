<template>
  <div class="container">
    
    <errors :title="pageName"/>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Bench Press</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <ul class="sets">
            <li v-for="(sets,index) in benchpress" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Overhead Press</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <ul class="sets">
            <li v-for="(sets,index) in overheadpress" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Incline DB Press</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <ul class="sets">
            <li v-for="(sets,index) in inclinedbpress" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Superset 1</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white has-bottom-border-white">
          <p>Cable Fly</p>
          <ul class="sets">
            <li v-for="(sets,index) in cablefly" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
        <div class="content has-text-white">
          <p>Tricep Pushdown</p>
          <ul class="sets">
            <li v-for="(sets,index) in triceppushdown" :key="index" class="button is-rounded is-info mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Superset 2</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white  has-bottom-border-white">
          <p>Tricep French Press</p>
          <ul class="sets">
            <li v-for="(sets,index) in tricepfrenchpress" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      
        <div class="content has-text-white">
          <p>Lat Raise</p>
          <ul class="sets">
            <li v-for="(sets,index) in latraise" :key="index" class="button is-rounded is-info mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Save</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white has-text-centered">
          <button class="button is-link is-rounded" @click="toggleDebug()" v-if="!showDebug">Debug</button>
          <button class="button is-link is-rounded" @click="toggleDebug()" v-if="showDebug">Hide</button><br>
          <div class="debugging" v-if="showDebug">
            <br>
            benchpress:
            {{ benchpress }}
            <br><br>
            overheadpress:
            {{ overheadpress }}
            <br><br>
            inclinedbpress:
            {{ inclinedbpress }}
            <br><br>
            cablefly:
            {{ cablefly }}
            <br><br>
            triceppushdown:
            {{ triceppushdown }}
            <br><br>
            tricepfrenchpress:
            {{ tricepfrenchpress }}
            <br><br>
            latraise:
            {{ latraise }}
            <br><br>
          </div><br>
          <div class="has-text-centered">
            <button class="button is-link is-rounded" @click="saveInfo()">Save</button>
          </div>
        </div>
      </div>
    </div>

  </div>

    <div class="modal" v-if="modalOpen" :class="{ 'is-active': modalOpen }">
    <div class="modal-background" @click="toggleModal()">
    </div>

    <div class="modal-card">
      <div class="modal-card-head">
        <p class="modal-card-title has-text-white">Edit</p>
        <button class="delete" aria-label="close" @click="toggleModal()"></button>
      </div>
    
      <div class="modal-card-body">
        <div class="field">
          <label class="label has-text-white" for="reps">Reps</label>
          <input class="input is-info" type="number" @focus="$event.target.select()" name="reps" v-model="currentlyEditing.reps"/>
        </div>
        <div class="field">
          <label class="label has-text-white" for="weight">Weight</label>
          <input class="input is-info" type="number" @focus="$event.target.select()" name="weight" v-model="currentlyEditing.weight"/>
        </div>
        <!-- <button class="" @click="toggleModal()">Done</button> -->
      </div>
      
      <div class="modal-card-foot">
        <button class="button is-success" @click="toggleModal()">Save changes</button>
      </div>
    </div>

 
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Legs",
  data() {
    return {
      pageName: "Push",
      modalOpen:false,
      showDebug: false,
      benchpress: [
        {
          "reps":10,
          "weight": 0
        },
        {
          "reps":10,
          "weight": 0
        },
        {
          "reps":10,
          "weight": 0
        },
      ],
      overheadpress: [
        {
          "reps":8,
          "weight": 0
        },
        {
          "reps":8,
          "weight": 0
        },
        {
          "reps":8,
          "weight": 0
        }
      ],
      inclinedbpress: [
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":10,
          "weight": 0
        },
        {
          "reps":8,
          "weight": 0
        },
      ],
      triceppushdown: [
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
      ],
      cablefly: [
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
      ],
      tricepfrenchpress: [
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
      ],
      latraise: [
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
        {
          "reps":12,
          "weight": 0
        },
      ],
      data: '',
      errorMsg: '',
      successMsg: ''
    }
  },
  methods: {
    setCurrent(edit){
      var v = this;
      v.currentlyEditing = edit;
    },
    toggleModal() {
      if(this.modalOpen){
        this.modalOpen = false
      }else{
        this.modalOpen = true
      }
    },
    toggleDebug() {
      this.showDebug = !this.showDebug;
    },
    toFormData(obj){
      var fd = new FormData();
      fd.append('data', JSON.stringify(obj));
      return fd;
    },
    saveInfo(){
      var v = this;//this is out of scope set it as a variable
      //var formData = v.toFormData(v.benchpress);
      var fd = new FormData();
      fd.append('benchpress', JSON.stringify(v.benchpress));
      fd.append('overheadpress', JSON.stringify(v.overheadpress));
      fd.append('inclinedbpress', JSON.stringify(v.inclinedbpress));
      fd.append('cablefly', JSON.stringify(v.cablefly));
      fd.append('triceppushdown', JSON.stringify(v.triceppushdown));
      fd.append('tricepfrenchpress', JSON.stringify(v.tricepfrenchpress));
      fd.append('latraise', JSON.stringify(v.latraise));

      axios.post("workoutapi.php?action=save&day=push&id="+localStorage.id,fd).then(function(response){
        // v.currentUser = {};
        console.log(response.data)
        if(response.data.error){
          // console.log("error "+ response.data.message);
          v.$store.dispatch('setMsg', {type:'error', msg: response.data.message})
          window.scrollTo(0,0);
        }else{
          // console.log("success "+ response.data.message);
          v.$store.dispatch('setMsg', {type:'success', msg: response.data.message})
          window.scrollTo(0,0);
        }
      })      
    },
  }
  
}
</script>

<style lang="scss">

</style>