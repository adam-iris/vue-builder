<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="number" class="form-control" v-bind="inputAttrs" v-model="value" />
  </FieldRow>
</template>

<script>
import BaseField from '@/components/fields/BaseField';
import FieldRow from '@/components/FieldRow';

export default {
  name: 'NumberField',
  mixins: [BaseField],
  components: { FieldRow },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
