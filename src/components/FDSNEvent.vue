<template>
  <div class="form">
    <form>
      <fieldset>
        <legend>Dates</legend>
        <DateField name="starttime" />
        <DateField name="endtime" />
      </fieldset>
      <fieldset>
        <legend>Event</legend>
        <TextField name="minmag" />
        <TextField name="maxmag" />
        <TextField name="magtype" />
      </fieldset>
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
import DateField from './DateField';
import loadOpenAPIDefinition from '../openapi';

function qsFilter(prefix, value) {
  if (value === '') {
    return undefined;
  }
  return value;
}

export default {
  name: 'FDSNEvent',
  components: {
    TextField,
    DateField,
  },
  data() {
    return {
      definition: {},
      fields: {
        loc: {
          helpText: "Location code (ex: 00)",
        },
      },
      query: {
      },
    };
  },
  computed: {
    queryURL() {
      return qs.stringify(this.query, { encode: false, skipNulls: true, filter: qsFilter });
    },
  },
  mounted() {
    console.log(this.$children);
    const openAPIOptions = {
      url: '/static/example/openapi-event.json',
    };
    loadOpenAPIDefinition(openAPIOptions).then((definition) => {
      if (!definition) {
        throw new Error("No definition returned!");
      }
      this.definition = Object.assign({}, definition);
      this.$children.forEach((f) => {
        Vue.set(f.context, 'definition', this.definition);
        Vue.set(f.context, 'query', this.query);
        f.$on('updateQuery', (q) => {
          this.query = Object.assign({}, this.query, q);
        });
      });
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
