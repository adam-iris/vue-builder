import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    definition: null,
    query: {},
  },
  mutations: {
    setDefinition(state, d) {
      state.definition = d;
    },
    updateQuery(state, q) {
      state.query = Object.assign({}, state.query, q);
    },
  },
});
