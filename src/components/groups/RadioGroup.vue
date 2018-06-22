<template>
  <div>
    <slot>Options here</slot>
  </div>
</template>

<script>

import BaseField from '@/components/fields/BaseField';

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
