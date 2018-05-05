<template>
  <div class="form">
    <form>
      <div v-for="field in fields" :key="field.name">
        <TextField name={{ field.name }} />
      </div>
    </form>
    <div>
      URL: {{ queryURL }}
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
  name: 'BaseBuilder',
  components: {
    TextField,
  },
  data() {
    return {
      definition: {},
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
      return qs.stringify(this.query, { encode: false, skipNulls: true, filter: qsFilter });
    },
  },
  mounted() {
    console.log(this.$children);
    const openAPIOptions = {
      url: '/static/example/openapi-event.json',
    };
    OpenAPI.loadOpenAPIDefinition(openAPIOptions).then((definition) => {
      if (!definition) {
        throw new Error("No definition returned!");
      }
      this.definition = Object.assign({}, definition);
      this.updateChildren();
    }).catch((error) => {
      console.error(error);
    });
  },
  methods: {
    updateChildren() {
      this.$children.forEach((f) => {
        if (!f.context.definition) {
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
