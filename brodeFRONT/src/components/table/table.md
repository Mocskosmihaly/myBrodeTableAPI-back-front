<template>
  <body>
    <div
      class="container uppercase text-xl font-mono pl-4 font-semibold no-underline text-indigo-dark hover:text-indigo-darker "
    >
      <table>
        <thead>
          <tr>
            <th scope="col" class="colc">DÁTUM</th>
            <th scope="col header" class="colc">ČAS</th>
            <th scope="col header" class="colc szwsz">TEPLOTA VZDUCHU</th>
            <th scope="col header" class="colc">RÝCHLOST´ VETRA</th>
          </tr>
        </thead>
        <tbody>
          <tr class="priority-200 ">
            <td id="writeDay" class="default ">{{ createdDate }}</td>
            <td data-label="ČAS" id="hour" class="default pl-16">
              {{ createdHours }}
            </td>
            <td
              data-label="TEPLOTA VZDUCHU"
              id="degree"
              class="defaulted  white--text
            "
              v-show="filteredDatas && filteredDatas[0].temperature"
            >
              {{ filteredDatas[0].temperature }} °C
            </td>
            <td
              data-label="RÝCHLOST´ VETRA"
              id="speed"
              class="defaulted"
              v-show="filteredDatas && filteredDatas[0].windspeed"
            >
              {{ filteredDatas[0].windspeed }} km/h
            </td>
          </tr>
        </tbody>
      </table>

      <h1
        v-for="(record, index) of filteredRecords"
        :key="index"
        :record="record"
        :class="{ 'is-active': index === activeSpan }"
      >
        <div :class="getClass(record)">
          <strong v-show="record.path == 'Zdola nahor'"
            >{{ record.description }}
          </strong>
          <strong v-show="record.path == 'Zlava doprava'"
            >{{ record.description }}
          </strong>
          <strong v-show="record.path == 'Zprava dolava'"
            >{{ record.description }}
          </strong>
          <strong v-show="record.path == 'Zhora nadol'"
            >{{ record.description }}
          </strong>
        </div>
      </h1>

      <!-- templatenel megadom egy valtozoba a template.id es ki filtralom a record.template_id === template.id  -->
    </div>

  </body>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Table",
  data() {
    return {
      templates: [],
      records: [],
      activeSpan: 0,
      datas: []
      // currentlyActive: null
      // filteredDatas: []
    };
  },
  mounted() {
    // this.records = this.filteredRecords;
    // this.start();
  },

  computed: {
    ...mapGetters({
      id: "id",
      dataId: "dataId"
    }),

    createdDate() {
      return moment().format("DD-MM-YYYY ");
    },
    createdHours() {
      return moment().format("HH:mm ");
    },

    filteredRecords: function() {
      let localId = this.id;
      let filtered = this.records.filter(record => {
        return record.template_id == localId;
      });
      // console.log(localId);
      // console.log(filtered);
      // console.log(this.records);
      return filtered;
    },
    // filteredDatas: function() {
    //   let localId2 = this.dataId;
    //   let filtered2 = this.datas.filter(data => {
    //     return data.id === localId2;
    //   });
    //   console.log(localId2);
    //   console.log(filtered2);
    //   console.log(this.datas);
    //   return filtered2;
    // }
    filteredDatas: function() {
      let localId2 = this.dataId;
      let filtered2 = this.datas.filter(data => {
        return data.id == localId2;
      });
      // console.log(localId);
      // console.log(filtered);
      // console.log(this.records);
      return filtered2;
    }
  },
  methods: {
    showMe() {
      // console.log(record.time);
      setInterval(() => {
        if (this.activeSpan === this.filteredRecords.length - 1) {
          this.activeSpan = 0;
        } else {
          this.activeSpan++;
        }
      }, 8000);
    },

    // start() {
    //   this.currentlyActive = this.filteredRecords[0];
    //   if (!this.currentlyActive) return;
    //   setTimeout(() => {
    //     this.nextRecord();
    //   }, this.currentlyActive.time * 1000);
    // },
    // nextRecord() {
    //   const currIndex = this.filteredRecords.findIndex(
    //     f => f === this.currentlyActive
    //   );
    //   if (currIndex === this.filteredRecords.length - 1) return;

    //   this.currentlyActive = this.filteredRecords[currIndex + 1];
    //   setTimeout(() => {
    //     this.nextRecord();
    //   }, this.currentlyActive.time * 1000);
    // },
    getClass(record) {
      return {
        zdolanahor: record.path === "Zdola nahor",
        zlavadoprava: record.path === "Zlava doprava",
        zpravadolava: record.path === "Zprava dolava",
        zhoranadol: record.path === "Zhora nadol"
      };
    }
    // getActiveClass(record, index) {
    //   // this.showMe();
    //   // this.showMe(record);
    //   return {
    //     "is-active": index === this.activeSpan
    //   };
    //   // this.showMe(record);
    // }
  },

  created() {
    this.showMe();
    if (!localStorage.signedIn) {
      this.$router.replace("/");
    } else {
      this.$http.secured
        .get("/api/v1/records")
        .then(response => {
          console.log(response.data);
          this.records.splice(0, this.records.length - 1, ...response.data);
        })
        .catch(error => this.setError(error, "Something went wrong"));
      this.$http.secured
        .get("/api/v1/templates")
        .then(response => {
          this.templates = response.data;
        })
        .catch(error => this.setError(error, "Something went wrong"));
      this.$http.secured
        .get("/api/v1/data")
        .then(response => {
          this.datas = response.data;
        })
        .catch(error => this.setError(error, "Something went wrong"));
    }
  }
  // mounted() {
  //   this.$store.dispatch("SET_TEMPLATE");
  //   this.$store.dispatch("SET_DATAID");
  // }
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
  padding-right: 35px;
}
#speed {
  padding-left: 90px;
}
#hour {
  padding-left: 30px;
}

body {
  font-family: "Raleway", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  margin: 0;
}
.container2 {
  background-color: #edf2f7;
  padding-top: 35px;
  height: 100px;
}
.zlavadoprava {
  margin-top: 100px;
  color: yellow;
  width: 1000px;
  height: 1000px;
  animation: move 20s linear infinite;
}
.zhoranadol {
  margin-top: 100px;
  margin-left: 400px;

  color: yellow;

  width: 1000px;
  height: 1000px;
  animation: move2 5s infinite alternate;
}
.zdolanahor {
  margin-top: 100px;
  margin-left: 400px;

  color: yellow;

  width: 1000px;
  height: 1000px;
  animation: move2 5s infinite alternate;
}

.zpravadolava {
  margin-top: 100px;
  color: yellow;

  width: 1000px;
  height: 1000px;
  animation: move4 20s linear infinite;
}

.content2 {
  width: 100px;
  height: 100px;
  /* animation: move2 1s infinite alternate; */
}
span {
  height: 200px;
}

@keyframes move {
  0% {
    transform: translate(50px);
    opacity: 1;
  }
  90% {
    transform: translate(800px);
    opacity: 1;
  }

  92% {
    transform: translate(800px);
    opacity: 0;
  }
  94% {
    transform: translate(800px);
    opacity: 1;
  }
  96% {
    transform: translate(800px);
    opacity: 0;
  }
  98% {
    transform: translate(800px);
    opacity: 1;
  }
  /* 60% {
    transform: translate(500px);
    opacity: 1;
  } */

  100% {
    opacity: 1;
    transform: translate(50px);
  }
}
@keyframes move4 {
  0% {
    transform: translate(500px);
    opacity: 1;
  }
  90% {
    transform: translate(50px);
    opacity: 1;
  }

  92% {
    transform: translate(50px);
    opacity: 0;
  }
  94% {
    transform: translate(50px);
    opacity: 1;
  }
  96% {
    transform: translate(50px);
    opacity: 0;
  }
  98% {
    transform: translate(50px);
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translate(50px);
  }
}
@keyframes move2 {
  0% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(-100px);
  }
}

.container {
  background-color: #000000;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(12, 16, 31, 0.4);
  /* padding: 100px; */
  padding-top: 30px;
  margin: auto;
  max-width: 100%;
  width: 1000px;
  height: 400px;
}
.colc {
  font-size: 1.3em;
}

table {
  border-spacing: 0 4px;
  color: #ffffff;
  width: 100%;
  padding-left: 30px;
}

table th,
table td {
  padding: 15px;
  text-align: left;
}
.colc {
  color: yellow;
  padding-left: 30px;
  /* margin-bottom: 21px; */
}

.default {
  font-size: 1.2rem;
}
.defaulted {
  padding-top: 15px;
}

.container2 h1 {
  color: rgb(12, 12, 12);
  font-size: 1.5em;
  width: 100%;
}
.container2 {
  background-color: #edf2f7;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(12, 16, 31, 0.4);
}

.colc.szwsz {
  padding-left: 45px;
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
