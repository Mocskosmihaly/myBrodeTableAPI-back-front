<template>
  <div class="flex mb-4 ml-5 py-10">
    <div class="w-1/3 max-w-sm bg-gray-400 h-12">
      <div class="text-red" v-if="error">{{ error }}</div>
      <h3 class="font-mono font-regular text-3xl mb-4">SHEETS</h3>
      <form action @submit.prevent="addTemplate">
        <div class="mb-6">
          <input
            class="input"
            autofocus
            autocomplete="off"
            placeholder="Add a new sheet"
            v-model="newTemplate.name"
          />
        </div>
        <input
          type="submit"
          value="Add a sheet"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-blue hover:bg-blue-dark block w-full py-4 whitetext items-center justify-center"
        />
      </form>

      <!-- HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO -->

      <!-- HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO -->

      <hr class="border border-grey-light my-6" />

      <ul class="list-reset mt-4">
        <input
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Filter..."
          v-model="search"
        />
        <li
          class="py-4"
          v-for="template in filteredTemplates"
          :key="template.id"
          :template="template"
        >
          <router-link
            class="underlineoff"
            :to="{
              name: 'records',
              params: { id: template.name }
            }"
          >
            <div class="flex items-center justify-between flex-wrap">
              <p class="block flex-1 font-mono font-semibold flex items-center">
                <img
                  src="https://img.icons8.com/wired/30/000000/activity-grid.png"
                />
                {{ template.name }} (id : {{ template.id }})
              </p>

              <button
                class="bg-tranparent text-sm hover:bg-green hover:text-white text-green border border-green no-underline font-bold py-2 px-4 mr-2 rounded"
                @click.prevent="runTemplate(template)"
              >
                <fa-icon icon="play" class="clicked" />
              </button>
              <button
                class="bg-tranparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
                @click.prevent="editTemplate(template)"
              >
                <fa-icon icon="pen" class="clicked" />
              </button>

              <button
                class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
                @click.prevent="removeTemplate(template)"
              >
                <fa-icon icon="trash" class="clicked" />
              </button>
            </div>
            <v-divider></v-divider>
          </router-link>

          <div v-if="template == editedTemplate" v-show="showTable">
            <form action @submit.prevent="updateTemplate(template)">
              <div
                class="mb-6 p-4 bg-white rounded border border-grey-light mt-4"
              >
                <input class="input" v-model="template.name" />
                <input
                  type="submit"
                  value="Update"
                  class="my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer"
                />
              </div>
            </form>
          </div>
        </li>
      </ul>
    </div>

    <div class="w-2/3 bg-gray-400 h-12">
      <router-view name="records" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Templates",
  data() {
    return {
      templates: [],
      newTemplate: [],
      error: "",
      editedTemplate: "",
      search: "",
      showTable: false,
      dialog: false,
      show_modal: false,
      show_modal_class: "bg-grey-darker h-screen z-0",
      hide_modal_class: "bg-white h-screen z-0"
    };
  },
  created() {
    if (!localStorage.signedIn) {
      this.$router.replace("/");
    } else {
      this.$http.secured
        .get("/api/v1/templates")
        .then(response => {
          this.templates = response.data;
        })
        .catch(error => this.setError(error, "Something went wrong"));
    }
  },
  computed: {
    filteredTemplates() {
      return this.templates.filter(template => {
        return template.name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods: {
    ...mapActions(["setTemplate"]),
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    addTemplate() {
      const value = this.newTemplate;
      if (!value) {
        return;
      }
      this.$http.secured
        .post("/api/v1/templates/", {
          template: { name: this.newTemplate.name }
        })

        .then(response => {
          this.templates.push(response.data);
          this.newTemplate = "";
          this.$router.go();
        })
        .catch(error => this.setError(error, "Cannot create template"));
    },
    runTemplate(template) {
      this.setTemplate(template.id);
      localStorage.id = template.id;
    },
    removeTemplate(template) {
      this.$http.secured
        .delete(`/api/v1/templates/${template.id}`)
        .then(response => {
          this.templates.splice(this.templates.indexOf(template), 1);
        })
        .catch(error => this.setError(error, "Cannot delete template"));
    },
    editTemplate(template) {
      this.editedTemplate = template;
      this.showTable = !this.showTable;
    },
    updateTemplate(template) {
      this.editedTemplate = "";
      this.$http.secured
        .patch(`/api/v1/templates/${template.id}`, {
          template: { name: template.name }
        })
        .catch(error => this.setError(error, "Cannot update template"));
    }
  }
};
</script>

<style scoped>
.whitetext {
  color: #fff;
}
.underlineoff {
  text-decoration: none;
}
.clicked:active {
}
</style>
