<template>
  <input type="text" :name="name" v-model="inputValue" />
</template>

<script>
export default {
  name: 'BaseInput',
  props: ['name', 'value'],
  data: {
    return {
      inputValue: this.$props.value,
    };
  },
  watch: {
    inputValue($event) {
      this.$emit('input', $event.target.value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
