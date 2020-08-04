<template>
  <div class="flex mb-4">
    <div class="w-2/3 bg-gray-400 h-12">
      <table class="border-collapse w-full mt-5">
        <thead>
          <tr>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              TEMPERATURE
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              WINDSPEED
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              CREATED_AT
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in datas"
            :key="data.id"
            :data="data"
            class="bg-white  lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
          >
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
              ></span>
              {{ data.temperature }} °C
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
              ></span>
              {{ data.windspeed }} km/h
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
              ></span>
              <span class="rounded bg-red-400 py-1 px-3 text-xs font-bold">{{
                data.created_at
              }}</span>
            </td>

            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                >Actions</span
              >

              <button
                class="bg-tranparent text-sm hover:bg-green hover:text-white text-green border border-green no-underline font-bold py-2 px-4 mr-2 rounded"
                @click.prevent="runData(data)"
              >
                <fa-icon icon="play" class="clicked" />
              </button>
              <button
                class="bg-tranparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
                @click.prevent="editData(data)"
              >
                <fa-icon icon="pen" class="clicked" />
              </button>
              <button
                class="bg-transparent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
                @click.prevent="removeData(data)"
              >
                <fa-icon icon="trash" class="clicked" />
              </button>
            </td>
            <div v-if="data == editedData" v-show="showTable">
              <form action @submit.prevent="updateData(data)">
                <div class="mt-3 ml-5">
                  <label for="data_temperature" class="label"
                    >Temperature</label
                  >
                  <input
                    id="data_temperature"
                    class="input mb-6"
                    v-model="data.temperature"
                  />
                  <label for="data_windspeed" class="label">Windspeed</label>
                  <input
                    id="data_windspeed"
                    class="input"
                    v-model="data.windspeed"
                  />
                  <input
                    type="submit"
                    value="Update"
                    class="my-2  text-sm hover:bg-blue hover:text-white   border-blue  font-bold py-2 px-4 rounded cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-1/3 bg-gray-400 ml-16 h-12">
      <form @submit.prevent="addData">
        <div class="mb-6 mt-5">
          <label for="record_description" class="label">TEXT</label>
          <input
            type="number"
            id="record_description"
            class="input"
            autofocus
            autocomplete="off"
            placeholder="Type a text here..."
            v-model="newData.temperature"
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
            v-model="newData.windspeed"
          />
        </div>

        <div id="app"></div>
        <input
          type="submit"
          value="ADD"
          class=" font-sans font-bold px-4  rounded text-white cursor-pointer no-underline bg-blue hover:bg-blue-dark block w-full py-4 whitetext items-center justify-center "
        />
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "Data",
  data() {
    return {
      newData: [],
      datas: [],
      editedData: "",
      showTable: false
    };
  },

  created() {
    if (!localStorage.signedIn) {
      this.$router.replace("/");
    } else {
      this.$http.secured
        .get("/api/v1/data")
        .then(response => {
          console.log(response.data);
          this.datas = response.data;
        })
        .catch(error => this.setError(error, "Something went wrong"));
    }
  },
  methods: {
    ...mapActions(["setdataId"]),
    removeData(data) {
      this.$http.secured
        .delete(`/api/v1/data/${data.id}`)
        .then(response => {
          this.datas.splice(this.datas.indexOf(data), 1);
        })
        .catch(error => this.setError(error, "Cannot delete record"));
    },
    addData() {
      const value = this.newData;
      if (!value) {
        return;
      }
      this.$http.secured
        .post("/api/v1/data/", {
          datum: {
            temperature: this.newData.temperature,
            windspeed: this.newData.windspeed
          }
        })
        .then(response => {
          this.datas.push(response.data);
          this.newRecord = "";
          this.$router.go();
        })
        .catch(error => this.setError(error, "Cannot create record"));
    },
    runData(data) {
      //   this.setTemplate(template.id);
      //   localStorage.dataid = data.id;
      console.log(data.id);
      this.setdataId(data.id);
      localStorage.dataId = data.id;
    },
    editData(data) {
      this.editedData = data;
      this.showTable = !this.showTable;
    },
    updateData(data) {
      this.editedData = "";
      this.$http.secured
        .patch(`/api/v1/data/${data.id}`, {
          datum: { temperature: data.temperature, windspeed: data.windspeed }
        })
        .catch(error => this.setError(error, "Cannot update template"));
    }
  }
};
</script>

<style></style>
