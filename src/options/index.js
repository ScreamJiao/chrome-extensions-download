import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import { Row, Col, Select, TimeSelect } from 'element-ui';

Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(TimeSelect);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
