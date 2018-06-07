<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="checkbox" v-bind="inputAttrs" v-model="value" />
  </FieldRow>
</template>

<script>
import BaseField from './BaseField';
import FieldRow from '../FieldRow';

export default {
  name: 'BooleanField',
  mixins: [BaseField],
  components: { FieldRow },
  computed: {
    builderCtx() {
      return Object.assign({}, BaseField.builderCtx, {
        disabled2: true,
      });
    },
  },
};
</script>
