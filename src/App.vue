<template>
  <div id="app">
    <FDSNEvent/>
  </div>
</template>

<script>
import FDSNEvent from './components/FDSNEvent';

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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
