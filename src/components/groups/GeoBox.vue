<template>
  <div class="builder-geobox">
    <div class="text-center">
      <CoordField :name="n" layout="n" />
    </div>
    <div class="row">
      <div class="col-6 text-right">
        <CoordField :name="w" layout="w" />
      </div>
      <div class="col-6">
        <CoordField :name="e" layout="e" />
      </div>
    </div>
    <div class="text-center">
      <CoordField :name="s" layout="s" />
    </div>
  </div>
</template>

<script>

import CoordField from './CoordField';

export default {
  name: 'GeoBox',
  components: { CoordField },
  props: ['n', 's', 'e', 'w'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.builder-geobox label {
  display: block;
}
.builder-geobox input[type=number] {
  display: inline-block;
  width: 6rem;
}
</style>
