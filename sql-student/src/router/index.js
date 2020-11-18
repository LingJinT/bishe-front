import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Header from '../views/header.vue'
import CourseList from '../views/courseList.vue'
import Experiment from '../views/experiment.vue'
import ExperimentDetail from '../views/experimentDetail.vue'
import LookExp from '../views/lookExp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/header',
    component: Header,
    children: [
      {
        path: '/courseList',
        component: CourseList
      },
      {
        path: '/experiment',
        component: Experiment
      },
      {
        path: '/experimentDetail',
        component: ExperimentDetail
      },
      {
        path: '/lookExp',
        component: LookExp
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
