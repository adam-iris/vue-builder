<!--
This wraps the field with a label, help text, etc.
-->
<template>
  <div>
    <slot name="label">
      <label>{{ context.label }}</label>
    </slot>
    <slot>
      (Input goes here)
    </slot>
    <slot name="extra">
      <div v-if="context.helpText">{{ context.helpText }}</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'FieldDecorator',
  props: ['context'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
