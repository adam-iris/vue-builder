import Vue from 'vue';
import Vuex from 'vuex';
import qs from 'qs';

Vue.use(Vuex);

const FLATPICKR_CONFIG = {
  allowInput: true,
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  dateFormat: "Y-m-dTH:i:S",
  defaultHour: 0,
};

function readFromUrlHash() {
  return qs.parse(window.location.hash.slice(1));
}

function writeToUrlHash(f) {
  const fullUrl = [
    window.location.href.split('#')[0],
    qs.stringify(f),
  ].join('#');
  window.location.replace(fullUrl);
}

export default new Vuex.Store({
  state: {
    definition: null,
    builder: null,
    query: readFromUrlHash(),
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
      writeToUrlHash(state.query);
    },
    disable(state, disabled) {
      state.disabled = Object.assign({}, state.disabled, disabled);
    },
  },
});
