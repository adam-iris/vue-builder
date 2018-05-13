<template>
  <div class="builder">
    <div v-if="definition">
      <slot name="description">
        <div>
          <div id="header">
            <h1>{{ definition.title }}</h1>
            <div class="query-link">
              <slot name="link">
                <a :href="queryURL" target="_blank">{{ queryURL }}</a>
              </slot>
            </div>
          </div>
          <p>{{ definition.description }}</p>
        </div>
      </slot>
      <slot name="form">
        <form>
          <TextField v-for="field in fields" :key="field" :name="field" />
        </form>
        <!--
        <div v-for="field in fields">
          <code>&lt;TextField name="{{ field }}" /&gt;</code>
        </div>
      -->
      </slot>
    </div>
    <div v-else>
      No definition
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import qs from 'qs';
import TextField from './TextField';
import OpenAPI from '../openapi';

function qsFilter(prefix, value) {
  if (value === '') {
    return undefined;
  }
  return value;
}

export default {
  name: 'Builder',
  components: {
    TextField,
  },
  props: ['url'],
  data() {
    return {
      definition: null,
      query: {},
    };
  },
  computed: {
    fields() {
      if (this.definition) {
        return this.definition.parameterNames;
      } else {
        return [];
      }
    },
    queryURL() {
      const query = qs.stringify(this.query, { encode: false, skipNulls: true, filter: qsFilter });
      return `http://${this.definition.host}${this.definition.basePath}/query?${query}`;
    },
  },
  updated() {
    this.updateChildren();
  },
  mounted() {
    console.log(this.$children);
    const openAPIOptions = {
      url: this.url,
    };
    OpenAPI.loadOpenAPIDefinition(openAPIOptions).then((definition) => {
      if (!definition) {
        throw new Error("No definition returned!");
      }
      this.definition = Object.assign({}, definition);
    }).catch((error) => {
      console.error(error);
    });
  },
  methods: {
    updateChildren() {
      this.$children.forEach((f) => {
        // Ugly hack, the form writes into this rather than pass props
        if (f.context && !f.context.definition) {
          Vue.set(f.context, 'definition', this.definition);
          Vue.set(f.context, 'query', this.query);
          f.$on('updateQuery', (q) => {
            this.query = Object.assign({}, this.query, q);
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
