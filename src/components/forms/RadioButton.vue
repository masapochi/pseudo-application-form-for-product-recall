<template>
  <div class="form-check">
    <input
      :id="id"
      class="form-check-input"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      v-bind="$attrs"
      @change="handleChange"
    />
    <label :for="id" class="form-check-label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
  name: "RadioButton",
  components: {},
  props: {
    value: { type: String },
    name: { type: String, required: true },
    label: { type: String, required: true },
    rules: { type: String, default: "" },
    htmlFor: { type: String, default: "" },
    id: { type: String, default: "" },
  },

  setup({ name, value }, { emit, attrs, slots }) {
    const { checked, handleChange, errorMessage, meta, errors } = useField(
      name,
      undefined,
      { type: "radio", checkedValue: value }
    );

    return {
      checked,
      handleChange,
      errorMessage,
      meta,
      errors,
    };
  },
});
</script>

<style lang="scss" scoped></style>
