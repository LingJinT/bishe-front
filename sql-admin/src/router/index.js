import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Teacher from '../views/teacher.vue'
import Student from '../views/student.vue'
import Course from '../views/course.vue'
import Classes from '../views/classes.vue'
import Database from '../views/database.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/index',
    component: Index,
    redirect: '/teacher',
    children: [
      { path: '/teacher', component: Teacher },
      { path: '/student', component: Student },
      { path: '/course', component: Course },
      { path: '/classes', component: Classes }
    ]
  },
  {
    path: '/database',
    component: Database
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/' && !token) {
    console.log('触发了全局导航守卫')
    next('/')
  } else {
    next()
  }
})

export default router
