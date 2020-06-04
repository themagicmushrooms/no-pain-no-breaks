import Vue from 'vue'
import App from './App.vue'
import router from './router'

import PouchVue from 'pouch-vue'
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'

Vue.config.productionTip = false

PouchDB.plugin(PouchFind)
PouchDB.plugin(PouchLiveFind)
Vue.use(PouchVue, {
  pouch: PouchDB,
  //defaultDB: 'npnb',
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
