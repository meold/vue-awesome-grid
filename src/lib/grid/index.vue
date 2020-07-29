<template>
  <div class="table-responsive">
    <table class="table grid">
      <colgroup>
        <col
          v-for="(col, id) in columns"
          :key="id">
      </colgroup>

      <grid-header v-bind="propsForGrid" />
      <grid-body v-bind="propsForGrid" />
      <grid-footer v-if="summary" v-bind="propsForGrid" />
    </table>
  </div>
</template>

<script>
import gridBody from './gridBody.vue';
import gridFooter from './gridFooter.vue';
import gridHeader from './gridHeader.vue';
import props from '../mixins/gridProps.vue';

export default {
  name: 'grid',
  mixins: [props],
  components: {
    gridHeader,
    gridBody,
    gridFooter
  },
  data: () => {
    return {};
  },
  computed: {
    visibleColumns () {
      return this.columns.filter(col => {
        return typeof col.visible === 'undefined' || String(col.visible) === 'true';
      });
    },
    propsForGrid () {
      return { ...this.$props, columns: this.visibleColumns };
    }
  }
};
</script>
