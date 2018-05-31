<template>
  <div>
    <div>
      <input type="radio" :name="queryKey" :value="label" v-model="value" />
      {{ label }}
    </div>
    <slot>Option</slot>
  </div>
</template>

<script>

import BaseField from '../fields/BaseField';

export default {
  name: 'RadioOption',
  props: ['label'],
  inject: ['groupName'],
  mixins: [BaseField],
  components: {},
  computed: {
    queryKey() {
      return this.groupName;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
