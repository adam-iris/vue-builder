<script>

import TextField from './TextField';

function getFieldDefinition(definition, name) {
  try {
    return definition.operation.params[name];
  } catch (e) {
    return null;
  }
}

function getFieldComponent(_definition) {
  return TextField;
}

export default {
  name: 'AutoField',
  functional: true,
  props: ['name', 'helpText'],
  render(h, context) {
    if (context.data.context) {
      const component = getFieldComponent(
        getFieldDefinition(context.data.context.definition, context.props.name));
      return h(component(), context.data, context.children);
    } else {
      return h('<div>');
    }
  },
};
</script>
