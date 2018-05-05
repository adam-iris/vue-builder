<template>
  <div id="app">
    <FDSNEvent />
  </div>
</template>

<script>
import FDSNEvent from './components/FDSNEvent';
// import ExampleForm from './components/ExampleForm';

export default {
  name: 'App',
  components: {
    FDSNEvent,
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
