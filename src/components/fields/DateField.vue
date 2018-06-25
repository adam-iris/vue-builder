<template>
  <FieldRow :rowCtx="rowCtx">
    <FlatPickr type="text" class="form-control"
        v-bind="inputAttrs" v-model="value" :config="flatpickrConfig" />
  </FieldRow>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import BaseField from '@/components/fields/BaseField';
import FieldRow from '@/components/FieldRow';

export default {
  name: 'DateField',
  mixins: [BaseField],
  components: { FieldRow, FlatPickr },
  computed: {
    flatpickrConfig() {
      return this.$store.state.flatpickrConfig;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
