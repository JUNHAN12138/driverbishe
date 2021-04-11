import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import main from '../views/main'
import Home from '../views/Home'
import User from '../views/User'
import center from '../views/center'
import stu_infor from '../views/stu_infor'
import stu_exam from '../views/stu_exam'
import stu_train from '../views/stu_train'
import teacher_infor from '../views/teacher_infor'
import teacher_wages from '../views/teacher_wages'
import car_info from '../views/car_info'
import add from '../components/add'
import car_repair from '../views/car_repair'
import class_infor from '../views/class_infor'
import webPage from '../views/webPage'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/main',
    name:'main',
    component:main,
    children:[
      {
        path:'/Home',
        name:'Home',
        component:Home
      },
      {
        path:'/User',
        name:'User',
        component:User
      },
      {
        path:'/center',
        name:'center',
        component:center
      },
      {
        path: '/stu_infor',
        name: 'stu_infor',
        component: stu_infor
      },
      {
        path:'/stu_exam',
        name:'stu_exam',
        component:stu_exam
      },
      {
        path:'/stu_train',
        name:'stu_train',
        component:stu_train
      },
      {
        path:'/teacher_infor',
        name:'teacher_infor',
        component:teacher_infor
      },
      {
        path:'/teacher_wages',
        name:'teacher_wages',
        component:teacher_wages
      },
      {
        path:'/car_info',
        name:'car_info',
        component:car_info
      },
      {
        path:'/components/add',
        name:'components/add',
        component:add
      },
      {
        path:'/car_repair',
        name:'car_repair',
        component:car_repair
      },
      {
        path:'/class_infor',
        name:'class_infor',
        component:class_infor
      },
      {
        path:'/webPage',
        name:'webPage',
        component:webPage
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:login
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next()
  const tokenStr=window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
