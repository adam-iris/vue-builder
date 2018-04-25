<template>
  <div>
    DateField for {{ name }}
  </div>
</template>

<script>

import TextField from './TextField';

export default {
  name: 'DateField',
  mixins: [TextField],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
