<template>
  <div class="table-filters-container" ref="tableFiltersContainer" name="headerSettings">
    <div class="grid_filter">
      <form autocomplete="off" @submit.prevent>
        <label>
          <input
            type="search"
            ref="periodDtSearchInput"
            class="form-control form-control-sm"
            :class="{ disabled: !isSearchEnabled }"
            placeholder="Search"
            @input="doSearch($event.target.value)"
            :disabled="!isSearchEnabled">
        </label>
      </form>
    </div>

    <div class="grid_length" v-if="pagination">
      <label>
        <select
          class="selectpicker"
          data-width="fit"
          data-style="btn-link"
          v-model="query.limit"
          @change="query.offset = 0">
          <option v-for="(size, id) in pageSizeOptions" :value="size" :key="id">{{ size }}</option>
        </select>
        entries
      </label>
    </div>

    <div class="filter-container text-right">
      <div class="dropdown">
        <button
          class="btn btn-link visibility-dropdown-toggler dropdown-toggle column-visibility-button"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <i class="fas fa-cog"></i>
        </button>

        <div class="dropdown-menu visibility-dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div class="column" v-for="(col, id) in filteredColumnsArray" :key="col.id || col.title || col.field || id">
            <label class="custom-control custom-checkbox" @click.stop>
              <input
                class="custom-control-input"
                type="checkbox"
                :checked="typeof col.visible === 'undefined' || '' + col.visible === 'true'"
                :disabled="typeof col.visible === 'string'"
                @change="handleChange(col, $event.target.checked)">

              <span class="custom-control-label">
                {{ col.label || col.title }}
              </span>
            </label>
          </div>

          <div class="clearfix">
            <div class="btn-group btn-group-sm pull-right">
              <button class="btn btn-default" type="button" @click="apply()">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerSettings',
  props: {
    columns: {
      type: Array,
      required: true
    },
    query: {
      type: Object,
      required: true
    },
    pageSizeOptions: {
      type: Array,
      required: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    isSearchEnabled: {
      type: Boolean,
      default: true
    }
  },

  data: function() {
    return {
      changes: []
    };
  },

  computed: {
    filteredColumnsArray() {
      return this.columns.filter(col => col.label || col.title);
    }
  },

  methods: {
    apply() {
      this.changes.forEach(({ col, isChecked }) => {
        this.$set(col, 'visible', isChecked);
      });
      this.changes = [];
    },

    handleChange (col, isChecked) {
      this.changes.push({ col, isChecked });
    },

    doSearch(q) {
      this.query.offset = 0;
      this.query.search = q;
    }
  }
};
</script>
