<template>
  <div>
    <label>{{ label }}</label>
    <input type="text" :name="name" v-model="value" />
    <div v-if="helpTextStr">{{ helpTextStr }}</div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: ['name', 'helpText'],
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
      set(newValue) {
        const query = {};
        query[this.name] = newValue;
        this.$emit('updateQuery', query);
      },
    },
    definition() {
      if (this.context.fields) {
        return this.context.fields[this.name];
      } else {
        return null;
      }
    },
    label() {
      if (this.definition && this.definition.label) {
        return this.definition.label;
      } else {
        return this.name.substr(0, 1).toUpperCase() + this.name.substr(1);
      }
    },
    helpTextStr() {
      if (this.helpText) {
        return this.helpText;
      } else if (this.definition && this.definition.helpText) {
        return this.definition.helpText;
      } else {
        return null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
