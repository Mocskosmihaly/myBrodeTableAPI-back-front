<template>
<body>
  <div class="container">
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
        <tr class="priority-200">
          <td id="writeDay" class="default">{{ createdDate }}</td>
          <td data-label="ČAS" id="hour" class="default">{{ createdHours }}</td>
          <td data-label="TEPLOTA VZDUCHU" id="degree" class="default szwsz">25°C</td>
          <td data-label="RÝCHLOST´ VETRA" id="speed" class="default">13km/hod</td>
        </tr>
      </tbody>
    </table>
    <div class="container2">
      <h1
        class="content"
        v-for="(m,index) of message"
        :key="index"
        :class="{'is-active':index === activeSpan }"
      >{{m}}</h1>
    </div>
  </div>
</body>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      activeSpan: 0,
      elementVisible: true
    };
  },

  computed: {
    ...mapGetters({
      message: "message",
      sec: "sec"
    }),
    createdDate() {
      return moment().format("DD-MM-YYYY ");
    },
    createdHours() {
      return moment().format("HH:mm ");
    }
  },
  methods: {
    showMe() {
      setInterval(() => {
        if (this.activeSpan === this.message.length - 1) {
          this.activeSpan = 0;
        } else {
          this.activeSpan++;
        }
      }, 8000);
    }
  },
  mounted() {
    this.$store.dispatch("SET_MESSAGE");
    this.$store.dispatch("SET_SEC");
    // this.elementVisible = true;
    // setTimeout(() => (this.elementVisible = false), this.sec);
    //
  },
  created() {
    this.showMe();
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
.container2 {
  background-color: rgb(0, 0, 0);
  padding-top: 35px;
  height: 100px;
}
.content {
  width: 100px;
  height: 100px;
  animation: move 20s linear infinite;
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
  background-color: #a09d9d;
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
  color: #ffffff;
  width: 100%;
}

table th,
table td {
  padding: 15px;
  text-align: left;
}

table tbody tr {
  background-color: #5a5b5c;
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
  background-color: #5a5b5c;
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
