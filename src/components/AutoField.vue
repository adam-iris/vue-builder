<script>

import TextField from './TextField';
import DateField from './DateField';
import BooleanField from './BooleanField';
import NumberField from './NumberField';
// import SelectField from './SelectField';

function getFieldDefinition(definition, name) {
  // console.log(definition);
  try {
    return definition.params[name];
  } catch (e) {
    return null;
  }
}

function getFieldComponent(definition) {
  if (definition) {
    if (definition.format === "date-time") {
      return DateField;
    }
    // if (definition.enum) {
    //   return SelectField;
    // }
    if (definition.type === "boolean") {
      return BooleanField;
    }
    if (definition.type === "number") {
      return NumberField;
    }
  }
  return TextField;
}

export default {
  name: 'AutoField',
  functional: true,
  props: ['name', 'fieldCtx'],
  render(h, context) {
    // console.log(context);
    if (context.props.fieldCtx.definition) {
      // console.log(context.props.fieldCtx.definition);
      const component = getFieldComponent(
        getFieldDefinition(context.props.fieldCtx.definition, context.props.name));
      // console.log(component);
      return h(component, context);
    } else {
      return h('div', context.props.name);
    }
  },
};
</script>
