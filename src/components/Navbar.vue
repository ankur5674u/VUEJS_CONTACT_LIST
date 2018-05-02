<template>
  <nav>
      <div class="nav-wrapper green">
          <div class="container">
              <router-link to="/" class="brand-logo">Contact Manager</router-link>
              <ul class="right">
                  <li v-if="isLoggedIn"><router-link to='/'>Dashboard</router-link></li>
                  <li v-if="!isLoggedIn"><router-link to='/login'>Login</router-link></li>
                  <li v-if="!isLoggedIn"><router-link to='/register'>Register</router-link></li>
                  <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
              </ul>
          </div>
          </div>  
  </nav>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'navbar',
    data(){
        return{
            isLoggedIn: false,
            currenUser: false
        }
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn=true;
            this.currenUser=firebase.auth().currentUser.email;
        }
    },
    methods:{
        logout: function(){
            firebase.auth().signOut().then(()=>{
                //this.$router.push('/login');
                this.$router.go({path:this.$router.path});
                });
        }
    }
  
}
</script>

