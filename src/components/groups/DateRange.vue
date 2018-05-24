<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="text" :name="startName" v-model="startValue" />
    <input type="text" :name="endName" v-model="endValue" />
  </FieldRow>
</template>

<script>

import BaseField from '../BaseField';

export default {
  name: 'DateRange',
  mixins: [BaseField],
  props: ['startName', 'endName'],
  components: {},
  computed: {
    startValue: {
      get() {
        return this.value.start;
      },
      set(newValue, _oldValue) {
        this.value = Object.assign({}, this.value, {
          start: newValue,
        });
      },
    },
    endValue: {
      get() {
        return this.value.end;
      },
      set(newValue, _oldValue) {
        this.value = Object.assign({}, this.value, {
          end: newValue,
        });
      },
    },
  },
  methods: {
    getFromQuery(query) {
      return {
        start: query[this.startName],
        end: query[this.endName],
      };
    },
    /**
     * Set "this" value in the query
     * Return a map of fields in the query that should change
     */
    updateQuery(newValue) {
      const q = {};
      if (newValue.start) {
        q[this.startName] = newValue.start;
      }
      if (newValue.end) {
        q[this.endName] = newValue.end;
      }
      return q;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
