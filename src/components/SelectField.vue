<template>
  <FieldRow :rowCtx="rowCtx">
    <select :name="queryKey" v-model="value">
      <option v-for="choice in choices" :key="choice">{{ choice }}</option>
    </select>
  </FieldRow>
</template>

<script>
import BaseField from './BaseField';
import FieldRow from './FieldRow';

export default {
  name: 'SelectField',
  mixins: [BaseField],
  components: { FieldRow },
  computed: {
    choices() {
      return this.definition ? this.definition.enum : [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
