import Vue from 'vue'
import Vuex from  'vuex'
import test from './modules/test'
import map from  './modules/map'
import getters from './getters'

Vue.use(Vuex)

const  state = new Vuex.Store({
    modules: {
      test,
      map,
    },
    getters
})
export default state
