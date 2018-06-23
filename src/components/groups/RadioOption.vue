<template>
  <div>
    <div>
      <label>
        <input type="radio" :name="queryKey" :value="label" v-model="value" />
        {{ label }}
      </label>
    </div>
    <div :class="{hidden: !selected}">
      <slot><!-- no option set --></slot>
    </div>
  </div>
</template>

<script>

import slugify from 'slugify';
import BaseField from '@/components/fields/BaseField';

export default {
  name: 'RadioOption',
  props: ['label'],
  inject: ['groupName'],
  mixins: [BaseField],
  components: {},
  watch: {
    value() {
      this.disabled = !this.selected;
    },
  },
  computed: {
    queryKey() {
      return this.groupName;
    },
    inputId() {
      return slugify(`${this.queryKey} ${this.label}`);
    },
    selected() {
      return (this.value === this.label);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
