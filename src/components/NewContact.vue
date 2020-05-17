<template>
  <div id="new-contact">
    <h3>New Contact</h3>
    <div class="row">
      <form @submit.prevent="saveContact" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="contact_id" required>
            <label >Contact ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label >Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
            <label >Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>
            <label >Position</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'new-contact',
  data () {
    return {
      contact_id: null,
      name: null,
      dept: null,
      position: null
    }
  },
  methods: {
    saveContact () {
      db.collection('contacts').add({
        contact_id: this.contact_id,
        name: this.name,
        dept: this.dept,
        position: this.position
      })
        .then(docRef => this.$router.push('/'))
    }
  }
}
</script>

<style>

</style>
