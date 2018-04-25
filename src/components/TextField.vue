<template>
  <div>
    <label>{{ label }}</label>
    <input type="text" :name="name" :model="value" />
    <div v-if="helpTextStr">{{ helpTextStr }}</div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: ['name', 'fields', 'query', 'helpText'],
  computed: {
    value: function() {
      if (this.query) {
        return this.query[this.name];
      }
    },
    definition: function() {
      if (this.fields) {
        return this.fields[this.name];
      }
    },
    label: function() {
      if (this.definition && this.definition.label) {
        return label;
      } else {
        return this.name.substr(0,1).toUpperCase() + this.name.substr(1);
      }
    },
    helpTextStr: function() {
      if (this.helpText) {
        return this.helpText;
      } else if (this.definition && this.definition.helpText) {
        return this.definition.helpText;
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
