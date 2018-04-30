<script>
import BaseField from './BaseField';

export default {
  name: 'TextField',
  extends: [BaseField],
  data() { return {}; },
  template: BaseField.template,
  render2(h, context) {
    return BaseField.render.apply(this, h, context);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
