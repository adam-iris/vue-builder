<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="text" :id="inputId" :name="queryKey" v-model="value" />
  </FieldRow>
</template>

<script>
import BaseField from './BaseField';
import FieldRow from './FieldRow';

export default {
  name: 'TextField',
  mixins: [BaseField],
  components: { FieldRow },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
