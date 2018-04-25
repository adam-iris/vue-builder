<template>
  <div class="form">
    <form>
      <fieldset>
        <legend>SNCL</legend>
        <TextField name="net" />
        <TextField name="sta" />
        <TextField name="loc" />
        <TextField name="cha" />
      </fieldset>
      <fieldset>
        <legend>Dates</legend>
        <DateField name="start" />
        <DateField name="end" />
      </fieldset>
    </form>
  </div>
</template>

<script>
import TextField from './TextField';
import DateField from './DateField';
import Vue from 'vue';

export default {
  name: 'ExampleForm',
  components: {
    TextField,
    DateField,
  },
  data() {
    return {
      fields: {
        loc: {
          helpText: 'Location code (ex: 00)',
        },
      },
      query: {
      },
    };
  },
  mounted() {
    console.log(this.$children);
    this.$children.forEach((f) => {
      console.log(f.name);
      Vue.set(f, 'fields', this.fields);
      Vue.set(f, 'query', this.query);
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
