<template>
  <FieldRow :context="rowContext">
    <div slot="input">
      <input type="text" :name="name" v-model="value" />
    </div>
  </FieldRow>
</template>

<script>
import FieldRow from './FieldRow';

function toTitleCase(s) {
  return s.substr(0, 1).toUpperCase() + s.substr(1);
}

export default {
  name: 'BaseField',
  props: ['name', 'helpText'],
  components: { FieldRow },
  data() {
    return {
      context: {},
    };
  },
  computed: {
    value: {
      get() {
        if (this.context.query) {
          return this.context.query[this.name];
        } else {
          return null;
        }
      },
      set(newValue, oldValue) {
        this.updateQuery(newValue, oldValue);
      },
    },
    definition() {
      if (this.context.definition) {
        try {
          return this.context.definition.params[this.name];
        } catch (e) {}
      }
      return null;
    },
    label() {
      if (this.definition && this.definition.label) {
        return this.definition.label;
      } else {
        return toTitleCase(this.name);
      }
    },
    helpTextStr() {
      if (this.helpText) {
        return this.helpText;
      } else if (this.definition && this.definition.description) {
        return this.definition.description;
      } else {
        return null;
      }
    },
    rowContext() {
      return {
        name: this.name,
        helpText: this.helpTextStr,
      };
    },
  },
  methods: {
    updateQuery(newValue, _oldValue) {
      const q = {};
      q[this.name] = newValue;
      this.$emit('updateQuery', q);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
