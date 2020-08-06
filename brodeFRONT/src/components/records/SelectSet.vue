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
          <p v-if="val.value == 5">
            {{ val.key }}
            <img
              class="pl-1"
              src="https://img.icons8.com/android/15/000000/star.png"
            />
          </p>
          <p v-if="val.value == 6">
            {{ val.key }}
            <img src="https://img.icons8.com/android/15/000000/bold.png" />
          </p>
          <p v-if="val.value == 7">
            {{ val.key }}
            <img src="https://img.icons8.com/android/15/000000/star.png" />
            <img src="https://img.icons8.com/android/15/000000/bold.png" />
          </p>
          <p v-if="val.value == 8">
            {{ val.key }}
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
