<script>

function getFieldDefinition(definition, name) {
  try {
    return definition.operation.params[name];
  } catch(e) {
    return null;
  }
}

export default {
  name: 'AutoField',
  functional:true,
  props: ['name', 'helpText'],
  render(h, context) {
    // const fieldDefinition = getFieldDefinition(context.data.context.definition);
    return h('TextField');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
