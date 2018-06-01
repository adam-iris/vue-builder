<!--
This wraps the field with a label, help text, etc.
to produce a row in the form.
-->
<template>
  <div class="field-row">
    <slot name="label">
      <label :for="rowCtx.inputId">{{ rowCtx.label }}</label>
    </slot>
    <div class="field-inputs">
      <slot>
        (Input goes here)
      </slot>
    </div>
    <slot name="extra">
      <div v-if="rowCtx.helpText" class="help-text">{{ rowCtx.helpText }}</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'FieldRow',
  props: ['rowCtx'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
