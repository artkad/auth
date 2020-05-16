<template>
  <div id="dashboard">
    <h3>Dashboard</h3>
      <ul class="collection with-header">
        <li class="collection-header"><h4>Contacts</h4></li>
        <li v-for="contact in contacts"
        v-bind:key="contact.id" class="collection-item">
        <div class="chip">{{contact.dept}}</div>{{contact.contact_id}}:{{contact.name}}
        <router-link class="secondary-content" v-bind:to="{name: 'view-contact', params: {contact_id: contact.contact_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
        </li>
      </ul>
    <div class="fixed-action-btn">
      <router-link to='/new' class="btn-floating btn-large red">
      <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      contacts: []
    }
  },
  created () {
    db.collection('contacts').orderBy('dept').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'contact_id': doc.data().contact_id,
          'name': doc.data().name,
          'dept': doc.data().dept,
          'position': doc.data().position
        }
        this.contacts.push(data)
      })
    })
  }
}
</script>

<style>

</style>
