<template>
  <div class="flex items-center justify-between flex-wrap">
    <div class="flex-1 flex justify-between flex-wrap pr-4">
      <button type="button" v-for="(val, idx) in options" :key="idx" @click="clicked(val)">
        <p
          class="block flex font-mono mr-5 font-semibold flex items-center"
          :class="{highlight:isActive}"
        >{{ val.key }}</p>
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

