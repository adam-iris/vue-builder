<template>
  <FieldRow :rowCtx="rowCtx">
    <slot>Options here</slot>
  </FieldRow>
</template>

<script>

import BaseField from '../BaseField';

export default {
  name: 'RadioGroup',
  mixins: [BaseField],
  provide() {
    return {
      groupName: this.queryKey,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
