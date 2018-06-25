<script>

export default {
  name: 'BuilderNode',
  provide() {
    return {
      parentNode: this,
    };
  },
  inject: {
    parentNode: {
      default: null,
    },
  },
  data() {
    return {
      uid: `builder-${Math.random()}`,
    };
  },
  computed: {
    /**
     * Is this element disabled?
     */
    disabled: {
      get() {
        if (this.$store.state.disabled[this.uid]) {
          return true;
        }
        if (this.parentNode) {
          return this.parentNode.disabled || this.parentNode.inactive;
        }
        return false;
      },
      set(newValue, _oldValue) {
        const d = {};
        d[this.uid] = newValue;
        this.$store.commit('disable', d);
      },
    },
    inactive() {
      return false;
    },
  },
};
</script>
