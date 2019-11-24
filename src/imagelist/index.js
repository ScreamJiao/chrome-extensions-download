import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import { Row, Col, Popover, Button, Card, Dialog } from 'element-ui';

Vue.use(Row);
Vue.use(Col);
Vue.use(Popover);
Vue.use(Button);
Vue.use(Card);
Vue.use(Dialog);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
