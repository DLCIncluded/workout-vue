<template>
  <div class="container">
    <div class="msg error" v-if="errorMsg">
      {{ errorMsg }} <button type="button" class="close" aria-hidden="true" @click="errorMsg=''">&times;</button>
    </div>


    <div class="msg success" v-if="successMsg">
      {{ successMsg }} <button type="button" class="close" aria-hidden="true" @click="successMsg=''">&times;</button>
    </div>


    <div class="msg placeholder" v-if="!successMsg">
      <p class="has-text-centered has-text-white title">TEST</p>      
    </div>


    <div class="card mb-3" v-for="excersize in workout" v-bind:key="excersize.id">
      <div class="card-header">
        <p class="card-header-title has-text-white">{{ excersize.displayName }}</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          <!-- {{excersize.sets}} -->
          <ul class="sets">
            <li v-for="(set,index) in JSON.parse(excersize.sets)" :key="index" class="button is-rounded is-primary mb-3" @click="setCurrent(set);toggleModal();">{{ set.reps }} @ {{ set.weight }} lbs</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Bench Press</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white">
          {{ workout }}
        </div>
      </div>
    </div>


    <div class="card mb-3">
      <div class="card-header">
        <p class="card-header-title has-text-white">Calf Raise</p>
      </div>
      <div class="card-content">
        <div class="content has-text-white has-text-centered">
          <button class="button is-lig" @click="toggleDebug()" v-if="!showDebug">Debug</button>
          <button class="button is-lig" @click="toggleDebug()" v-if="showDebug">Hide</button><br>
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
            <button class="button is-lig" @click="saveInfo()">Save</button>
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
      modalOpen:false,
      showDebug: false,
      workout: [],
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
        {
          "reps":10,
          "weight": 0
        }
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
        {
          "reps":6,
          "weight": 0
        }
      ],
      triceppushdown: [
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
        {
          "reps":15,
          "weight": 0
        }
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
  created:function(){
    this.getWorkout();
  },
  methods: {
    showMsg(type,msg) {
      if (type=="error"){
        this.errorMsg = msg
      }else if(type=="success"){
        this.successMsg = msg
      }
      var v = this
      setTimeout(function(){
        v.successMsg = "";
        v.errorMsg = "";
      }, 5000)
    },
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
    getWorkout(){
      var v = this;
      axios.get("http://192.168.1.6/workoutapi.php?action=workout&day=monday").then(function(response){
        // console.log(response.data)
        if(response.data.error){
          // console.log("error "+ response.data.message);
          v.showMsg('error',response.data.message);
        }else{
          console.log("success "+ response.data.workout);
          v.workout = response.data.workout
          v.showMsg('success',response.data.message);

        }
      })
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

      axios.post("http://192.168.1.6/workoutapi.php?action=save&day=push",fd).then(function(response){
        // v.currentUser = {};
        console.log(response.data)
        if(response.data.error){
          // v.showMsg("error",response.data.message);
          console.log("error "+ response.data.message);
          window.scrollTo(0,0);
          v.showMsg('error',response.data.message);
        }else{
          console.log("success "+ response.data.message);
          window.scrollTo(0,0);
          v.showMsg('success',response.data.message);
          // v.getAllUsers();
        }
      })      
    },
  }
  
}
</script>

<style lang="scss">
// .workout-container {
//   display: flex;
//   flex-direction: column;

//   &__workout-box {
//     border-radius: 10px;
//     background-color: #9D9D9D;
//     padding:10px;
//     margin:10px auto;
//     width: 80%;

//     &__sets {
//       list-style-type: none;
//       display: flex;
//       flex-direction: row;
//       justify-content: space-between;
//       margin:0;
//       padding: 0;

//       &__reps{
//         background-color: red;
//         width: 20px;
//         height: 20px;
//         line-height: 20px;

//         padding: 25px;
//         border-radius: 50%;
//         text-align: center;
//         cursor: pointer;
//       }
      
//     }

//   }
// }

// .modal{
//   z-index: 1;
//   position: fixed;
//   height:100%;
//   width:100%;
//   top:0;
//   left:0;
//   // background-color:#000000dc;

//   &__container {
//   z-index: 2;
//   margin:10px;
//   padding: 10px;
//   // display:none;
//   position: fixed;
//   top: 40%;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: rgb(224, 224, 224);
//   width:70%;
  
//   &__close {
//     font-size: 24px;
//     color:RED;
//     font-weight: bold;
//     float:right;
//     padding:5px;
//     background-color: transparent;
//     border:none;
//     cursor: pointer;
//   }

//   }
// }

// .msg {
//   width: 100%;
//   padding: 20px;
// }
// .success {
//   background-color: green;
//   color: white;
// }
// .error {
//   background-color: red;
//   color: white;
// }
</style>