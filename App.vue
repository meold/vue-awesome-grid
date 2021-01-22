<template>
  <div class="wrapper">
    <a
      class="github-fork-ribbon"
      href="https://github.com/meold/vue-awesome-grid"
      title="Fork me on GitHub"
      >Fork me on GitHub</a
    >

    <h1>vue-awesome-grid</h1>

    <div class="card">
      <div class="card-header">
        <div class="float-right">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click.prevent="callBackend"
          >
            <span> <i class="fas fa-server"></i> fake backend </span>
          </button>
        </div>
        <h5 class="card-title">Vue awesome grid</h5>
        <h6 class="card-subtitle">
          <code>query: {{ query }}</code>
        </h6>
      </div>
      <div class="card-body noSwipe">
        <vue-awesome-grid class="awesome-grid" v-bind="$data" />
      </div>
    </div>
  </div>
</template>

<script>
import { VueAwesomeGrid } from "./src/index";

export default {
  components: {
    VueAwesomeGrid,
  },
  data() {
    return {
      columns: [
        {
          title: "#",
          field: "id",
          sortable: true,
        },
        {
          title: "Name",
          field: "name",
        },
        {
          title: "E-mail",
          field: "email",
        },
      ],
      data: [
        {
          id: 1,
          name: "Test",
          email: "test@mail.net",
        },
        {
          id: 2,
          name: "Vasya",
          email: "v12@j.com",
        },
        {
          id: 3,
          name: "Petya",
          email: "pet@ya.com",
        },
      ],
      total: 3,
      query: {},
      headerSettings: true,
      pagination: true,
    };
  },

  watch: {
    query: {
      handler: function () {
        this.data = JSON.parse(JSON.stringify(this.data));
        this.total = 0;
        this.filtered = 0;
      },

      deep: true,
    },
  },

  methods: {
    callBackend() {
      this.data = this.data.reverse();
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin: 100px auto;
  text-align: center;
}
.wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 230px;
  background: linear-gradient(90deg, #0359b5ff 0%, #f6ce01ff 100%);
  opacity: 0.5;
  z-index: 0;
}
.awesome-grid {
  margin: 30px 0;
}
.text-left {
  text-align: left;
}
.card {
  max-width: 80%;
  margin: 0 auto;
}
.github-fork-ribbon {
  width: 12.1em;
  height: 12.1em;
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;
  font-size: 20px;
  text-decoration: none;
  text-indent: -999999px;
}
.github-fork-ribbon.fixed {
  position: fixed;
}
.github-fork-ribbon:before,
.github-fork-ribbon:after {
  position: absolute;
  display: block;
  width: 15.38em;
  height: 1.54em;
  top: 3.23em;
  right: -3.23em;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
.github-fork-ribbon:before {
  content: "";
  padding: 0.38em 0;
  background-color: #a00;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 0.15))
  );
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15)
  );
  background-image: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15)
  );
  background-image: -ms-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15)
  );
  -webkit-box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
  pointer-events: auto;
}
.github-fork-ribbon:after {
  content: attr(title);
  color: #fff;
  font: 700 1em "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.54em;
  text-decoration: none;
  text-shadow: 0 -0.08em rgba(0, 0, 0, 0.5);
  text-align: center;
  text-indent: 0;
  padding: 0.15em 0;
  margin: 0.15em 0;
  border-width: 0.08em 0;
  border-style: dotted;
  border-color: #fff;
  border-color: rgba(255, 255, 255, 0.7);
}
.github-fork-ribbon.left-top,
.github-fork-ribbon.left-bottom {
  right: auto;
  left: 0;
}
.github-fork-ribbon.left-bottom,
.github-fork-ribbon.right-bottom {
  top: auto;
  bottom: 0;
}
.github-fork-ribbon.left-top:before,
.github-fork-ribbon.left-top:after,
.github-fork-ribbon.left-bottom:before,
.github-fork-ribbon.left-bottom:after {
  right: auto;
  left: -3.23em;
}
.github-fork-ribbon.left-bottom:before,
.github-fork-ribbon.left-bottom:after,
.github-fork-ribbon.right-bottom:before,
.github-fork-ribbon.right-bottom:after {
  top: auto;
  bottom: 3.23em;
}
.github-fork-ribbon.left-top:before,
.github-fork-ribbon.left-top:after,
.github-fork-ribbon.right-bottom:before,
.github-fork-ribbon.right-bottom:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
</style>