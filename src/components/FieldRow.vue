<!--
This wraps the field with a label, help text, etc.
to produce a row in the form.
-->
<template>
  <div class="field-row">
    <slot name="label">
      <label :for="context.inputId">{{ context.label }}</label>
    </slot>
    <div class="input-group">
      <slot>
        (Input goes here)
      </slot>
    </div>
    <slot name="extra">
      <div v-if="context.helpText" class="help-text">{{ context.helpText }}</div>
    </slot>
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
