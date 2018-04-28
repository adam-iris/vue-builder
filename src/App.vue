<template>
  <div id="app">
    <FDSNEvent/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
