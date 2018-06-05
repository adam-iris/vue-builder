<template>
  <div class="builder">
    <div v-if="definition">
      <slot name="description">
        <div>
          <div id="header">
            <h1>{{ definition.title }}</h1>
            <div class="query-link">
              <slot name="link">
                <a :href="urlBase + urlQuery" target="_blank">{{ urlBase }}<wbr>{{ urlQuery }}</a>
              </slot>
            </div>
          </div>
          <p>{{ definition.description }}</p>
        </div>
      </slot>
      <button type="button" class="btn btn-primary">Primary</button>
      <button type="button" class="btn btn-secondary">Secondary</button>
      <button type="button" class="btn btn-success">Success</button>
      <slot name="form">
        <form>
          <fieldset>
            <AutoField v-for="field in fields"
              :key="field" :name="field" />
          </fieldset>
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
// import Vue from 'vue';
import qs from 'qs';
import AutoField from './fields/AutoField';
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
    AutoField,
  },
  props: ['url'],
  computed: {
    /**
     * Service definition (if it exists)
     */
    definition() {
      return this.$store.state.definition;
    },
    /**
     * Current query
     */
    query() {
      return this.$store.state.query;
    },
    /**
     * List of field names
     */
    fields() {
      if (this.definition) {
        return this.definition.parameterNames;
      } else {
        return [];
      }
    },
    /**
     * Base URL (up to the ?)
     */
    urlBase() {
      return `http://${this.definition.host}${this.definition.basePath}/query?`;
    },
    /**
     * Query parameters as a string
     */
    urlQuery() {
      return qs.stringify(this.query, { encode: false, skipNulls: true, filter: qsFilter });
    },
  },
  // updated() {
  //   console.log("updated");
  //   this.updateChildren();
  // },
  mounted() {
    const openAPIOptions = {
      url: this.url,
    };
    OpenAPI.loadOpenAPIDefinition(openAPIOptions).then((definition) => {
      if (!definition) {
        throw new Error("No definition returned!");
      }
      this.$store.commit('setDefinition', definition);
    }).catch((error) => {
      console.error(error);
    });
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
