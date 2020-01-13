<template>
  <thead>
    <transition-group name="fade" tag="tr">
      <th v-for="(col, id) in columns"
        :key="col.title || col.field || id"
        :class="col.thClass || null">
          <a href="#" @click.prevent="handleClick(col.field)" v-if="col.sortable">
            {{ col.title }}
            <i :class="currentSortClass(col)"></i>
          </a>
          <template v-else>
            {{ col.title }}
          </template>
      </th>
    </transition-group>
  </thead>
</template>

<script>
import props from '../mixins/gridProps.vue';

export default {
  name: 'gridHeader',
  mixins: [ props ],

  data: () => {
    return {
      order: '',
      field: null
    };
  },

  watch: {
    query: {
      handler: function({ sort, order }) {
        if (sort) {
          this.field = sort;
        }

        this.order = order || '';
      },

      deep: true,
      immediate: true
    }
  },

  methods: {
    handleClick(field) {
      this.field = field;

      this.order = this.order === 'desc' ? 'asc' : 'desc';

      this.query.sort = this.field;
      this.query.order = this.order;
    },

    currentSortClass(column) {
      if (column.field !== this.field) {
        return 'fas fa-sort text-muted';
      }

      return [
        'fas',
        {
          'fa-sort text-muted': !this.order,
          'fa-sort-up': this.order === 'asc',
          'fa-sort-down': this.order === 'desc'
        }
      ];
    }
  }
};
</script>
