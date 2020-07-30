<template>
  <div id="app">
    <h1 class="title">{{ titleId }}</h1>

    <v-form ref="form" class="container" v-for="(input, i) in inputs" :key="i" lazy-validation>
      <v-container class="container">
        <v-layout>
          <v-flex class="container">
            <v-row>
              <h4>TEXT</h4>
              <v-text-field
                sm3
                class="text-container"
                v-model="inputs[i].message"
                placeholder
                outlined
                :maxlength="25"
                required
              ></v-text-field>
              <v-text-field
                class="num-container"
                v-model="sec"
                required
                outlined
                :maxlength="4"
                placeholder
                type="number"
              ></v-text-field>

              <v-select
                v-model="e7"
                :items="states"
                label="Select"
                class="selectcomp"
                multiple
                chips
                hint="What are the target regions"
                persistent-hint
              ></v-select>
              <v-radio-group v-model="row" row>
                <v-radio label="Zhora nadol" value="radio-1"></v-radio>
                <v-radio label="Zdola nahor" value="radio-2"></v-radio>
                <v-radio label="Zlava doprava" value="radio-3"></v-radio>
                <v-radio label="Sprava dolava" value="radio-4"></v-radio>
              </v-radio-group>
            </v-row>
            <v-flex lg 12class="container">
              <v-btn
                class="topped"
                @click="addLines(i)"
                v-show="i == inputs.length - 1"
                outlined
                height="55px"
              >
                <p class="bold">PRIDAŤ</p>
                <fa-icon icon="plus-circle" />
              </v-btn>
            </v-flex>
          </v-flex>

          <v-flex lg 12class="container">
            <v-btn class="topped" outlined height="55px" @click="deleteLines(i)">
              <p class="bold">VYMAZAŤ</p>
              <fa-icon icon="trash" />
            </v-btn>
          </v-flex>
        </v-layout>
        <v-flex md5 class="container" v-show="i == inputs.length - 1"></v-flex>
      </v-container>
    </v-form>
    <v-flex>
      <v-btn class="blue middle" v-show="plusVisible" height="50px" @click="addLinesB(i)" outlined>
        <p class="bold"></p>
        <fa-icon icon="plus-circle" class="fa-x" />
      </v-btn>
    </v-flex>
    <v-flex class="middlebtn">
      <v-btn @click="showTemplate" outlined>
        <p class="bold">Náhľad</p>
        <fa-icon icon="eye" />
      </v-btn>
    </v-flex>
    <v-flex class="right">
      <v-btn class="green" height="50px" outlined size @click="onSubmit">
        <p class="bold">ŠTART</p>
        <fa-icon icon="play" class="fa-x" />
      </v-btn>
    </v-flex>
    <v-flex class="middlebtn">
      <v-btn class="red" height="50px" v-show="showX" outlined @click="closeX">
        <p class="bold">ZAVRIEŤ</p>
        <fa-icon icon="times" class="fa-2x" />
      </v-btn>
      <v-btn v-show="showRef" height="50px" class="middlebtn colorised" @click="refresh" outlined>
        <p class="bold">Obnoviť</p>

        <fa-icon icon="retweet" />
      </v-btn>
    </v-flex>
    <div class="template">
      <HomePreview v-show="showTable" />
    </div>
    <!-- ///////////////////////////////////////////////////////////////////// -->

    <!-- ///////////////////////////////////////////////////////////////////// -->

  </div>

  <!-- seza -->

  <!-- seza -->
</template>

<script>
import HomePreview from "./HomePreview";
import { mapActions } from "vuex";
export default {
  name: "Config",
  data() {
    return {
      dialog: false,
      inputs: [
        {
          message: ""
        }
      ],
      states: ["Blikanie text", "Tucne pismo"],
      sec: 0,
      plusVisible: false,
      showX: false,
      showTable: false,
      showRef: false
    };
  },
  components: { HomePreview },

  mounted() {
    if (localStorage.inputs) {
      this.inputs = JSON.parse(localStorage.inputs);
    }
    // console.log(this.inputs.length);
    this.showT();
    if (localStorage.sec) {
      this.sec = 0;
    }
  },
  computed: {
    titleId() {
      return this.$route.params.id;
    }
  },

  methods: {
    ...mapActions(["setMessage", "setSec"]),

    onSubmit() {
      if (this.sec == 0) {
        this.$notification.error("Zadaj sekundu!", {
          timer: 2,
          position: "topCenter"
        });
      } else {
        this.$notification.success("Zadali ste text na display!", {
          timer: 3,
          position: "topCenter"
        });
        this.setMessage(this.inputs);

        this.setSec(this.sec * 1000);

        localStorage.setItem("inputs", JSON.stringify(this.inputs));
        localStorage.sec = this.sec * 1000;
      }
    },
    addLines() {
      this.inputs.push({ message: "" });
      this.dialog = true;
    },
    addLinesB() {
      this.inputs.push({ message: "" });
      this.plusVisible = false;
    },

    showTemplate() {
      this.showTable = !this.showTable;
      this.showX = true;

      this.showRef = true;

      if (this.showTable === false) {
        this.showRef = false;
        this.showX = false;
      }
    },

    deleteLines(index) {
      this.inputs.splice(index, 1);
      this.showT();
    },
    closeX() {
      this.showTable = false;
      this.showX = !this.showX;
      if (this.showX === false) {
        this.showRef = false;
      }
    },
    refresh() {
      this.setMessage(this.inputs);
      this.showRef = true;

      this.setSec(this.sec * 1000);
      // localStorage.setItem("inputs", JSON.stringify("inputs"));
      // localStorage.sec = this.sec;
      console.log(this.sec);
    },
    showT: function() {
      if (this.inputs.length === 0) {
        this.plusVisible = true;
        this.showTable = false;
        this.showX = false;
        this.showRef = false;
      } else {
        this.plusVisible = false;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&family=Roboto:ital,wght@1,300&display=swap");
@import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");

* {
  font-family: "Raleway", sans-serif;
  box-sizing: border-box;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
}
.text-container {
  width: 300px;
}
.text-container2 {
  width: 30px;
  margin-right: 15px;
}
.topped {
  margin-top: 0px;
  /* margin-left: 300px; */
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.selectcomp {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
}

.title {
  padding-top: 15px;
  /* z-index: -1; */
  font-size: 1.2em;
  font-weight: bold;
  color: black;
  z-index: 3;
}
.num-container {
  width: 80px;
}
.right {
  display: flex;
  /* flex-direction: column; */
  align-content: center;
  justify-content: center;
}
.colorised {
  color: #3b3b32;
}
h1 {
  margin-bottom: 70px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1.2em;
}
h4 {
  margin-bottom: 5px;
}
.middlebtn {
  align-items: center;
  display: flex;
  justify-content: left;
  margin: 25px;
}
.middle {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.containertmp {
  background-color: #a09d9d;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(12, 16, 31, 0.4);
  /* padding: 100px; */
  margin: auto;
  max-width: 100%;
  width: 1000px;
}
.colc {
  font-size: 1.3em;
}

.default {
  font-size: 1.2rem;
}

.container2tmp {
  background-color: rgb(0, 0, 0);
  height: 100px;
}
.container2tmp h1 {
  color: #fff;
  font-size: 1.5em;
  width: 100%;
}
.container2tmp {
  background-color: #5a5b5c;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(12, 16, 31, 0.4);
}
.bold {
  font-weight: bold;
  margin-right: 5px;
  /* color: #fff; */
  color: black;
}

.colc {
  font-size: 1.3em;
}

.red {
  /* color: red; */
  color: black;

  /* background-color: chartreuse; */
}
.blue {
  /* color: rgb(85, 100, 238); */
}
.green {
  /* color: rgb(36, 172, 36); */
}
</style>
