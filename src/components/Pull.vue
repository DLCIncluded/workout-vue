<template>


  <div class="container" v-if="workoutMenu">
    <errors :title="pageName" />

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Deadlift</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <ul class="sets">
            <li v-for="(sets,index) in deadlift" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Cable Rows</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <ul class="sets">
            <li v-for="(sets,index) in cablerows" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Lat Pull Down</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <ul class="sets">
            <li v-for="(sets,index) in latpulldown" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
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
          <p>Lat Pull Over</p>
          <ul class="sets">
            <li v-for="(sets,index) in latpullover" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
        <div class="content has-text-white">
          <p>Cable Hammer Curl</p>
          <ul class="sets">
            <li v-for="(sets,index) in cablehammercurl" :key="index" class="button is-rounded is-info mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Superset 2</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white has-bottom-border-white">
          <p>Cable Face Pull</p>
          <ul class="sets">
            <li v-for="(sets,index) in cablefacepull" :key="index" class="button is-rounded is-link mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
          </ul>
        </div>
        <div class="content has-text-white">
          <p>Behind-back Cable Curl</p>
          <ul class="sets">
            <li v-for="(sets,index) in behindbackcablecurl" :key="index" class="button is-rounded is-info mb-3" @click="setCurrent(sets);toggleModal();">{{ sets.reps }} @ {{ sets.weight }} lbs</li>
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
            deadlift:
            {{ deadlift }}
            <br><br>
            cablerows:
            {{ cablerows }}
            <br><br>
            latpulldown:
            {{ latpulldown }}
            <br><br>
            latpullover:
            {{ latpullover }}
            <br><br>
            cablehammercurl:
            {{ cablehammercurl }}
            <br><br>
            cablefacepull:
            {{ cablefacepull }}
            <br><br>
            behindbackcablecurl:
            {{ behindbackcablecurl }}<br>
            <button class="button is-link is-rounded" @click="showMsg('success','this is a success message')" v-if="showDebug">Test success</button> | 
            <button class="button is-link is-rounded" @click="showMsg('error','this is an error message')" v-if="showDebug">Test error</button>
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
          <input class="input is-info" type="number" @focus="$event.target.select()" name="weight" v-model="currentlyEditing.weight"/>
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
  name: "Pull",
  data() {
    return {
      pageName: "Pull",
      modalOpen:false,
      showDebug: false,
      workoutMenu:true,
      cardioPrompt:false,
      cardioMenu:false,
      cardioType: 'Treadmill',//default to treadmill
      cardioTime: null,
      cardioIncline: null,
      cardioCalories: null,
      //deadlift
      deadlift: [
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
      cablerows: [
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
        }
      ],
      latpulldown: [
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
        }
      ],
      cablehammercurl: [
        {
          "reps":15,
          "weight": 0
        },
        {
          "reps":15,
          "weight": 0
        },
        {
          "reps":15,
          "weight": 0
        },
      ],
      latpullover: [
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
      cablefacepull: [
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
      behindbackcablecurl: [
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
    showCardioMenu(){
      this.cardioPrompt = false;
      this.cardioMenu = true;
    },
    goToHistory(){
      this.$router.replace('/history');
    },
    toggleDebug() {
      this.showDebug = !this.showDebug;
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
    saveInfo(){
      var v = this;
      //there has to be a better way! -- but im too lazy to find out.... :'(
      var fd = new FormData();
      fd.append('deadlift', JSON.stringify(v.deadlift));
      fd.append('cablerows', JSON.stringify(v.cablerows));
      fd.append('latpulldown', JSON.stringify(v.latpulldown));
      fd.append('latpullover', JSON.stringify(v.latpullover));
      fd.append('cablehammercurl', JSON.stringify(v.cablehammercurl));
      fd.append('cablefacepull', JSON.stringify(v.cablefacepull));
      fd.append('behindbackcablecurl', JSON.stringify(v.behindbackcablecurl));

      axios.post("workoutapi.php?action=save&day=pull&id="+localStorage.id,fd).then(function(response){
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
  }
  
}
</script>

