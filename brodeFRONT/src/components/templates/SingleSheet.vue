
  
<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">{{titleId}}</h3>

    <form @submit.prevent="addRecord">
      <div class="mb-6">
        <label for="record_title" class="label">TEXT</label>
        <input
          type="text"
          id="record_title"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type a text here..."
          v-model="newRecord.title"
        />
      </div>

      <div class="mb-6">
        <label for="record_year" class="label">SECUND</label>
        <input
          type="text"
          id="record_year"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="For how long ..."
          v-model="newRecord.year"
        />
      </div>

      <div class="mb-6">
        <label for="artist" class="label">Artist</label>
        <select id="artist" class="select" v-model="newRecord.artist">
          <option disabled value>Select an artist</option>
          <option :value="artist.id" v-for="artist in artists" :key="artist.id">{{ artist.name }}</option>
        </select>
      </div>

      <input
        type="submit"
        value="ADD"
        class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-blue block w-full py-4 text-white items-center justify-center"
      />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="record in records" :key="record.id" :record="record">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex justify-between flex-wrap pr-4">
            <p class="block flex font-mono font-semibold flex items-center">
              <img src="https://img.icons8.com/wired/30/000000/database-export.png" />
              {{ record.title }} &mdash; {{ record.year }}
            </p>
            <p class="block font-mono font-semibold">{{ getArtist(record) }}</p>
          </div>

          <button
            class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
            @click.prevent="editRecord(record)"
          >Edit</button>

          <button
            class="bg-transparent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
            @click.prevent="removeRecord(record)"
          >Delete</button>
        </div>

        <div v-if="record == editedRecord">
          <form action @submit.prevent="updateRecord(record)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
              <div class="mb-6">
                <label class="label">TEXT</label>
                <input class="input" v-model="record.title" />
              </div>

              <div class="mb-6">
                <label class="label">SECUND</label>
                <input class="input" v-model="record.year" />
              </div>

              <div class="mb-6">
                <select id="artist_update" class="select" v-model="record.artist">
                  <option disabled value>Select an artist</option>
                  <option
                    :value="artist.id"
                    v-for="artist in artists"
                    :key="artist.id"
                  >{{ artist.name }}</option>
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
  </div>
</template>

<script>
export default {
  name: "Records",
  data() {
    return {
      artists: [],
      records: [],
      newRecord: [],
      error: "",
      editedRecord: ""
    };
  },
  computed: {
    titleId() {
      return this.$route.params.id.toUpperCase();
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
        .get("/api/v1/artists")
        .then(response => {
          this.artists = response.data;
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
    getArtist(record) {
      const recordArtistValues = this.artists.filter(
        artist => artist.id === record.artist_id
      );
      let artist;
      recordArtistValues.forEach(function(element) {
        artist = element.name;
      });
      return artist;
    },
    addRecord() {
      const value = this.newRecord;
      if (!value) {
        return;
      }
      this.$http.secured
        .post("/api/v1/records/", {
          record: {
            title: this.newRecord.title,
            year: this.newRecord.year,
            artist_id: this.newRecord.artist
          }
        })
        .then(response => {
          this.records.push(response.data);
          this.newRecord = "";
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
      this.editedRecord = record;
    },
    updateRecord(record) {
      this.editedRecord = "";
      this.$http.secured
        .patch(`/api/v1/records/${record.id}`, {
          record: {
            title: record.title,
            year: record.year,
            artist_id: record.artist
          }
        })
        .catch(error => this.setError(error, "Cannot update record"));
    }
  }
};
</script>


<style scoped>
.input {
  width: 30vw;
}
.backed {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>