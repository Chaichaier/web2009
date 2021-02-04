import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/HomePage/Home.vue'
import Layout from '../views/Layout'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [{
        path: '',
        name: 'Home',
        component: Home,
        meta:{
          isLogin:true
        },
        
      },
     
      {
        path:'ad',
        name:'ADCategory',
        component: () => import("../views/main/ADCategory"),
        meta:{
          isLogin:true
        }
      },
      {
        path:'params',
        name:'Params',
        component:()=>import('../views/main/Params'),
        meta:{
          isLogin:true
        }
      },
      {
        path:'product',
        name:'Product',
        component:()=>import ('../views/main/Product'),
        meta:{
          isLogin:true
        }
      },
      {
        path:'details',
        name:'Details',
        component: () => import("../views/main/HomePage/sub/Details.vue"),
        children:[
          {
            path:'golife',
            name:'GoLife',
            component:()=>import ('../views/main/HomePage/sub/golife'),
          },{
            path:'heigh',
            name:'Heigh',
            component:()=>import ('../views/main/HomePage/sub/heigh'),
          },
          {
            path:'logo',
            name:'Logo',
            component:()=>import ('../views/main/HomePage/sub/logo'),
          },
          {
            path:'openProduct',
            name:'OpenProduct',
            component:()=>import ('../views/main/HomePage/sub/openProduct'),
          }
        ]
      }

    ]
  },
  {
    path:'/login',
    name:"Login",
    component:()=>import ('../views/Login.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router