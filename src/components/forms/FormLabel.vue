<template>
  <label class="col-12 col-md-3 text-secondary h5">
    <span class="text-danger" v-if="isRequired">*</span>
    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//Import other modules...

export default defineComponent({
  components: {},
  props: {
    isRequired: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit, attrs, slots }) {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
