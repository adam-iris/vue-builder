<template>
  <Builder url="/static/example/openapi-event.json">
    <div slot="form">
      <form>
        <div class="row">
          <div class="col-6">
            <fieldset>
              <legend>Event</legend>
              <DateField name="starttime" />
              <DateField name="endtime" />
              <NumberField name="minmag" />
              <NumberField name="maxmag" />
              <SelectField name="magtype" />
              <SelectField name="catalog" />
              <SelectField name="contributor" />
              <NumberField name="mindepth" />
              <NumberField name="maxdepth" />
            </fieldset>
            <fieldset>
              <legend>Advanced</legend>
              <NumberField name="eventid" />
              <DateField name="updatedafter" />
            </fieldset>
          </div>
          <div class="col-6">
            <fieldset>
              <legend>Location</legend>
              <RadioGroup name="_location">
                <RadioOption label="All"></RadioOption>
                <RadioOption label="Box">
                  <GeoBox n="maxlat" s="minlat" e="maxlon" w="minlon" />
                </RadioOption>
                <RadioOption label="Toroid">
                  <NumberField name="lat" />
                  <NumberField name="lon" />
                  <NumberField name="minradius" />
                  <NumberField name="maxradius" />
                </RadioOption>
              </RadioGroup>
            </fieldset>
            <fieldset>
              <legend>Options</legend>
              <BooleanField name="includeallorigins" />
              <BooleanField name="includeallmagnitudes" />
              <BooleanField name="includearrivals" />
              <SelectField name="orderby" />
              <SelectField name="format" />
              <NumberField name="limit" />
              <NumberField name="offset" />
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  </Builder>
</template>

<script>
import Builder from '@/components/Builder';
import TextField from '@/components/fields/TextField';
import NumberField from '@/components/fields/NumberField';
import DateField from '@/components/fields/DateField';
import BooleanField from '@/components/fields/BooleanField';
import SelectField from '@/components/fields/SelectField';
import RadioGroup from '@/components/groups/RadioGroup';
import RadioOption from '@/components/groups/RadioOption';
import GeoBox from '@/components/groups/GeoBox';

export default {
  name: 'FDSNEvent',
  components: {
    Builder,
    TextField,
    NumberField,
    DateField,
    BooleanField,
    SelectField,
    RadioGroup,
    RadioOption,
    GeoBox,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
