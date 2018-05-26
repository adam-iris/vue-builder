<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="checkbox" :name="queryKey" v-model="value" />
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
