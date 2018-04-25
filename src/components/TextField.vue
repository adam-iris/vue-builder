<template>
  <div>
    Field for {{ name }}
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
