<template>
  <div class="flex items-center justify-between flex-wrap">
    <div class="flex-1 flex justify-between flex-wrap pr-4">
      <button
        type="button"
        v-for="(val, idx) in options"
        :key="idx"
        @click="clicked(val)"
      >
        <div
          class="block flex font-mono mr-5 font-semibold flex items-center"
          :class="{ highlight: isActive }"
        >
          <p v-if="val.value == 1">
            {{ val.key }}
            <img src="https://img.icons8.com/android/15/000000/down.png" />
          </p>
          <p v-if="val.value == 2">
            {{ val.key }}
            <img src="https://img.icons8.com/android/15/000000/up.png" />
          </p>
          <p v-if="val.value == 3">
            {{ val.key }}
            <img src="https://img.icons8.com/android/15/000000/right.png" />
          </p>
          <p v-if="val.value == 4">
            {{ val.key }}
            <img src="https://img.icons8.com/android/15/000000/left.png" />
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "options", "labelName"],
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    clicked(val) {
      this.isActive = !this.isActive;
      console.log(val.value);
      this.$emit("input", val);
    }
  }
};
</script>

<style scoped>
.highlight {
}
</style>
