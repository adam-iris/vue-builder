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
          <NumberField name="minmag" />
          <NumberField name="maxmag" />
          <SelectField name="magtype" />
          <BooleanField name="includeallorigins" />
        </fieldset>
        <fieldset>
          <legend>Location</legend>
          <RadioGroup name="_location">
            <RadioOption label="Box">
              <NumberField name="minlat" />
              <NumberField name="minlon" />
              <NumberField name="maxlat" />
              <NumberField name="maxlon" />
            </RadioOption>
            <RadioOption label="Toroid">
              <NumberField name="lat" />
              <NumberField name="lon" />
              <NumberField name="minradius" />
              <NumberField name="maxradius" />
            </RadioOption>
          </RadioGroup>
        </fieldset>

      </form>
    </div>
  </Builder>
</template>

<script>
import Builder from './Builder';
import TextField from './TextField';
import NumberField from './NumberField';
import DateField from './DateField';
import DateRange from './groups/DateRange';
import BooleanField from './BooleanField';
import SelectField from './SelectField';
import RadioGroup from './groups/RadioGroup';
import RadioOption from './groups/RadioOption';

export default {
  name: 'FDSNEvent',
  components: {
    Builder,
    TextField,
    NumberField,
    DateField,
    DateRange,
    BooleanField,
    SelectField,
    RadioGroup,
    RadioOption,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
