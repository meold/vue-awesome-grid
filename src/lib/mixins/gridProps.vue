<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    filtered: {
      type: Number
    },
    query: {
      type: Object,
      required: true
    },
    summary: {
      type: Object
    },
    headerSettings: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    pageSizeOptions: {
      type: Array,
      default: () => [10, 25, 100]
    },
    isSearchEnabled: {
      type: Boolean,
      default: true
    },
    extraProps: {
      type: Object
    }
  },

  data: function() {
    return {
      comp: this.findMainComponent()
    };
  },

  methods: {
    findMainComponent() {
      let gridInstance = this; // eslint-disable-line consistent-this

      while (gridInstance.$options.name !== 'VueAwesomeGrid') {
        gridInstance = gridInstance.$parent;
      }

      // NOTE:
      // gridInstance.$parent is layout of parent component
      // gridInstance.$parent.$parent is the parent component, from which we call VueAwesomeGrid

      /* eslint-disable no-negated-condition */
      return gridInstance.$parent.$parent !== undefined ? gridInstance.$parent.$parent.$options.components : gridInstance.$parent.$options.components;
      /* eslint-enable no-negated-condition */
    },

    getComponent(component) {
      // https://vuejs.org/v2/guide/components.html#Dynamic-Components
      // dynamic components can be string or  objects
      // USAGE: <component :is="getComponent(lopata)"/>
      return typeof component === 'object' ? component : this.comp[component];
    }
  }
};
</script>
