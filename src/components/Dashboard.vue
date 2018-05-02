<template>
  <div class="" id="dashboard">
      <ul class="collection with-header">
          <li class="collection-header">
              <h4>Contacts</h4>
          </li>
          <li v-for="contact in contacts" 
          v-bind:key="contact.id" class="collection-item">
          <div class="chip">{{contact.city}}</div>
          {{contact.first_name}} {{contact.middle_name}} {{contact.last_name}}

          <router-link class="secondary-content"
          v-bind:to="{name: 'view-contact', params:{contact_id: contact.contact_id} }">
          <i class="fa fa-eye"></i>
          </router-link>
          </li>
      </ul>
      <div class="fixed-action-btn">
          <router-link to='/add' class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
          </router-link>
      </div>
  </div>
</template>

<script>
import db from "../firebaseInit"
export default {
  name: 'dashboard',
  data() {
      return {
          contacts: []
      }
  },
// Method run when component loaded
  created (){
      db.collection('contacts').orderBy('city').get().then
      (querySnapshort =>{
          querySnapshort.forEach(doc =>{
              //console.log(doc.data());
              const data = {
                  'id': doc.id,
                  'contact_id': doc.data().contact_id,
                  'first_name': doc.data().first_name,
                  'middle_name': doc.data().middle_name,
                  'last_name': doc.data().last_name,
                  'email' : doc.data().email,
                  'phone' : doc.data().phone,
                  'city': doc.data().city
                }
                this.contacts.push(data);
          })
      })
  }
}
</script>

