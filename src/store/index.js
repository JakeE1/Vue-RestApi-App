import Vue from 'vue'
import Vuex from 'vuex'

import Notify from './notify'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Notify
  }
})