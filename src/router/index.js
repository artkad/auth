import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewContact from '@/components/NewContact'
import ViewContact from '@/components/ViewContact'
import EditContact from '@/components/EditContact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-contact',
      component: NewContact
    },
    {
      path: '/edit/:contact_id',
      name: 'edit-contact',
      component: EditContact
    },
    {
      path: '/:contact_id',
      name: 'view-contact',
      component: ViewContact
    }
  ]
})
