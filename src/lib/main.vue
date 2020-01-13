<template>
  <div>
    <div v-if="$slots.default || headerSettings" class="clearfix">
      <header-settings
        v-if="headerSettings"
        ref="gridHeader"
        :columns="columns"
        :query="query"
        :page-size-options="pageSizeOptions"
        :pagination="pagination"
        :is-search-enabled="isSearchEnabled">
      </header-settings>
      <slot/>
    </div>

    <grid v-bind="$props" />

    <div
      v-if="pagination"
      is="paginationComponent"
      :query="query"
      :total="total"
      :filtered="filtered">
    </div>
  </div>
</template>

<script>
import grid from './grid/index.vue';
import headerSettings from './utils/headerSettings.vue';
import paginationComponent from './utils/paginationComponent.vue';
import props from './mixins/gridProps.vue';

export default {
  name: 'VueAwesomeGrid',

  mixins: [ props ],

  components: {
    grid,
    headerSettings,
    paginationComponent
  },

  created: function() {
    const _q = {
      limit: 10,
      offset: 0,
      sort: '',
      order: '',
      search: '',
      ...this.query
    };

    Object.keys(_q).forEach(key => this.$set(this.query, key, _q[key]));
  },

  watch: {
    data: {
      handler: function(data) {
        const nestedComponentFieldName = '__nested__';

        data.forEach(item => {
          if (item[nestedComponentFieldName]) {
            return;
          }

          /* eslint-disable object-shorthand */
          this.$set(
            item,
            nestedComponentFieldName,
            {
              comp: undefined,
              visible: false,
              $toggle(comp, visible) {
                switch (arguments.length) { // FIXME omg omg
                  case 0:
                    this.visible = !this.visible;
                    break;

                  case 1:
                    switch (typeof comp) {
                      case 'boolean':
                        this.visible = comp;
                        break;

                      case 'string':
                      case 'object':
                        this.comp = comp;
                        this.visible = !this.visible;
                        break;

                      default:
                        break;
                    }
                    break;

                  case 2:
                    this.comp = comp;
                    this.visible = visible;
                    break;

                  default:
                    break;
                }
              }
            }
          );
          /* eslint-enable object-shorthand */

          Object.defineProperty(item, nestedComponentFieldName, { enumerable: false });
        });
      },

      immediate: true
    }
  }
};
</script>

<style lang="scss">
  @import './style.scss';
</style>
