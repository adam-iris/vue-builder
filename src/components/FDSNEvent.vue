<template>
  <Builder url="/static/example/openapi-event.json">
    <div slot="form">
      <form>
        <fieldset>
          <legend>Dates</legend>
          <DateRange label="Dates" startName="starttime" endName="endtime" />
          <DateField name="starttime" />
          <DateField name="endtime" />
        </fieldset>
        <fieldset>
          <legend>Event</legend>
          <TextField name="minmag" />
          <TextField name="maxmag" />
          <SelectField name="magtype" />
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
import DateRange from './groups/DateRange';
import BooleanField from './BooleanField';
import SelectField from './SelectField';

export default {
  name: 'FDSNEvent',
  components: {
    Builder,
    TextField,
    DateField,
    DateRange,
    BooleanField,
    SelectField,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
