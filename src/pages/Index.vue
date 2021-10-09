<template>
  <form @submit="onSubmit">
    <div class="mb-5">
      <p>
        If you would like to exchange items, please fill out and submit the form
        below.
      </p>
      <hr />
    </div>
    <fieldset class="mb-5">
      <legend class="h2 text-center mb-5">Purchased Item Information</legend>

      <FormRow>
        <FormLabel label="Purchased Count" is-required />
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
      <fieldset class="mb-5" v-show="isItemCountFilled">
        <!-- <fieldset class="mb-5"> -->
        <FormRow>
          <FormLabel label="Pickup Date" />
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
            <FormLabel label="Pickup Time" is-required />
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
          <FormLabel label="Purchased Shop" is-required />
          <FormBody>
            <TextInput name="purchased_shop" />
          </FormBody>
        </FormRow>

        <FormRow>
          <FormLabel label="Purchased Date" />
          <FormBody>
            <Datepicker
              name="purchased_date"
              container-class="w-75"
              :config="purchasedDateConfig"
            />
          </FormBody>
        </FormRow>

        <FormRow>
          <FormLabel label="Usage Situation" />
          <FormBody>
            <TextareaInput name="situation" />
          </FormBody>
        </FormRow>
      </fieldset>
    </transition>

    <transition name="slide-fade">
      <fieldset class="mb-5" v-show="isRecallInfoFilled && isItemCountFilled">
        <!-- <fieldset class="mb-5"> -->
        <legend class="h2 text-center mb-5">Your Information</legend>

        <FormRow>
          <FormLabel label="Name" is-required />
          <FormBody>
            <TextInput name="name" autocomplete="name" />
          </FormBody>
        </FormRow>

        <FormRow>
          <FormLabel label="Address" is-required />
          <FormBody>
            <div class="input-group w-75 mb-3">
              <span class="input-group-text">〒</span>
              <TextInput
                id="zip"
                name="zip"
                minlength="7"
                maxlength="8"
                autocomplete="postal-code"
              >
              </TextInput>
            </div>

            <template v-if="zip && !errors.zip">
              <div class="lds-ellipsis" v-if="isWaiting">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <template v-if="!isWaiting && addresses.length">
                <p class="text-success">Select from below.</p>
                <ul class="mb-3 bg-light border-bottom">
                  <li
                    class="p-2"
                    v-for="(address, idx) in addresses"
                    @click="setAddress(idx)"
                    style="cursor: pointer"
                  >
                    {{ address }}
                  </li>
                </ul>
              </template>
              <p
                class="text-danger"
                v-else-if="!isWaiting && !addresses.length"
              >
                {{ resultMessage }}
              </p>
            </template>
            <TextInput name="address" autocomplete="address" />
          </FormBody>
        </FormRow>

        <FormRow>
          <FormLabel label="Email" is-required />
          <FormBody>
            <TextInput name="email" type="text" autocomplete="email" />
          </FormBody>
        </FormRow>

        <FormRow>
          <FormLabel label="Email Confirmation" is-required />
          <FormBody>
            <TextInput name="verify_email" type="text" autocomplete="email" />
          </FormBody>
        </FormRow>

        <FormRow>
          <FormLabel label="Tel" is-required />
          <FormBody>
            <TextInput name="tel" autocomplete="tel" />
          </FormBody>
        </FormRow>
      </fieldset>
    </transition>

    <div class="text-center" v-if="meta.valid">
      <button class="btn btn-lg btn-primary">Confirm</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, watch, onMounted } from "vue";
import { useForm, useField } from "vee-validate";
import { validationSchema } from "../validator";

import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index";
import {
  current_date,
  minPickupDate,
  INITIAL_FORM,
  PICKUP_TIMES,
} from "../consts";
import TextInput from "../components/forms/TextInput.vue";
import RadioButton from "../components/forms/RadioButton.vue";
import TextareaInput from "../components/forms/TextareaInput.vue";
import Datepicker from "../components/forms/Datepicker.vue";
import FormRow from "../components/forms/FormRow.vue";
import FormLabel from "../components/forms/FormLabel.vue";
import FormBody from "../components/forms/FormBody.vue";

import { usePostalSearch } from "../hooks/usePostalSearch";

const pickupDateConfig = {
  minDate: minPickupDate,
};

const purchasedDateConfig = {
  maxDate: current_date,
  plugins: [
    new monthSelectPlugin({
      shorthand: true, //defaults to false
      dateFormat: "Y-m", //defaults to "F Y"
      altFormat: "Y-m", //defaults to "F Y"
    }),
  ],
};

export default defineComponent({
  components: {
    TextInput,
    RadioButton,
    TextareaInput,
    Datepicker,
    FormRow,
    FormLabel,
    FormBody,
  },
  setup(props, { emit, attrs, slots }) {
    const {
      values: form,
      handleSubmit,
      validateField,
      setFieldValue,
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

    const onSubmit = handleSubmit((values: Form): void => {
      alert(JSON.stringify(values, null, 2));
    });

    const { postalCode, addresses, isWaiting } = usePostalSearch("zip");

    const resultMessage = computed(() => {
      const resultCount = addresses.value.length;
      if (!resultCount)
        return "Sorry, Not Found... Please type it in yourself.";
      return `${resultCount} found`;
    });

    function setAddress(idx: number): void {
      setFieldValue("address", addresses.value[idx]);
    }

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
      addresses,
      resultMessage,
      setAddress,
      isWaiting,
      postalCode,
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

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
}
.lds-ellipsis div {
  position: absolute;
  top: 25px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #000;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
