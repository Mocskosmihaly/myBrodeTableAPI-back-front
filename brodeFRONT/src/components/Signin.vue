<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <form @submit.prevent="signin">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input
            type="email"
            v-model="email"
            class="input"
            id="email"
            placeholder="andy@web-crunch.com"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            v-model="password"
            class="input"
            id="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          class="uppercase text-l font-mono font-semibold content-center no-underline text-indigo-dark hover:text-indigo-darker"
        >Sign In</button>

        <div class="my-4">
          <router-link
            to="/signup"
            class="uppercase text-m font-mono pl-4 font-semibold no-underline text-indigo-dark hover:text-indigo-darker content-center"
          >Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signin() {
      this.$http.plain
        .post("/signin", { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error));
    },
    signinSuccessful(response) {
      if (!response.data.csrf) {
        this.signinFailed(response);
        return;
      }
      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      this.error = "";
      this.$router.replace("/table");
      this.$router.go();
    },
    signinFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "ERROR";
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace("/table");
      }
    }
  }
};
</script>
<style scoped>
.content-center {
  text-align: center;
  display: flex;

  margin: 0 auto;
}
</style>