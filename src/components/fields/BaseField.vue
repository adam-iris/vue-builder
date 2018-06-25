<template>
  <FieldRow :rowCtx="rowCtx">
    <input type="text" class="form-control" v-bind="inputAttrs" v-model="value" />
  </FieldRow>
</template>

<script>
import BuilderNode from '@/components/BuilderNode';
import FieldRow from '@/components/FieldRow';
import { toTitleCase } from '@/utils';

export default {
  name: 'BaseField',
  props: ['name', 'label', 'helpText'],
  mixins: [BuilderNode],
  components: { FieldRow },
  data() {
    return {
      value: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.readFromQuery();
      // this.$store.commit('addField', this);
    });
  },
  watch: {
    value() {
      this.setFieldState();
    },
    disabled() {
      this.setFieldState();
    },
  },
  computed: {
    /**
     * "Path" in the builder to this field
     */
    builderElementName() {
      return this.inputId;
    },
    /**
     * The query key mapped to this field
     */
    queryKey() {
      return this.name;
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
        id: this.uid,
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
     * Field state as represented in the global store.
     */
    fieldState() {
      return {
        value: this.value,
        enabled: !this.disabled,
      };
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
     * Get the value of the field from the store query
     */
    readFromQuery() {
      this.value = this.getValueFromQuery(this.$store.state.query);
    },
    /**
     * Update the store query
     */
    updateQuery() {
      this.$store.commit('updateQuery', this.createQueryValue(this.disabled ? null : this.value));
    },
    setFieldState() {
      if (this.name) {
        const update = {
          [this.name]: this.fieldState,
        };
        this.$store.commit('setFieldState', update);
      }
    },
    /**
     * Return the value given in the query
     */
    getValueFromQuery(query) {
      return query[this.queryKey];
    },
    /**
     * Set "this" value in the query
     * Return a map of fields in the query that should change
     */
    createQueryValue(rawValue) {
      const q = {};
      q[this.queryKey] = rawValue;
      return q;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
