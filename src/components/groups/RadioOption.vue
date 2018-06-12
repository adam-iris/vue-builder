<template>
  <div>
    <div>
      <input type="radio" :name="queryKey" :value="label" v-model="value" />
      {{ label }}
    </div>
    <div :class="{hidden: !selected}">
      <slot>Option</slot>
    </div>
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
    selected() {
      return (this.value === this.label);
    },
    disabled() {
      return !this.selected;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
