import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import AddContact from '@/components/AddContact'
import ViewContact from '@/components/ViewContact'
import EditContact from '@/components/EditContact'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'



Vue.use(Router)

let router= new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuset:true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/add',
      name: 'add-contact',
      component: AddContact,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit:contact_id',
      name: 'edit-contact',
      component: EditContact,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/:contact_id',
      name: 'view-contact',
      component: ViewContact,
      meta:{
        requiresAuth:true
      }
    }

  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    // check if not loged in
    if(!firebase.auth().currentUser){
      // Go to login page
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      })
    }else{
      // Proceed to route
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    // check if not loged in
    if(firebase.auth().currentUser){
      // Go to login page
      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      })
    }else{
      // Proceed to route
      next();
    }
  }else{
    // Proceed to route
    next();
  }
})

export default router;