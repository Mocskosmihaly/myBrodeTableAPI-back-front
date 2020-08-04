import Vue from "vue";
import Router from "vue-router";
import Signin from "@/components/Signin.vue";
import Signup from "@/components/Signup.vue";
import Records from "@/components/records/Records.vue";
import Templates from "@/components/templates/Templates.vue";
import Table from "@/components/table/Table.vue";
import Data from "@/components/data/Data.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/templates",
      name: "Templates",
      component: Templates,
      children: [
        {
          path: "/templates/records/:id",
          components: { records: Records },
          name: "records"
        }
      ]
    },
    {
      path: "/table",
      name: "Table",
      component: Table
    },
    {
      path: "/data",
      name: "Data",
      component: Data
    },
    {
      path: "/",
      name: "Signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
  ]
});
