import { createRouter, createWebHistory } from 'vue-router'
// import * as firebase from 'firebase'
// import "firebase/auth"

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Workout from '../views/Workout.vue'
import History from '../views/History.vue'
import Push from '../views/Pushpage.vue'
import Pull from '../views/Pullpage.vue'
import Legs from '../views/Legspage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Test from '../views/Test.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  },
  {
    path: '/workout',
    name: 'Workouts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Workout.vue')
    component: Workout,
    meta: {requiresAuth: true}
  },
  {
    path: '/history',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Workout.vue')
    component: History,
    meta: {requiresAuth: true}
  },
  {
    path: '/push',
    name: 'Push',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Workout.vue')
    component: Push,
    meta: {requiresAuth: true}

  },  
  {
    path: '/pull',
    name: 'Pull',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Workout.vue')
    component: Pull,
    meta: {requiresAuth: true}
  },
  {
    path: '/legs',
    name: 'Legs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Workout.vue')
    component: Legs,
    meta: {requiresAuth: true}
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Workout.vue')
    component: Register,
    meta: {requiresUnAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Workout.vue')
    component: Login,
    meta: {requiresUnAuth: true}
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Test
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(function(to,from,next){
  if(to.meta.requiresAuth && !store.getters.authGetter){
    // if we need to be logged in and we are note logged 
    next('/login');
  } else if(to.meta.requiresUnAuth && store.getters.authGetter){
    //if we shouldnt be logged in and try to get to something while logged in ie register / login
    next('/');
  } else {
    next();
  }
})

// router.beforeEach((to,from,next)=>{
//   //every time we click on a router, this runs
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const isAuthenticated = firebase.auth().currentUser; // if we have a 
//   console.log(isAuthenticated)
//   if(requiresAuth && !isAuthenticated) {
//     //if page needs auth, but not logged in
//     next("/login");
//   }else{
//     next();
//   }

// })

export default router
