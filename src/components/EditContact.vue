<template>
  <div id="edit-contact">
    <h3>Edit Contact</h3>
    <div class="row">
      <form v-on:submit.prevent="updateContact" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="contact_id" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>
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
  name: 'edit-contact',
  data () {
    return {
      contact_id: null,
      name: null,
      dept: null,
      position: null
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('contacts').where('contact_id',
      '==', to.params.contact_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.contact_id = doc.data().contact_id
            vm.name = doc.data().name
            vm.dept = doc.data().dept
            vm.position = doc.data().position
          })
        })
      })
  },
  watch: {
    '$route': 'fenchData'
  },
  methods: {
    fetchData () {
      db.collection('contacts').where('contact_id', '==', this.$route.params.contact_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.contact_id = doc.data().contact_id
          this.name = doc.data().name
          this.dept = doc.data().dept
          this.position = doc.data().position
        })
      })
    },
    updateContact () {
      db.collection('contacts').where('contact_id', '==', this.$route.params.contact_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            contact_id: this.contact_id,
            name: this.name,
            dept: this.dept,
            position: this.position
          })
            .then(() => {
              this.$router.push({name: 'view-contact', params: {contact_id: this.contact_id}})
            })
        })
      })
    }
  }
}
</script>
