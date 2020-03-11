import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import userManagement from './modules/customerManagement'
import permission from './modules/permission'
import informationManagement from './modules/informationManagement'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    userManagement,
    permission,
    informationManagement
  },
  getters
})

export default store
