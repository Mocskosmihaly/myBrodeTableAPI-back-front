<template>
  <div class="max-w-lg ml-10 py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3
      class="block flex font-mono ml-16 mr-5 text-3xl mb-6 mt-5 font-semibold"
    >
      TEMPLATE: {{ titleId }}
    </h3>

    <form @submit.prevent="addRecord">
      <div class="mb-6">
        <label for="record_description" class="label">TEXT</label>
        <input
          max-w-md
          type="text"
          id="record_description"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type a text here..."
          v-model="newRecord.description"
        />
      </div>

      <div class="mb-6">
        <label for="record_time" class="label">SECUND</label>
        <input
          type="number"
          id="record_time"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="For how long ..."
          v-model="newRecord.time"
        />
      </div>

      <!-- BUTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONS -->

      <!-- <div class="mx-auto max-w-sm text-center flex flex-wrap justify-center">
        <div class="flex items-center mr-4 mb-4">
          <input id="radio1" type="radio" name="radio" class="hidden" checked />
          <label for="radio1" class="flex items-center cursor-pointer">
            <span class="w-4 h-4 inline-block mr-1 border border-grey"></span>
            <img src="https://img.icons8.com/android/15/000000/down.png" />
            Zhora nadol
          </label>
        </div>
        <div class="flex items-center mr-4 mb-4">
          <input id="radio2" type="radio" name="radio" class="hidden" />
          <label for="radio2" class="flex items-center cursor-pointer">
            <span class="w-4 h-4 inline-block mr-1 border border-grey"></span>
            <img src="https://img.icons8.com/android/15/000000/up.png" />
            Zdola nahor
          </label>
        </div>
        <div class="flex items-center mr-4 mb-4">
          <input id="radio3" type="radio" name="radio" class="hidden" />
          <label for="radio3" class="flex items-center cursor-pointer">
            <span class="w-4 h-4 inline-block mr-1 border border-grey"></span>
            <img src="https://img.icons8.com/android/15/000000/right.png" />
            Zlava doprava
          </label>
        </div>
        <div class="flex items-center mr-4 mb-4">
          <input id="radio4" type="radio" name="radio" class="hidden" />
          <label for="radio4" class="flex items-center cursor-pointer">
            <span class="w-4 h-4 inline-block mr-1 border border-grey"></span>
            <img src="https://img.icons8.com/android/15/000000/left.png" />
            Zprava dolava
          </label>
        </div>
      </div>
      <label class="inline-flex items-center mt-3">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-teal-600" />
        <span class="ml-2 mr-5 text-gray-700">
          Blikanie
          <img src="https://img.icons8.com/android/15/000000/star.png" />
        </span>
      </label>
      <label class="inline-flex items-center mt-3">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-teal-600" />
        <span class="ml-2 text-gray-700">
          Tucne pismo
          <img src="https://img.icons8.com/android/15/000000/bold.png" />
        </span>
      </label>-->
      <!-- BUTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONS -->

      <div class="mb-6">
        <label for="record_effect" class="label">EFFECTS</label>
        <select-set
          v-model="selectedEff"
          label-name="EFFECT"
          :options="effectOptions"
        />
        <div class="block flex font-mono ml-16 mr-5 text-xl mt-5 font-semibold">
          VYBRANE:
          <p class="selectedone">{{ selectedEff.key }}</p>
          <div class="ml-4" v-if="selectedEff.value === 5">
            <img src="https://img.icons8.com/android/15/000000/star.png" />
          </div>
          <div class="ml-4" v-if="selectedEff.value === 6">
            <img src="https://img.icons8.com/android/15/000000/bold.png" />
          </div>
          <div class="ml-4" v-if="selectedEff.value === 7">
            <img src="https://img.icons8.com/android/15/000000/star.png" />
            <img src="https://img.icons8.com/android/15/000000/bold.png" />
          </div>
          <div class="ml-4" v-if="selectedEff.value === 8"></div>
        </div>
      </div>
      <div class="mb-6">
        <label for="record_path" class="label">PATH</label>
        <radio-set
          v-model="selected"
          label-name="PATHS"
          :options="pathOptions"
        />

        <div class="block flex font-mono ml-16 mr-5 text-xl mt-5 font-semibold">
          VYBRANE:
          <p class="selectedone">{{ selected.key }}</p>
          <div class="ml-4" v-if="selected.value === 1">
            <img src="https://img.icons8.com/android/15/000000/down.png" />
          </div>
          <div class="ml-4" v-if="selected.value === 2">
            <img src="https://img.icons8.com/android/15/000000/up.png" />
          </div>
          <div class="ml-4" v-if="selected.value === 3">
            <img src="https://img.icons8.com/android/15/000000/right.png" />
          </div>
          <div class="ml-4" v-if="selected.value === 4">
            <img src="https://img.icons8.com/android/15/000000/left.png" />
          </div>
        </div>

        <!-- </radio-set> -->
      </div>
      <div class="mb-6">
        <label for="template" class="label">template</label>
        <select id="template" class="select" v-model="newRecord.template">
          <option disabled value>Select an template</option>
          <option
            :value="template.id"
            v-for="template in templates"
            :key="template.id"
            >{{ template.name }}</option
          >
        </select>
      </div>

      <div id="app"></div>
      <input
        type="submit"
        value="ADD"
        class=" font-sans font-bold px-4  rounded text-white cursor-pointer no-underline bg-blue hover:bg-blue-dark block w-full py-4 whitetext items-center justify-center "
      />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4 ">
      <li
        class="py-4"
        v-for="record in records"
        v-show="getTemplate(record) === titleId"
        :key="record.id"
        :record="record"
      >
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex justify-between flex-wrap pr-4">
            <p class="block flex font-mono font-semibold flex items-center">
              <img
                src="https://img.icons8.com/wired/30/000000/database-export.png"
              />
              {{ record.description }} &mdash; {{ record.time }}s &mdash;
              <img
                class="ml-5 mr-5"
                v-if="record.effect === 'Blikanie textu'"
                src="https://img.icons8.com/android/15/000000/star.png"
              />
              <img
                class="ml-5 mr-5"
                v-if="record.effect === 'Tucne pismo'"
                src="https://img.icons8.com/android/15/000000/bold.png"
              />
              <img
                class="ml-5 mr-4"
                v-if="record.effect === 'Blikanie textu aj Tucne pismo'"
                src="https://img.icons8.com/android/15/000000/star.png"
              />
              <img
                class="mr-5"
                v-if="record.effect === 'Blikanie textu aj Tucne pismo'"
                src="https://img.icons8.com/android/15/000000/bold.png"
              />
              <img
                class="ml-5 mr-5"
                v-if="record.effect === 'Nechcem effect'"
                src="https://img.icons8.com/metro/15/000000/x-men.png"
              />
              &mdash;
              <img
                class="ml-5 mr-5"
                v-if="record.path === 'Zdola nahor'"
                src="https://img.icons8.com/android/15/000000/up.png"
              />
              <img
                class="ml-5 mr-5"
                v-if="record.path === 'Zhora nadol'"
                src="https://img.icons8.com/android/15/000000/down.png"
              />
              <img
                class="ml-5 mr-5"
                v-if="record.path === 'Zlava doprava'"
                src="https://img.icons8.com/android/15/000000/right.png"
              />
              <img
                class="ml-5 mr-5"
                v-if="record.path === 'Zprava dolava'"
                src="https://img.icons8.com/android/15/000000/left.png"
              />
            </p>

            <p class="block font-mono font-semibold">
              {{ getTemplate(record) }}
            </p>
          </div>

          <button
            class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
            @click.prevent="editRecord(record)"
          >
            <fa-icon icon="pen" class="clicked" />
          </button>

          <button
            class="bg-transparent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
            @click.prevent="removeRecord(record)"
          >
            <fa-icon icon="trash" class="clicked" />
          </button>
        </div>

        <div v-if="record == editedRecord" v-show="showTableE">
          <form action @submit.prevent="updateRecord(record)">
            <div
              class="mb-6 p-4 bg-white rounded border border-grey-light mt-4"
            >
              <div class="mb-6">
                <label class="label">TEXT</label>
                <input class="input" v-model="record.description" />
              </div>

              <div class="mb-6">
                <label class="label">SECUND</label>
                <input class="input" v-model="record.time" />
              </div>
              <!-- <div class="mb-6">
                <label class="label">EFFECT</label>
                <input class="input" v-model="record.effect" />
              </div> -->
              <!-- <div class="mb-6">
                <label class="label">PATH</label>
                <input class="input" v-model="record.path" />
              </div> -->
              <div class="mb-6">
                <select id="path_update" class="select" v-model="record.effect">
                  <option disabled value>Select an template</option>
                  <option
                    v-for="record in effectOptions"
                    :value="record.key"
                    :key="record.value"
                    >{{ record.key }}</option
                  >
                </select>
              </div>

              <div class="mb-6">
                <select id="path_update" class="select" v-model="record.path">
                  <option disabled value>Select an template</option>
                  <option
                    v-for="record in pathOptions"
                    :value="record.key"
                    :key="record.value"
                    >{{ record.key }}</option
                  >
                </select>
              </div>

              <div class="mb-6">
                <select
                  id="template_update"
                  class="select"
                  v-model="record.template"
                >
                  <option disabled value>Select an template</option>
                  <option
                    :value="template.id"
                    v-for="template in templates"
                    :key="template.id"
                    >{{ template.name }}</option
                  >
                </select>
              </div>

              <input
                type="submit"
                value="Update"
                class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
              />
            </div>
          </form>
        </div>
      </li>
    </ul>
    <v-divider></v-divider>
    <v-btn @click="showTemplate" class="m-5 " outlined>
      <fa-icon icon="eye" />
    </v-btn>

    <Table v-show="showTable" />
  </div>
</template>

<script>
import moment from "moment";
import Table from "../table/Table";
import RadioSet from "./RadioSet";
import SelectSet from "./SelectSet";
export default {
  name: "Records",
  data() {
    return {
      templates: [],
      records: [],

      newRecord: [],
      error: "",
      editedRecord: "",
      selected: "",
      selectedEff: "",
      showTableE: false,
      showTable: false,
      pathOptions: [
        { key: "Zhora nadol", value: 1 },
        { key: "Zdola nahor", value: 2 },
        { key: "Zlava doprava", value: 3 },
        { key: "Zprava dolava", value: 4 }
      ],
      effectOptions: [
        { key: "Blikanie textu", value: 5 },
        { key: "Tucne pismo", value: 6 },
        { key: "Blikanie textu aj Tucne pismo", value: 7 },
        { key: "Nechcem effect", value: 8 }
      ]
    };
  },
  components: {
    RadioSet,
    SelectSet,
    Table
  },
  computed: {
    titleId() {
      return this.$route.params.id;
    },

    createdDate() {
      return moment().format("DD-MM-YYYY ");
    },
    createdHours() {
      return moment().format("HH:mm ");
    }
  },
  created() {
    if (!localStorage.signedIn) {
      this.$router.replace("/");
    } else {
      this.$http.secured
        .get("/api/v1/records")
        .then(response => {
          this.records = response.data;
        })
        .catch(error => this.setError(error, "Something went wrong"));
      this.$http.secured
        .get("/api/v1/templates")
        .then(response => {
          this.templates = response.data;
        })
        .catch(error => this.setError(error, "Something went wrong"));
    }
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    getTemplate(record) {
      const recordTemplateValues = this.templates.filter(
        template => template.id === record.template_id
      );
      let template;
      recordTemplateValues.forEach(function(element) {
        template = element.name;
      });
      return template;
    },
    showTemplate() {
      this.showTable = !this.showTable;
    },
    addRecord() {
      const value = this.newRecord;
      if (!value) {
        return;
      }
      this.$http.secured
        .post("/api/v1/records/", {
          record: {
            description: this.newRecord.description,
            time: this.newRecord.time,
            path: this.selected.key,

            effect: this.selectedEff.key,
            template_id: this.newRecord.template
          }
        })
        .then(response => {
          this.records.push(response.data);
          this.newRecord = "";
          this.$router.go();
        })
        .catch(error => this.setError(error, "Cannot create record"));
    },
    removeRecord(record) {
      this.$http.secured
        .delete(`/api/v1/records/${record.id}`)
        .then(response => {
          this.records.splice(this.records.indexOf(record), 1);
        })
        .catch(error => this.setError(error, "Cannot delete record"));
    },
    editRecord(record) {
      this.showTableE = !this.showTableE;
      this.editedRecord = record;
    },
    updateRecord(record) {
      this.editedRecord = "";
      this.$http.secured
        .patch(`/api/v1/records/${record.id}`, {
          record: {
            description: record.description,
            time: record.time,
            path: record.path,
            effect: record.effect,

            template_id: record.template
          }
        })
        .catch(error => this.setError(error, "Cannot update record"));
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&family=Roboto:ital,wght@1,300&display=swap");

* {
  box-sizing: border-box;
}

h1 {
  position: absolute;
  clip: rect(0, 0, 300px, 0);
}

h1.is-active {
  clip: rect(0, 1100px, 300px, -300px);
}
#degree {
  justify-content: center;
  display: flex;
  /* flex-direction: column; */
  align-content: center;
  justify-content: center;
}

body {
  font-family: "Raleway", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}
.btnrun {
  color: #1f9d55;
  margin-left: 550px;
}
.container2 {
  background-color: rgb(0, 0, 0);
  padding-top: 35px;
  height: 100px;
}
.content {
  width: 100px;
  height: 100px;
  animation: move 20s linear infinite;
  color: #fff;
}
.text-white {
  color: #fff;
}
.content2 {
  width: 100px;
  height: 100px;
  animation: move2 1s infinite alternate;
}
span {
  height: 200px;
}

@keyframes move2 {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

@keyframes move {
  0% {
    transform: translate(50px);
    opacity: 1;
  }
  50% {
    transform: translate(500px);
    opacity: 1;
  }

  52% {
    transform: translate(500px);
    opacity: 0;
  }
  54% {
    transform: translate(500px);
    opacity: 1;
  }
  56% {
    transform: translate(500px);
    opacity: 0;
  }
  58% {
    transform: translate(500px);
    opacity: 1;
  }
  60% {
    transform: translate(500px);
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translate(50px);
  }
}

.container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(12, 16, 31, 0.4);
  padding: 100px;
  margin: auto;
  max-width: 100%;
  width: 1000px;
}
.colc {
  font-size: 1.3em;
}

table {
  border-spacing: 0 4px;
  color: #e7f340;
  width: 100%;
}

table th,
table td {
  padding: 15px;
  text-align: left;
}

table tbody tr {
  background-color: #000000;
}

table tbody tr:hover {
  background-color: #151b31;
  box-shadow: 0 3px 5px rgba(255, 255, 255, 0.4);
}
.default {
  font-size: 1.2rem;
}

.container2 h1 {
  color: #fff;
  font-size: 1.5em;
  width: 100%;
}
.container2 {
  background-color: #000000;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(12, 16, 31, 0.4);
}
.container2:hover {
  background-color: #151b31;
  box-shadow: 0 3px 5px rgba(255, 255, 255, 0.4);
}

table .delete {
  background-color: #242c4c;
  border: 0;
  border-radius: 2px;
  color: #909090;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  opacity: 0;
}
.colc.szwsz {
  padding-left: 45px;
}

.input {
  width: 30vw;
}
.backed {
  background-color: rgba(0, 0, 0, 0.3);
}

input[type="radio"] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span {
  transform: scale(1.2);
}

input[type="radio"]:checked + label span {
  background-color: #1f9d55;
  box-shadow: 0px 0px 0px 2px white inset;
}

input[type="radio"]:checked + label {
  color: #1f9d55;
}

.selectedone {
  background: chartreuse;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  table tbody tr .delete {
    opacity: 1;
  }

  /* Hide 3rd column */
  table th:nth-of-type(3),
  table td:nth-of-type(3) {
    display: none;
  }
}
</style>
