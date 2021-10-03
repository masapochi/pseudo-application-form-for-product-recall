<template>
  <form @submit="onSubmit">
    <fieldset>
      <legend class="h2">Purchased Item Information</legend>

      <FormRow>
        <label :class="formHeadingClass">Purchased Count</label>
        <FormBody>
          <table class="table table-sm">
            <thead>
              <tr class="text-center">
                <th class="w-25">Count</th>
                <th>Model</th>
                <th>Color</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, idx) in items"
                :key="item.model"
                class="text-center align-middle"
              >
                <td>
                  <TextInput
                    :name="`items[${idx}].purchased_count`"
                    classes="text-center"
                    type="number"
                    min="0"
                    step="1"
                  />
                </td>
                <td>{{ item.model }}</td>
                <td>
                  <span :style="{ color: item.textColor }">
                    {{ item.color }}
                  </span>
                </td>
                <td>{{ item.code }}</td>
              </tr>
            </tbody>
          </table>
        </FormBody>
      </FormRow>
    </fieldset>

    <transition name="slide-fade">
      <!-- <fieldset v-show="isItemCountFilled"> -->
      <fieldset>
        <FormRow>
          <label :class="formHeadingClass">Pickup Date</label>
          <FormBody>
            <Datepicker
              name="pickup_date"
              container-class="w-75"
              :config="pickupDateConfig"
            />
          </FormBody>
        </FormRow>

        <transition name="slide-fade">
          <FormRow v-show="isPickupDateFilled">
            <label :class="formHeadingClass">Pickup Time</label>
            <FormBody>
              <RadioButton
                v-for="(time, idx) in pickupTimes"
                :key="time.name"
                name="pickup_time"
                :value="time.name"
                :label="time.name"
                :id="`pickup-time-${idx}`"
              />
            </FormBody>
          </FormRow>
        </transition>

        <FormRow>
          <label :class="formHeadingClass">Purchased Shop</label>
          <FormBody>
            <TextInput name="purchased_shop" />
          </FormBody>
        </FormRow>

        <FormRow>
          <label :class="formHeadingClass">Purchased Date</label>
          <FormBody>
            <Datepicker
              name="purchased_date"
              container-class="w-75"
              :config="purchasedDateConfig"
            />
          </FormBody>
        </FormRow>

        <FormRow>
          <label :class="formHeadingClass">Situation</label>
          <FormBody>
            <TextareaInput name="situation" />
          </FormBody>
        </FormRow>
      </fieldset>
    </transition>

    <transition name="slide-fade">
      <!-- <fieldset v-show="isRecallInfoFilled && isItemCountFilled"> -->
      <fieldset>
        <legend class="h2">Your Information</legend>

        <FormRow>
          <label :class="formHeadingClass">Name</label>
          <FormBody>
            <TextInput name="name" autocomplete="name" />
          </FormBody>
        </FormRow>

        <FormRow>
          <label :class="formHeadingClass">Address</label>
          <FormBody>
            <div class="input-group w-75 mb-3">
              <span class="input-group-text">〒</span>
              <TextInput name="zip" autocomplete="postal-code">
                <button class="btn btn-sm btn-primary" type="button">
                  <i class="bi bi-search"></i> Search
                </button>
              </TextInput>
            </div>
            <TextInput name="address" autocomplete="address" />
          </FormBody>
        </FormRow>

        <FormRow>
          <label :class="formHeadingClass">Email</label>
          <FormBody>
            <TextInput name="email" type="text" autocomplete="email" />
          </FormBody>
        </FormRow>

        <FormRow>
          <label :class="formHeadingClass">Email Confirmation</label>
          <FormBody>
            <TextInput name="verify_email" type="text" autocomplete="email" />
          </FormBody>
        </FormRow>

        <FormRow>
          <label :class="formHeadingClass">Tel</label>
          <FormBody>
            <TextInput name="tel" autocomplete="tel" />
          </FormBody>
        </FormRow>
      </fieldset>
    </transition>

    <pre>errors: {{ errors }}</pre>

    <div class="text-center" v-if="meta.valid">
      <button class="btn btn-lg btn-primary">Confirm</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref } from "vue";
import { useForm, useField } from "vee-validate";
import { validationSchema } from "../validator";

import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index";
import { INITIAL_FORM, PICKUP_TIMES } from "../consts";
import TextInput from "../components/forms/TextInput.vue";
import RadioButton from "../components/forms/RadioButton.vue";
import TextareaInput from "../components/forms/TextareaInput.vue";
import Datepicker from "../components/forms/Datepicker.vue";
import FormRow from "../components/forms/FormRow.vue";
import FormBody from "../components/forms/FormBody.vue";

export default defineComponent({
  components: {
    TextInput,
    RadioButton,
    TextareaInput,
    Datepicker,
    FormRow,
    FormBody,
  },
  setup(props, { emit, attrs, slots }) {
    const {
      values: form,
      handleSubmit,
      errors,
      meta,
    } = useForm<Form>({
      initialValues: INITIAL_FORM,
      validationSchema,
    });

    const isItemCountFilled = computed(() =>
      form.items.some((item: Item) => item.purchased_count > 0)
    );
    const isPickupDateFilled = computed(() => !!form.pickup_date);
    const isRecallInfoFilled = computed(() => !!form.purchased_shop);

    const onSubmit = handleSubmit((values) => {
      console.log(JSON.stringify(values, null, 2));
    });

    const today = new Date();
    const pickupDateConfig = {
      minDate: today.setDate(today.getDate() + 5),
    };
    const purchasedDateConfig = {
      defaultDate: "",
      maxDate: today,
      plugins: [
        new monthSelectPlugin({
          shorthand: true, //defaults to false
          dateFormat: "Y-m", //defaults to "F Y"
          altFormat: "Y-m", //defaults to "F Y"
        }),
      ],
    };

    const formHeadingClass = "col-12 col-md-3 h5";

    return {
      ...toRefs(form),
      pickupTimes: PICKUP_TIMES,
      isItemCountFilled,
      isRecallInfoFilled,
      isPickupDateFilled,
      onSubmit,
      errors,
      meta,
      pickupDateConfig,
      purchasedDateConfig,
      formHeadingClass,
    };
  },
});
</script>

<style lang="scss">
.flatpicker-container input[readonly] {
  background-color: #fff;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
