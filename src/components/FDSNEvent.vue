<template>
  <Builder url="/static/example/openapi-event.json">
    <div slot="form">
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
          <BooleanField name="includeallorigins" />
        </fieldset>
      </form>
    </div>
  </Builder>
</template>

<script>
import Builder from './Builder';
import TextField from './TextField';
import DateField from './DateField';
import BooleanField from './BooleanField';

export default {
  name: 'FDSNEvent',
  components: {
    Builder,
    TextField,
    DateField,
    BooleanField,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
