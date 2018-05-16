<template>
  <FieldRow :context="rowContext">
    <select :name="name" v-model="value">
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
