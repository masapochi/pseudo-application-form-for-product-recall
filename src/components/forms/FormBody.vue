<template>
  <div class="col-12 col-md-9" :class="classes">
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
