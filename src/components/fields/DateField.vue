<template>
  <FieldRow :rowCtx="rowCtx">
    <FlatPickr type="text" :name="queryKey" v-model="value" :config="flatpickr_config" />
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
      return this.$store.state.flatpickr_config;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
