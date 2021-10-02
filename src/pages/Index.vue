<template>
  <form @submit="onSubmit">
    <fieldset>
      <legend class="h3">Purchased Item Information</legend>

      <div class="mb-3">
        <table class="table table-sm">
          <thead>
            <tr class="text-center">
              <th>Count</th>
              <th>Model</th>
              <th>Color</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in items" :key="item.model">
              <td>
                <input
                  class="form-control"
                  type="number"
                  v-model="item.purchased_count"
                />
              </td>
              <td>{{ item.model }}</td>
              <td>
                <span :style="{ color: item.textColor }">{{ item.color }}</span>
              </td>
              <td>{{ item.code }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </fieldset>

    <!-- <template v-if="isItemCountFilled"> -->
    <fieldset>
      <div class="mb-3">
        <label for="" class="form-label">Pickup Date</label>
        <input v-model="pickup_date" type="date" class="form-control" />
      </div>

      <template v-if="isPickupDateFilled">
        <div class="mb-3">
          <label class="form-label">Pickup Time</label>
          <div
            class="form-check"
            v-for="(time, idx) in pickupTimes"
            :key="time.name"
          >
            <input type="radio" v-model="pickup_time" />
            <label class="form-check-label">{{ time.name }}</label>
          </div>
        </div>
      </template>

      <div class="mb-3">
        <label for="" class="form-label">Purchased Shop</label>
        <input v-model="purchased_shop" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Purchased Date</label>
        <input v-model="purchased_date" type="month" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Situation</label>
        <textarea v-model="situation" class="form-control"></textarea>
      </div>
    </fieldset>
    <!-- </template> -->

    <!-- <template v-if="isRecallInfoFilled && isItemCountFilled"> -->
    <fieldset>
      <legend class="h3">Your Information</legend>

      <div class="mb-3">
        <label for="" class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" />
        <div class="text-danger">{{ nameError }}</div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Address</label>
        <div class="input-group w-50 mb-3">
          <span class="input-group-text" id="basic-addon1">〒</span>
          <input v-model="zip" type="text" class="form-control" />
          <button class="btn btn-sm btn-primary">Search</button>
        </div>
        <input v-model="address" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Email Confirmation</label>
        <input v-model="verify_email" type="email" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Tel</label>
        <input v-model="tel" type="text" class="form-control" />
      </div>
    </fieldset>
    <div class="text-center">
      <button class="btn btn-lg btn-primary">Confirm</button>
    </div>
    <!-- </template> -->
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { useForm, useField, Field } from "vee-validate";
import { profileSchema, recallSchema, itemsSchema } from "../validator";
import { INITIAL_FORM, PICKUP_TIMES } from "../consts";

console.log(INITIAL_FORM);
export default defineComponent({
  components: { Field },
  setup(props, { emit, attrs, slots }) {
    const validationSchema = profileSchema
      .concat(recallSchema)
      .concat(itemsSchema);

    const { values: form, handleSubmit } = useForm<Form>({
      initialValues: INITIAL_FORM,
      validationSchema,
    });

    const isItemCountFilled = computed(() => {
      return form.items.some(
        (item: Item) => true /* item.purchased_count > 0 */
      );
    });

    const isRecallInfoFilled = computed(() => !form.purchased_shop);

    const isPickupDateFilled = computed(() => form.pickup_date !== "");

    const {
      errorMessage: nameError,
      handleChange: changeName,
      handleBlur: blurName,
    } = useField("name");
    const onSubmit = handleSubmit((values) => {
      console.log(JSON.stringify(values, null, 2));
    });
    return {
      ...toRefs(form),
      // items,
      // ...toRefs(prorile),
      // ...toRefs(recall),
      pickupTimes: PICKUP_TIMES,
      isItemCountFilled,
      isRecallInfoFilled,
      isPickupDateFilled,
      onSubmit,
      nameError,
      changeName,
      blurName,
    };
  },
});
</script>
