<template>
  <div class="" id="add-contact">
      <h3>Add Contact</h3>
      <div class="row">
        <form @submit.prevent="saveContact" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="contact_id" required>
              <label>Contact ID#</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="first_name" required>
              <label>First Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="middle_name" required>
              <label>Middle Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="last_name" required>
              <label>Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="email" required>
              <label>Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="phone" required>
              <label>Phone</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="city" required>
              <label>City</label>
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
  name: 'add-contact',
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
  methods: {
    saveContact () {
      db.collection('contacts').add({
        contact_id: this.contact_id,
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        email: this.email,
        phone : this.phone,
        city: this.city
      }).then(docRef =>this.$router.push('/')
      ).catch(error => console.log(err))
    }
  }
}
</script>

