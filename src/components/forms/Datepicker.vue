<template>
  <div class="input-group flatpicker-container" :class="containerClass">
    <span class="input-group-text">
      <i class="bi bi-calendar-event"></i>
    </span>
    <flatPickr
      :id="id"
      :class="classes"
      :name="name"
      v-model="inputValue"
      :config="config"
      :placeholder="placeholder"
    />
    <div class="input-group-append">
      <button
        class="btn btn-warning"
        :disabled="!isClearable"
        type="button"
        title="Clear"
        data-clear
      >
        <i class="fa fa-times">
          <span aria-hidden="true" class="sr-only" @click="onClear">
            <i class="bi bi-trash"></i>
          </span>
        </i>
      </button>
    </div>
  </div>
  <p class="text-danger">{{ errorMessage }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useField } from "vee-validate";
import flatPickr from "vue-flatpickr-component";
import { Japanese } from "flatpickr/dist/l10n/ja.js";
import "flatpickr/dist/flatpickr.css";
// import "flatpickr/dist/plugins/monthSelect/style.css";

export default defineComponent({
  components: { flatPickr },
  props: {
    containerClass: { type: String, default: "" },
    id: { type: String, default: "" },
    classes: { type: String, default: "" },
    name: { type: String, required: true },
    value: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    config: { type: Object, default: {} },
  },
  setup({ name, value, config }, { emit, attrs, slots }) {
    const {
      value: inputValue,
      handleChange,
      errorMessage,
      meta,
      setValue,
    } = useField(name, undefined, { initialValue: value });

    const isClearable = computed(() => {
      return !!inputValue.value;
    });

    function onClear() {
      setValue("");
    }

    const defaultPickerConfig = {
      wrap: true,
      disableMobile: true,
      defaultDate: "",
      dateFormat: "Y-m-d",
      altFormat: "Y-m-d",
      altInput: true,
      locale: Japanese,
    };
    // console.group(`${name}////`);
    // console.log(
    //   (() => {
    //     console.group("config");
    //     console.log(config);
    //     console.groupEnd();

    //     console.group("defaultPickerConfig");
    //     console.log(defaultPickerConfig);
    //     console.groupEnd();

    //     console.group("{ ...defaultPickerConfig, ...config }");
    //     console.log({ ...defaultPickerConfig, ...config });
    //     console.groupEnd();
    //   })()
    // );

    return {
      inputValue,
      handleChange,
      errorMessage,
      meta,
      config: { ...defaultPickerConfig, ...config },
      onClear,
      isClearable,
    };
  },
});
</script>
