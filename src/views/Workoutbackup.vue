<template>
    <div class="msg error" v-if="errorMsg">
      {{ errorMsg }} <button type="button" class="close" aria-hidden="true" @click="errorMsg=''">&times;</button>
    </div>
 
  
    <div class="msg success" v-if="successMsg">
      {{ successMsg }} <button type="button" class="close" aria-hidden="true" @click="successMsg=''">&times;</button>
    </div>
    <div class="workout-container__workout-box">
      <h2>Bench Press</h2>

        <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in benchpress" :key="index" class="workout-container__workout-box__sets__reps" @click="setCurrent(sets);toggleModal();">{{ sets.reps }}</li>
        </ul>
        <!-- <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in benchpress" :key="index" class="workout-container__workout-box__sets__reps" @click="toggleModal(benchSet1);">{{ sets.weight }}</li>
        </ul> -->
    </div>

    <div class="workout-container__workout-box">
      <h2>Overhead Press</h2>
        <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in overheadpress" :key="index" class="workout-container__workout-box__sets__reps" @click="setCurrent(sets);toggleModal();">{{ sets.reps }}</li>
        </ul>
    </div>

    <div class="workout-container__workout-box">
      <h2>Incline DB Press</h2>
        <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in inclinedbpress" :key="index" class="workout-container__workout-box__sets__reps" @click="setCurrent(sets);toggleModal();">{{ sets.reps }}</li>
        </ul>
    </div>

    <div class="workout-container__workout-box">
      <h2>Cable Fly</h2>
        <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in cablefly" :key="index" class="workout-container__workout-box__sets__reps" @click="setCurrent(sets);toggleModal();">{{ sets.reps }}</li>
        </ul>
        <br>
      <hr/>
      <h2>Tricep Pushdown</h2>
        <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in triceppushdown" :key="index" class="workout-container__workout-box__sets__reps" @click="setCurrent(sets);toggleModal();">{{ sets.reps }}</li>
        </ul>
    </div>

    <div class="workout-container__workout-box">
      <h2>Tricep French Press</h2>
        <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in tricepfrenchpress" :key="index" class="workout-container__workout-box__sets__reps" @click="setCurrent(sets);toggleModal();">{{ sets.reps }}</li>
        </ul>
        <br>
      <hr/>
      <h2>Lat Raise</h2>
        <ul class="workout-container__workout-box__sets">
          <li v-for="(sets,index) in latraise" :key="index" class="workout-container__workout-box__sets__reps" @click="setCurrent(sets);toggleModal();">{{ sets.reps }}</li>
        </ul>
    </div>

    <div class="workout-container__workout-box">
      <button @click="toggleDebug()" v-if="!showDebug">Debug</button>
      <br><br>
      <div class="debugging" v-if="showDebug">
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
        <button @click="toggleDebug()">Hide</button>
      </div>
        <br><br>
        <button @click="saveInfo()">Save</button>
    </div>

  <div class="modal" v-if="modalOpen">
    <div class="modal__container">
      <button class="modal__container__close" @click="toggleModal()">X</button>
      <h1>Weight</h1>
      <input type="number" v-model="currentlyEditing.weight"/>
      <br><br>
      <button class="" @click="toggleModal()">Done</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      modalOpen:false,
      showDebug: false,
      //benchpress
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

      axios.post("http://192.168.1.6/workoutapi.php?action=save",fd).then(function(response){
        // v.currentUser = {};
        console.log(response.data)
        if(response.data.error){
          // v.showMsg("error",response.data.message);
          console.log("error "+ response.data.message);
          v.showMsg('error',response.data.message);
        }else{
          console.log("success "+ response.data.message);
          v.showMsg('success',response.data.message);
          // v.getAllUsers();
        }
      })      
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

.modal{
  z-index: 1;
  position: fixed;
  height:100%;
  width:100%;
  top:0;
  left:0;
  // background-color:#000000dc;

  &__container {
  z-index: 2;
  margin:10px;
  padding: 10px;
  // display:none;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(224, 224, 224);
  width:70%;
  min-height: 300px;
  
  &__close {
    font-size: 24px;
    color:RED;
    font-weight: bold;
    float:right;
    padding:5px;
    background-color: transparent;
    border:none;
    cursor: pointer;
  }

  }
}

.msg {
  width: 100%;
  padding: 20px;
}
.success {
  background-color: green;
  color: white;
}
.error {
  background-color: red;
  color: white;
}
</style>