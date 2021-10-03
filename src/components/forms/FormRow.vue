<template>
  <div class="mb-3 row align-items-md-center" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    classes: { type: String, default: "" },
  },
});
</script>

<style lang="scss" scoped></style>
