<script>

function getFieldDefinition(definition, name) {
  try {
    return definition.operation.params[name];
  } catch(e) {
    return null;
  }
}

export default {
  name: 'AutoField',
  functional:true,
  props: ['name', 'helpText'],
  render(h, context) {
    const fieldDefinition = getFieldDefinition(context.data.context.definition);

  }
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
          return this.context.definition.operation.params[this.name];
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
