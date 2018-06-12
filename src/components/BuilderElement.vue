<script>

export default {
  name: 'BuilderElement',
  provide() {
    return {
      builderBasePath: this.builderPath,
    };
  },
  inject: ['builderBasePath'],
  computed: {
    builderElementName() {
      return "";
    },
    /**
     * "Path" in the builder to this field
     */
    builderPath() {
      return `${this.builderBasePath}.${this.builderElementName}`;
    },
    pathDependencies() {
      const dependencies = [];
      const pathElements = this.builderPath.split('.');
      for (let i = 0; i < pathElements.length; i += 1) {
        dependencies.push(pathElements.slice(0, -i).join('.'));
      }
      return dependencies;
    },
    /**
     * Is this element disabled?
     */
    disabled: {
      get() {
        return this.pathDependencies.find((path) => {
          return this.$store.state.disabled[path];
        }) || false;
      },
      set(newValue, _oldValue) {
        const d = {};
        d[this.builderPath] = newValue;
        this.$store.commit('disable', d);
      },
    },
  },
};
</script>
