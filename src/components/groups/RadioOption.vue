<template>
  <div>
    <div>
      <label>
        <input type="radio" :name="queryKey" :value="label" v-model="group.value" />
        {{ label }}
      </label>
    </div>
    <div :class="{hidden: !selected}">
      <slot><!-- no option set --></slot>
    </div>
  </div>
</template>

<script>

import BaseField from '@/components/fields/BaseField';

export default {
  name: 'RadioOption',
  props: ['label'],
  inject: ['group', 'groupName'],
  mixins: [BaseField],
  components: {},
  computed: {
    queryKey() {
      return this.group.queryKey;
    },
    selected() {
      return (this.group.value === this.label);
    },
    inactive() {
      return !this.selected;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
