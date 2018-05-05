<template>
  <FieldRow :context="rowContext">
    <input type="checkbox" :name="name" v-model="value" />
  </FieldRow>
</template>

<script>
import BaseField from './BaseField';
import FieldRow from './FieldRow';

export default {
  name: 'BooleanField',
  mixins: [BaseField],
  components: { FieldRow },
};
</script>
