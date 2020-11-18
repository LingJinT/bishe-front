import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Header from '../views/header.vue'
import CourseList from '../views/courseList.vue'
import AddCourse from '../views/addCourse.vue'
import SelfInfo from '../views/selfInfo.vue'
import CourseDetail from '../views/courseDetail.vue'
import ExperimentDetail from '../views/experimentDetail.vue'

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
        path: '/header/courseList',
        component: CourseList
      },
      {
        path: '/header/experimentDetail',
        component: ExperimentDetail
      },
      {
        path: '/header/courseDetail',
        component: CourseDetail
      },
      {
        path: '/header/addCourse',
        component: AddCourse
      },
      {
        path: '/header/selfInfo',
        component: SelfInfo
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
