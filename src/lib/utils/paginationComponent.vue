<template>
  <div class="grid-footer row">
    <div class="col-sm-5" role="status" aria-live="polite" v-if="total">
      <template v-if="isFiltered">
        {{ getCurrentVisibleLabel}} {{ of }} {{ filtered }} ({{ from }} {{ total }})
      </template>
      <template v-else>
        {{ getCurrentVisibleLabel }} {{ of }} {{ total }}
      </template>
    </div>

    <div class="col-sm-7" v-if="isPaginationVisible">
      <nav>
        <ul class="pagination">
          <li v-show="!isFirstPage" class="paginate_button page-item previous" @click="changePageTo(-1)">
            <a href="#" class="page-link" @click.prevent><span aria-hidden="true">&laquo;</span></a>
          </li>

          <li
            v-for="(number, id) in pageNumbers"
            :class="['paginate_button page-item', { 'active': number === currentPage, 'disabled': number == 0}]"
            :key="id">
            <a v-if="number !== 0" href="#" class="page-link" @click.prevent="pageClick(number)">
              {{ number }}
            </a>

            <a v-else class="page-link">
              <i class="fas fa-ellipsis-h"></i>
            </a>
          </li>

          <li v-show="!isLastPage" class="paginate_button page-item next" @click="changePageTo(1)">
            <a href="#" class="page-link" @click.prevent><span aria-hidden="true">&raquo;</span></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginationComponent',
  props: {
    total: {
      type: Number,
      required: true
    },
    filtered: {
      type: Number
    },
    query: {
      type: Object,
      required: true
    }
  },

  computed: {
    isFiltered() {
      return this.filtered && this.filtered > 0 && this.filtered < this.total;
    },

    isPaginationVisible() {
      return this.filtered !== 0 && this.totalPageCount > 1;
    },

    totalEntriesCount() {
      return (this.filtered && this.filtered > 0) ? this.filtered : this.total;
    },

    getCurrentVisibleLabel() {
      let result = this.query.offset + 1;
      result += ' - ';

      if (this.query.offset + this.query.limit < this.totalEntriesCount) {
        result += this.query.offset + this.query.limit;
        return result;
      }

      result += this.totalEntriesCount;
      return result;
    },

    isFirstPage() {
      return this.query.offset === 0 || this.query.limit >= this.totalEntriesCount;
    },

    isLastPage() {
      return this.query.offset + this.query.limit >= this.totalEntriesCount;
    },

    totalPageCount() {
      return Math.ceil(this.totalEntriesCount / this.query.limit);
    },

    currentPage() {
      return Math.ceil(this.query.offset / this.query.limit) + 1;
    },

    pageNumbers() {
      const n = this.totalPageCount;
      const currentPage = this.currentPage;

      if (n <= 9) {
        const arr = Array(n);

        for (let i = 0; i < n; i++) {
          arr[i] = i + 1;
        }

        return arr;
      }

      // 0 represents ...
      if (currentPage <= 5) {
        return [1, 2, 3, 4, 5, 6, 7, 0, n];
      }

      if (currentPage >= n - 4) {
        return [1, 0, n-6, n-5, n-4, n-3, n-2, n-1, n];
      }

      const i = currentPage;
      return [1, 0, i-2, i-1, i, i+1, i+2, 0, n];
    },

    of() {
      if (this.$i18n && this.$t) {
        return this.$t('vueAwesomeGrid.of');
      }

      return 'of';
    },

    from() {
      if (this.$i18n && this.$t) {
        return this.$t('vueAwesomeGrid.from');
      }

      return 'from';
    }
  },

  mounted: function() {
    this.refreshSelectPicker();
  },

  updated: function() {
    this.refreshSelectPicker();
  },

  methods: {
    // in case jquery select picker is used
    // https://developer.snapappointments.com/bootstrap-select/
    refreshSelectPicker() {
      if (typeof $ === 'undefined' && typeof window.$ === 'undefined') {
        return;
      }

      // eslint-disable-next-line no-undef
      let el = $('.selectpicker');
      if (window.$) {
        el = window.$('.selectpicker');
      }

      if (!el || el.length <= 0) {
        return;
      }

      if (typeof el.selectpicker != 'function') {
        return;
      }

      el.selectpicker('refresh');
    },

    pageClick(n) {
      this.$set(this.query, 'offset', (n - 1) * this.query.limit);
    },

    changePageTo(i) {
      if ((i < 0 && this.isFirstPage) || (i > 0 && this.isLastPage)) {
        return;
      }

      this.$set(this.query, 'offset', this.query.offset + i * this.query.limit);
    }
  }
};
</script>
