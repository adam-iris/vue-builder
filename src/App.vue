<template>
  <div id="app">
    <div class="page-picker">
      <select v-model="page" class="form-control" style="width:auto">
        <option>FDSNEvent</option>
        <option>FDSNEventSimple</option>
      </select>
    </div>
    <FDSNEvent v-if="page == 'FDSNEvent'"/>
    <FDSNEventSimple v-if="page == 'FDSNEventSimple'"/>
  </div>
</template>

<script>
import FDSNEvent from './components/builders/FDSNEvent';
import FDSNEventSimple from './components/builders/FDSNEventSimple';
// import ExampleForm from './components/ExampleForm';

export default {
  name: 'App',
  data() {
    return {
      page: 'FDSNEvent',
    };
  },
  components: {
    FDSNEvent,
    FDSNEventSimple,
  },
};
</script>

<style>
/*
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
color: #2c3e50;
margin-top: 20px;
*/

/*
html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
}

#app label {
  padding: 0;
  display: block;
}
#app input {
  margin: 0;
  padding: .25rem .5rem;
}
.help-text {
  font-size: small;
  font-style: italic;
}
.field-row + .field-row {
  margin-top: .5rem;
}
*/
</style>
