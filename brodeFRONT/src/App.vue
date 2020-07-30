<template>
  <v-container>
    <div id="app">
      <Header />
      <router-view />
    </div>
  </v-container>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>
