<template>
  <div class="container"  v-if="workoutMenu">
    
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

  <div class="container" v-if="cardioPrompt">
    <errors title="Cardio" />

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Cardio</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          Would you like to enter Cardio?
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-success" @click="showCardioMenu">Yes</button>
            </div>
            <div class="control">
              <button class="button is-success" @click="goToHistory">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container" v-if="cardioMenu">
    <errors title="Cardio" />

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Cardio</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">

          <div class="field">
            <label class="label has-text-white" for="cardiotype">Cardio Type: </label>
            <div class="control has-icons-left has-icons-right">
                <select class="input is-info" name="cardiotype" id="cardiotype" v-model="cardioType">
                  <option value="Treadmill">Treadmill</option>
                  <option value="Stairmaster">Stairmaster</option>
                  <option value="Bike">Bike</option>
                  <option value="Other">Other</option>
                </select>
                <span class="icon is-small is-right">
                  <i class="fas fa-running"></i>
                </span>

                
                <span class="icon is-small is-left">
                  <i class="fas fa-chevron-circle-down"></i>
                </span>
            </div>
          </div>

          <div class="field">
            <div class="label">
              <label class="label has-text-white" >Time:</label>
            </div>

            
            <div class="control has-icons-right is-expanded">
                <input class="input is-info" type="number" name="cardiotimemin" id="cardiotimemin" placeholder="Minutes" v-model="cardioTime">
                <span class="icon is-small is-right">
                  <i class="fas fa-stopwatch"></i>
                </span>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white" for="cardioincline">Incline/Resistance: </label>
            <div class="control has-icons-right">
                <input class="input is-info" type="number" name="cardioincline" id="cardioincline" placeholder="%" v-model="cardioIncline">
                <span class="icon is-small is-right">
                  <i class="fas fa-heartbeat"></i>
                </span>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white" for="cardiocalories">Calories: </label>
            <div class="control has-icons-right">
                <input class="input is-info" type="number" name="cardiocalories" id="cardiocalories" placeholder="Calories" v-model="cardioCalories">
                <span class="icon is-small is-right">
                  <i class="fas fa-fire"></i>
                </span>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-success" @click="saveCardio">Save</button>
            </div>
            <div class="control">
              <button class="button is-success" @click="goToHistory">Cancel</button>
            </div>
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
          <input class="input is-info" type="number" @focus="$event.target.select()" ref='weight' name="weight" v-model="currentlyEditing.weight"/>
        </div>
        
        <div>
          <button class="button is-info is-small" @click="toggleCalc" v-if="!showCalc">Weight Calc</button>
          <p class="has-text-white" v-if="showCalc">Plate Calculator - assumes plate added per side</p>
          <div v-if="showCalc" class="calc">
            <div class="calc-buttons">
              <button class="button is-info is-small mr-2" @click="addWeight(45)">Olympic Bar</button>
              <button class="button is-info is-small mr-2" @click="addWeight(20)">PlanetFitness Bar</button>
              <br><br>
              <button class="button is-info is-small mr-2" @click="addWeight(90)">Add 45s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(50)">Add 25s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(20)">Add 10s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(10)">Add 5s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(5)">Add 2.5s</button>
              <br><br>
              <button class="button is-info is-small mr-2" @click="addWeight(-90)">Sub 45s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(-50)">Sub 25s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(-20)">Sub 10s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(-10)">Sub 5s</button>
              <button class="button is-info is-small mr-2" @click="addWeight(-5)">Sub 2.5s</button>
              <br><br>
              <button class="button is-info is-small" @click="toggleCalc">Close</button>
            </div>
            <div class="title is-1 has-text-white calc-value" v-if="showCalc">={{plateCalc}}</div>
          </div>
        </div>
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
      workoutMenu:true,
      cardioPrompt:false,
      cardioMenu:false,
      cardioType: 'Treadmill',//default to treadmill
      cardioTime: null,
      cardioIncline: null,
      cardioCalories: null,
      showCalc: false,
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
      successMsg: '',
      plateCalc:0
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
    toggleCalc() {
      this.showCalc = !this.showCalc;
    },
    toFormData(obj){
      var fd = new FormData();
      fd.append('data', JSON.stringify(obj));
      return fd;
    },
    addWeight(w){
      this.plateCalc = this.plateCalc +w;
      if(this.plateCalc < 0){
        this.plateCalc = 0;
      }
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
          v.workoutMenu = false;
          v.cardioPrompt = true;
        }
      })      
    },
    showCardioMenu(){
      this.cardioPrompt = false;
      this.cardioMenu = true;
    },
    goToHistory(){
      this.$router.replace('/history');
    },
    saveCardio(){
      var v = this;
      var fd = new FormData();
      fd.append('userid', localStorage.id);
      fd.append('cardioType', v.cardioType);
      fd.append('cardioTime', v.cardioTime);
      fd.append('cardioIncline', v.cardioIncline);
      fd.append('cardioCalories', v.cardioCalories);

      axios.post("workoutapi.php?action=savecardio",fd).then(function(response){
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
          setTimeout(function(){
            v.$router.replace('/history')
          }, 1500); 
        }
      })
    },
  }
  
}
</script>

<style lang="scss">
.calc{
  display:flex;
  justify-content: space-between;
}
</style>