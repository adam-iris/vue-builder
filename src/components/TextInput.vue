<template>
  <input type="text" :name="name" v-model="inputValue" />
</template>

<script>
import BaseInput from './BaseInput';

export default {
  name: 'TextInput',
  extends: [BaseInput],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
