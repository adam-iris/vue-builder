<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="checkbox" v-bind="inputAttrs" v-model="value" />
  </FieldRow>
</template>

<script>
import BaseField from '@/components/fields/BaseField';
import FieldRow from '@/components/FieldRow';

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
