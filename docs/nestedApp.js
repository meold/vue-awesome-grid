import nestedComp from './nestedComp.js';

// eslint-disable-next-line
new Vue({
  el: '#app',
  template: `
    <div class="card">
      <div class="card-header">
          <div class="float-right">
              <button type="button" class="btn btn-outline-primary" @click.prevent="callBackend">
                  <span>
                      <i class="fas fa-server"></i> fake backend
                  </span>
              </button>
          </div>
          <h5 class="card-title">Vue awesome grid</h5>
          <h6 class="card-subtitle">
              <code>query: {{ query }}</code>
          </h6>
      </div>
      <div class="card-body noSwipe">
          <vue-awesome-grid v-bind="$data" />
      </div>
    </div>
  `,
  data: function () {
    return {
      columns: [
        {
          title: "#",
          field: 'id',
          sortable: true
        },
        {
          title: "Name",
          field: 'name'
        },
        {
          title: "Age",
          field: null,
          tdClass: 'text-center',
          thClass: 'text-center',
          tdComp: nestedComp
        }
      ],
      data: [
        {
          id: 1,
          name: 'Test',
          age: '21'
        },
        {
          id: 2,
          name: 'Vasya',
          age: '32'
        },
        {
          id: 3,
          name: 'Petya',
          age: '43'
        }
      ],
      total: 3,
      query: {},
      headerSettings: true,
      pagination: true,
      extraProps: {
        bus: new Vue() // eslint-disable-line
      }
    };
  },

  methods: {
      callBackend() {
        this.data = this.data.reverse();
      }
  }
});
