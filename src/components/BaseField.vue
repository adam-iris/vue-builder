<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="text" :name="name" v-model="value" />
  </FieldRow>
</template>

<script>
import FieldRow from './FieldRow';

function toTitleCase(s) {
  if (!s) {
    return s;
  }
  return s.substr(0, 1).toUpperCase() + s.substr(1);
}

function cleanText(t) {
  if (!t) {
    // console.log("!t");
    // console.log(t);
    return "";
  }
  function cleanChar(c) {
    const code = c.charCodeAt(0);
    if (code > 127) {
      console.log(`Code ${code}: ${c}`);
      return "?";
    } else {
      return c;
    }
  }
  return t.split("").map(cleanChar).join("");
}

export default {
  name: 'BaseField',
  props: ['name', 'fieldCtx', 'helpText'],
  components: { FieldRow },
  computed: {
    /**
     * The value of the field in the query, if set this
     * will try to update the query.
     */
    value: {
      get() {
        if (this.fieldCtx && this.fieldCtx.query) {
          return this.getFromQuery(this.fieldCtx.query);
        } else {
          return null;
        }
      },
      set(newValue, _oldValue) {
        // this.$emit('updateQuery', this.updateQuery(newValue));
        if (this.fieldCtx && this.fieldCtx.query) {
          Object.assign(this.fieldCtx.query, this.updateQuery(newValue));
        }
      },
    },
    /**
     * The description of this field in the definition, if available
     */
    definition() {
      if (this.fieldCtx && this.fieldCtx.definition) {
        try {
          return this.fieldCtx.definition.params[this.name];
        } catch (e) {}
      }
      return null;
    },
    /**
     * Label to show on the form
     */
    label() {
      if (this.definition && this.definition.label) {
        return cleanText(this.definition.label);
      } else {
        return cleanText(toTitleCase(this.name));
      }
    },
    /**
     * Id of the input
     */
    inputId() {
      return this.name;
    },
    /**
     * Help text
     */
    helpTextStr() {
      if (this.helpText) {
        return cleanText(this.helpText);
      } else if (this.definition && this.definition.description) {
        return cleanText(this.definition.description);
      } else {
        return "";
      }
    },
    /**
     * Context to provide to our wrapper
     */
    rowCtx() {
      return {
        inputId: this.inputId,
        label: this.label,
        helpText: this.helpTextStr,
      };
    },
  },
  methods: {
    /**
     * Get the value of the field from the query
     * This is so a subclass can read a complex value from the query
     */
    getFromQuery(query) {
      return query[this.name];
    },
    /**
     * Set "this" value in the query
     * Return a map of fields in the query that should change
     */
    updateQuery(newValue) {
      const q = {};
      q[this.name] = newValue;
      return q;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
