export default {
  template: `
  <div>
    <h6>{{ row.age }}</h6>

    <button type="button" class="btn btn-outline-secondary" @click.prevent="emitRowUpdated">
      <span>
        emit row update
      </span>
    </button>
  </div>
  `,
  props: ['row', 'rowIdInSourceArray', 'extraProps'],
  data: function() {
    return {};
  },
  methods: {
    emitRowUpdated() {
      const newRowData = this.row;
      newRowData.age *= Math.floor((Math.random() * 10) + 1);

      this.extraProps.bus.$emit('ROW_UPDATED', {
        data: newRowData,
        id: this.rowIdInSourceArray
      });
    }
  }
};

