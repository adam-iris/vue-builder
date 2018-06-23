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
import AutoField from '@/components/fields/AutoField';
import OpenAPI from '@/openapi';

function qsFilter(prefix, value) {
  if (prefix[0] === '_') {
    return undefined;
  }
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
  props: ['url', 'path'],
  provide() {
    return {
      builderBasePath: 'builder',
    };
  },
  computed: {
    /**
     * Options for parsing the OpenAPI definition
     */
    openAPIOptions() {
      return {
        url: this.url,
        path: this.path || '/query',
        method: 'get',
      };
    },
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
  created() {
    OpenAPI.loadOpenAPIDefinition(this.openAPIOptions).then((definition) => {
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
