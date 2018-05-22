<template>
  <Builder url="/static/example/openapi-event.json">
    <div slot="form">
      <form>
        <fieldset>
          <legend>Dates</legend>
          <DateField name="starttime" :fieldCtx="fieldCtx" />
          <DateField name="endtime" :fieldCtx="fieldCtx" />
        </fieldset>
        <fieldset>
          <legend>Event</legend>
          <TextField name="minmag" :fieldCtx="fieldCtx" />
          <TextField name="maxmag" :fieldCtx="fieldCtx" />
          <SelectField name="magtype" :fieldCtx="fieldCtx" />
          <BooleanField name="includeallorigins" :fieldCtx="fieldCtx" />
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
import SelectField from './SelectField';

export default {
  name: 'FDSNEvent',
  components: {
    Builder,
    TextField,
    DateField,
    BooleanField,
    SelectField,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
