<template>
  <div class="" id="edit-contact">
      <h3>Edit Contact</h3>
      <div class="row">
        <form @submit.prevent="updateContact" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input disabled type="text" v-model="contact_id" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="first_name" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="middle_name" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="last_name" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="email" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="phone" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="city" required>
            </div>
            <button type="submit" class="btn">Submit</button>
            <router-link to="/" class="btn grey">Cancel</router-link>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import db from '../firebaseInit'
export default {
  name: 'edit-contact',
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
    updateContact () {
      db.collection('contacts').where('contact_id', '==', this.$route.params.contact_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              contact_id: this.contact_id,
              first_name: this.first_name,
              middle_name: this.middle_name,
              last_name: this.last_name,
              email: this.email,
              phone : this.phone,
              city: this.city
            }).then(() =>{
              this.$router.push({
                name: 'view-contact', 
                params:{contact_id: this.contact_id} 
              })
            })
          })
        })
    }
  }
}
</script>

