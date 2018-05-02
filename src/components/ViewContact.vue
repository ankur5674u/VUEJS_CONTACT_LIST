<template>
  <div class="" id="view-contact">
      <ul class="collection with-header">
        <li class="collection-header">
          <h4>{{first_name}} {{middle_name}} {{last_name}}</h4>
        </li>
        <li class="collection-item">Contact ID#:{{contact_id}}</li>
        <li class="collection-item">Email:{{email}}</li>
        <li class="collection-item">Phone:{{phone}}</li>
        <li class="collection-item">City:{{city}}</li>
        <li class="collection-item">Contact ID#:{{contact_id}}</li>
      </ul>
      <button @click="deleteContact" class="btn red">Delete</button>
      <router-link to="/" class="btn grey">Back</router-link>
      <div class="fixed-action-btn">
          <router-link v-bind:to="{name:'edit-contact', params:{contact_id: contact_id}}" class="btn-floating btn-large red">
            <i class="fa fa-pencil"></i>
          </router-link>
      </div>
  </div>
</template>

<script>
import db from '../firebaseInit'
export default {
  name: 'view-contact',
  data() {
      return {
         contact_id: null,
         first_name: null,
         middle_name: null,
         last_name: null,
         email: null,
         phone : null,
         city: null
      }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('contacts').where('contact_id','==',to.params.contact_id).get().
      then(querySnapshot => {
        querySnapshot.forEach(doc => {
        next(vm => {
          vm.contact_id = doc.data().contact_id
          vm.first_name = doc.data().first_name
          vm.middle_name = doc.data().middle_name
          vm.last_name = doc.data().last_name
          vm.email = doc.data().email
          vm.phone = doc.data().phone
          vm.city = doc.data().city
        })
      })
      }
    )
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('contacts').where('contact_id', '==', this.$route.params.contact_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.contact_id = doc.data().contact_id
            this.first_name = doc.data().first_name
            this.middle_name = doc.data().middle_name
            this.last_name = doc.data().last_name
            this.email = doc.data().email
            this.phone = doc.data().phone
            this.city = doc.data().city
          })
        })
    },
    deleteContact (){
      if(confirm("Are you sure?")){
        db.collection('contacts').where('contact_id', '==', this.$route.params.contact_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>

