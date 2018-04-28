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
    </div>
  </div>
</template>

<script>
import BaseBuilder from './BaseBuilder';
import TextField from './TextField';
import DateField from './DateField';

export default {
  name: 'FDSNEvent',
  extends: [BaseBuilder],
  components: {
    TextField,
    DateField,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
