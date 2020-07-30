<template>
  <div id="app">
    <h1 class="title">CONFIG PANEL</h1>

    <v-form ref="form" class="container" v-for="(input, i) in inputs" :key="i" lazy-validation>
      <v-container class="container">
        <v-layout>
          <v-flex lg12 class="container">
            <h4>TEXT</h4>
            <v-text-field
              class="text-container"
              v-model="inputs[i].message"
              placeholder
              outlined
              :maxlength="25"
              required
            ></v-text-field>
          </v-flex>

          <v-flex lg12 class="container">
            <v-btn
              class="blue topped"
              @click="addLines(i)"
              v-show="i == inputs.length - 1"
              outlined
              height="55px"
            >
              <p class="bold">PRIDAŤ</p>
              <fa-icon icon="plus-circle" />
            </v-btn>
          </v-flex>

          <v-flex lg6 class="container">
            <v-btn class="red topped" outlined height="55px" @click="deleteLines(i)">
              <p class="bold red">VYMAZAŤ</p>
              <fa-icon icon="trash" />
            </v-btn>
          </v-flex>
        </v-layout>
        <v-flex md5 class="container" v-show="i == inputs.length - 1">
          <h4>SEKUND</h4>

          <v-text-field class="shrink" required outlined :maxlength="4" placeholder type="number"></v-text-field>
        </v-flex>
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

  </div>
</template>

<script>
import { mapActions } from "vuex";
import HomePreview from "./HomePreview";
export default {
  name: "Artists",
  data() {
    return {
      inputs: [
        {
          message: ""
        }
      ],
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
  created() {
    if (!localStorage.signedIn) {
      this.$router.replace("/");
    } else {
      this.$http.secured
        .get("/api/v1/artists")
        .then(response => {
          this.artists = response.data;
        })
        .catch(error => this.setError(error, "Something went wrong"));
    }
  },
  methods: {
    ...mapActions(["setMessage", "setSec"]),

    onSubmit() {
      this.setMessage(this.inputs);

      this.setSec(this.sec * 1000);

      localStorage.setItem("inputs", JSON.stringify(this.inputs));
      localStorage.sec = this.sec * 1000;
    },
    addLines() {
      this.inputs.push({ message: "" });
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
    },

    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    addArtist() {
      const value = this.newArtist;
      if (!value) {
        return;
      }
      this.$http.secured
        .post("/api/v1/artists/", { artist: { name: this.newArtist.name } })

        .then(response => {
          this.artists.push(response.data);
          this.newArtist = "";
        })
        .catch(error => this.setError(error, "Cannot create artist"));
    },
    removeArtist(artist) {
      this.$http.secured
        .delete(`/api/v1/artists/${artist.id}`)
        .then(response => {
          this.artists.splice(this.artists.indexOf(artist), 1);
        })
        .catch(error => this.setError(error, "Cannot delete artist"));
    },
    editArtist(artist) {
      this.editedArtist = artist;
    },
    updateArtist(artist) {
      this.editedArtist = "";
      this.$http.secured
        .patch(`/api/v1/artists/${artist.id}`, {
          artist: { title: artist.name }
        })
        .catch(error => this.setError(error, "Cannot update artist"));
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
  /* width: 40px; */
}
.text-container {
  width: 800px;
}
.topped {
  margin-top: 2px;
}

.title {
  padding-top: 15px;
  z-index: -1;
  font-weight: bold;
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
}

.colc {
  font-size: 1.3em;
}

.red {
  color: red;
  /* background-color: chartreuse; */
}
.blue {
  color: rgb(85, 100, 238);
}
.green {
  color: rgb(36, 172, 36);
}

.num-c {
  width: 200px;
}
</style>
