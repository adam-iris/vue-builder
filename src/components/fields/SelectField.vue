<template>
  <FieldRow :rowCtx="rowCtx">
    <select class="form-control" v-bind="inputAttrs" v-model="value">
      <option v-for="choice in choices" :key="choice">{{ choice }}</option>
    </select>
  </FieldRow>
</template>

<script>
import BaseField from '@/components/fields/BaseField';
import FieldRow from '@/components/FieldRow';

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
