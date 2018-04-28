<template>
  <div>
    <label>{{ context.label }}</label>
    <div>
      <slot name="input">
        (Input goes here)
      </slot>
    </div>
    <div v-if="context.helpText">{{ context.helpText }}</div>
  </div>
</template>

<script>
export default {
  name: 'FieldRow',
  props: ['context'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
