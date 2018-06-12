<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="text" class="form-control" v-bind="inputAttrs" v-model="value" />
  </FieldRow>
</template>

<script>
import BuilderElement from '../BuilderElement';
import FieldRow from '../FieldRow';

/**
 * Capitalize the first letter of the string
 */
function toTitleCase(s) {
  if (!s) {
    return s;
  }
  return s.substr(0, 1).toUpperCase() + s.substr(1);
}

/**
 * Clean out any non-ascii characters in the test
 */
function _cleanText(t) {
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
  props: ['name', 'label', 'helpText'],
  mixins: [BuilderElement],
  components: { FieldRow },
  computed: {
    /**
     * "Path" in the builder to this field
     */
    builderElementName() {
      return this.queryKey;
    },
    /**
     * The query key mapped to this field
     */
    queryKey() {
      return this.name;
    },
    /**
     * The value of the field in the query.
     * Update the query by setting this value.
     */
    value: {
      get() {
        return this.getFromQuery(this.$store.state.query);
      },
      set(newValue, _oldValue) {
        this.$store.commit('updateQuery', this.updateQuery(newValue));
      },
    },
    /**
     * The description of this field in the definition, if available
     */
    definition() {
      if (this.$store.state.definition) {
        try {
          return this.$store.state.definition.params[this.queryKey];
        } catch (e) {}
      }
      return null;
    },
    /**
     * Label to show on the form
     */
    labelStr() {
      if (this.label) {
        return this.label;
      } else if (this.definition && this.definition.label) {
        return this.definition.label;
      } else {
        return toTitleCase(this.queryKey);
      }
    },
    /**
     * Id of the input
     */
    inputId() {
      return this.queryKey;
    },
    /**
     * Help text
     */
    helpTextStr() {
      if (this.helpText) {
        return this.helpText;
      } else if (this.definition && this.definition.description) {
        return this.definition.description;
      } else {
        return "";
      }
    },
    /**
     * Attributes to pass to the input
     */
    inputAttrs() {
      return {
        id: this.inputId,
        name: this.queryKey,
      };
    },
    /**
     * Context to provide to subcomponents.
     */
    builderCtx() {
      return Object.assign({}, this.parentCtx, {
        disabled: this.disabled,
      });
    },
    /**
     * Context from parent
     */
    parentCtx() {
      let p = this.$parent;
      while (p) {
        if (p.builderCtx) {
          return p.builderCtx;
        }
        p = p.$parent;
      }
      return {};
    },
    /**
     * Context to provide to our wrapper
     */
    rowCtx() {
      return Object.assign({}, this.inputAttrs, {
        label: this.labelStr,
        helpText: this.helpTextStr,
      });
    },
  },
  methods: {
    /**
     * Get the value of the field from the query
     * This is so a subclass can read a complex value from the query
     */
    getFromQuery(query) {
      return query[this.queryKey];
    },
    /**
     * Set "this" value in the query
     * Return a map of fields in the query that should change
     */
    updateQuery(newValue) {
      const q = {};
      q[this.queryKey] = newValue;
      return q;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
