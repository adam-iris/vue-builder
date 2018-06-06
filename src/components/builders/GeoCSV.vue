<template>
  <Builder url="http://geows.ds.iris.edu/geows/geocsv/1/openapi/v3" path="/geocsv/1/validate" method="head">
  </Builder>
</template>

<script>
import Builder from '../Builder';

export default {
  name: 'GeoCSV',
  components: {
    Builder,
  },
};
</script>
