<template>
  <div id="view-contact">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">Contact ID#:{{contact_id}}</li>
      <li class="collection-item">Departmetn: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button v-on:click="deleteContact" class="btn red">Delete</button>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-contact',
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
  nethods: {
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
    deleteContact () {
      if (confirm('Are you sure?')) {
        db.collection('contacts').where('contact_id', '==', this.$route.params.contact_id).get().then(querySnapshot => {
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

<style>

</style>
