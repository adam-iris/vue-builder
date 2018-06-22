<template>
  <label>
    <div v-if="layout === 'n'">{{ labelStr }}</div>
    <span v-if="layout === 'w'">{{ labelStr }}</span>
    <input type="number" class="form-control" v-bind="inputAttrs" v-model="value" />
    <span v-if="layout === 'e'">{{ labelStr }}</span>
    <div v-if="layout === 's'">{{ labelStr }}</div>
  </label>
</template>

<script>
import NumberField from '@/components/fields/NumberField';

export default {
  name: 'CoordField',
  mixins: [NumberField],
  props: ['layout'],
  components: {},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
