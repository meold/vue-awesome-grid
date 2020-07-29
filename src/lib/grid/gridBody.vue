<template>
  <tbody>
    <template v-if="data.length">
      <template v-for="(row, rowId) in data">
        <tr
          :class="[{ 'shown': row.__nested__ && row.__nested__.visible}]"
          :key="row.id || rowId">
          <td v-for="(column, id) in columns" :key="id" :style="column.tdStyle || null" :class="tdClass(column, row)" @click="onCellClicked(row, column, rowId)">
            <component
              v-if="column.tdComp"
              :is="getComponent(column.tdComp)"
              :row="row"
              :rowIdInSourceArray="rowId"
              :field="column.field"
              :value="row[column.field]"
              :nested="row.__nested__"
              :extraProps="extraProps"/>

            <div
              v-else-if="column.render"
              v-html="columnRender(column, row)">
            </div>

            <template v-else>
              {{ getObjectValue(row, column.field, 'n/a') }}
            </template>
          </td>
        </tr>

        <!-- nested component -->
        <transition name="fade" :key="row.id || rowId">
          <tr v-if="row.__nested__ && row.__nested__.visible" class="nested">
            <td :colspan="columns.length">
              <component
                :is="getComponent(row.__nested__.comp)"
                :row="row"
                :nested="row.__nested__">
              </component>
            </td>
          </tr>
        </transition>
      </template>
    </template>

    <tr v-else>
      <td :colspan="columns.length" class="text-center text-muted">(No Data)</td>
    </tr>
  </tbody>
</template>

<script>
import { getObjectValue } from '../mixins/helper';
import props from '../mixins/gridProps.vue';

export default {
  name: 'gridBody',
  mixins: [props],

  created: function() {
    if (!this.$bus) {
      return;
    }

    this.$bus.$on('ROW_UPDATED', row => {
      this.$set(this.data, row.id, row.data);
    });
  },

  methods: {
    getObjectValue,

    onCellClicked(row, column, rowId) {
      if (!('clickEvent' in column) || typeof column.clickEvent !== 'function') {
        return;
      }

      column.clickEvent(column, row, rowId);
    },

    columnRender(column, row) {
      const value = column.field ? getObjectValue(row, column.field) : null;
      return column.render(...[value, row]);
    },

    tdClass(column, row) {
      if (typeof column.tdClass == 'string') {
        return column.tdClass;
      }
      if (typeof column.tdClass == 'function') {
        const value = column.field ? getObjectValue(row, column.field) : null;
        return column.tdClass(value, row);
      }
      return null;
    }
  }
};
</script>
