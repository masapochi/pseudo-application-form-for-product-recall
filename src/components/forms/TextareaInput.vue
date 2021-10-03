<template>
  <textarea
    :id="id"
    class="form-control"
    :class="classes"
    :name="name"
    :value="inputValue"
    :rows="rows"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    v-bind="$attrs"
    @blur="handleChange"
    @change="handleChange"
  ></textarea>
  <div class="text-danger">
    {{ errorMessage }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
  components: {},
  props: {
    id: { type: String, default: "" },
    classes: { type: String, default: "" },
    value: { type: [String, Number], default: "" },
    name: { type: String, required: true },
    rows: { type: Number, default: 3 },
    placeholder: { type: String, default: "" },
    autocomplete: { type: String, default: "" },
    successMessage: { type: String, default: "" },
  },
  setup({ name, value }, { emit, attrs, slots }) {
    const {
      value: inputValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
    } = useField(name, undefined, { initialValue: value });

    return {
      inputValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
    };
  },
});
</script>

<style lang="scss" scoped></style>
