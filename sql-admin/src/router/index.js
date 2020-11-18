import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Teacher from '../views/teacher.vue'
import Student from '../views/student.vue'
import Course from '../views/course.vue'
import Classes from '../views/classes.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/index',
    component: Index,
    children: [
      { path: '/teacher', component: Teacher },
      { path: '/student', component: Student },
      { path: '/course', component: Course },
      { path: '/classes', component: Classes }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
