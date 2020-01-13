<template>
  <tfoot v-show="data.length">
    <tr class="summaryRow">
      <td
        v-for="(col, id) in columns"
        :style="col.tdStyle || null"
        :class="col.tdClass || null"
        :key="'summary' + col.title || col.field || id">

        <div
          v-if="col.render"
          v-html="columnRender(col, summary)">
        </div>

        <div
          v-else-if="col.field">
          {{ getObjectValue(summary, col.field, '') }}
        </div>

        <div v-else></div>
      </td>
    </tr>
  </tfoot>
</template>

<script>
import { getObjectValue } from '../mixins/helper';
import props from '../mixins/gridProps.vue';

export default {
  name: 'gridFooter',
  mixins: [ props ],

  methods: {
    getObjectValue,

    columnRender(column, row) {
      const value = column.field ? getObjectValue(row, column.field) : null;
      return column.render(...[value, row]);
    }
  }
};
</script>
