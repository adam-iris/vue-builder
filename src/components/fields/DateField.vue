<template>
  <FieldRow :rowCtx="rowCtx">
    <div class="input-group mb-0">
      <FlatPickr type="text" class="form-control" :id="inputId"
          :name="queryKey" v-model="value" :config="flatpickr_config" />
      <div class="input-group-append">
        <button class="btn btn-secondary" type="button" title="Toggle" data-toggle>
          <i class="fa fa-calendar">
            <span aria-hidden="true" class="sr-only">Toggle</span>
          </i>
        </button>
        <button class="btn btn-secondary" type="button" title="Clear" data-clear>
          <i class="fa fa-times">
            <span aria-hidden="true" class="sr-only">Clear</span>
          </i>
        </button>
      </div>
    </div>
  </FieldRow>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import BaseField from './BaseField';
import FieldRow from '../FieldRow';

export default {
  name: 'DateField',
  mixins: [BaseField],
  components: { FieldRow, FlatPickr },
  computed: {
    flatpickr_config() {
      return Object.assign({
        wrap: true,
        clickOpens: false,
      }, this.$store.state.flatpickr_config);
    },
  },
  methods: {
    toggle() {

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
