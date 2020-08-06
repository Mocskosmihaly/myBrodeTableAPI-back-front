// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueAxios from "vue-axios";
import { securedAxiosInstance, plainAxiosInstance } from "./backend/axios";
import store from "./store";
import "./main.css";
import vuetify from "vuetify";
import Toasted from "vue-toasted";
import "vuetify/dist/vuetify.min.css";
import "./icons.js";

Vue.use(vuetify);
Vue.config.productionTip = false;
Vue.use(Toasted);
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: "<App/>"
});
