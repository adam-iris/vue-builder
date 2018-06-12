import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const FLATPICKR_CONFIG = {
  allowInput: true,
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  dateFormat: "Y-m-dTH:i:S",
  defaultHour: 0,
};

export default new Vuex.Store({
  state: {
    definition: null,
    builder: null,
    query: {},
    disabled: {},
    flatpickr_config: FLATPICKR_CONFIG,
  },
  mutations: {
    setBuilder(state, b) {
      state.builder = b;
    },
    setDefinition(state, d) {
      state.definition = d;
    },
    updateQuery(state, q) {
      state.query = Object.assign({}, state.query, q);
    },
    disable(state, disabled) {
      state.disabled = Object.assign({}, state.disabled, disabled);
    },
  },
});
