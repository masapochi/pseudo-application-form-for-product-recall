<template>
  <form action="">
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
            <tr v-for="(item, i) in items">
              <td>
                <input
                  class="form-control"
                  type="number"
                  v-model.number="items[i].purchased_count"
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

    <template v-if="isItemCountFilled">
      <fieldset>
        <div class="mb-3">
          <label for="" class="form-label">Pickup Date</label>
          <input
            name="pickup_date"
            v-model="pickup_date"
            type="date"
            class="form-control"
          />
        </div>

        <template v-if="isPickupDateFilled">
          <div class="mb-3">
            <label class="form-label">Pickup Time</label>
            <div
              class="form-check"
              v-for="(time, idx) in pickupTimes"
              :key="time.name"
            >
              <input
                class="form-check-input"
                type="radio"
                name="pickup_time"
                v-model="pickup_time"
                :value="time.name"
              />
              <label class="form-check-label">{{ time.name }}</label>
            </div>
          </div>
        </template>

        <div class="mb-3">
          <label for="" class="form-label">Purchased Shop</label>
          <input
            name="purchased_shop"
            v-model="purchased_shop"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Purchased Date</label>
          <input
            name="purchased_date"
            v-model="purchased_date"
            type="month"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Situation</label>
          <textarea
            name="situation"
            v-model="situation"
            class="form-control"
          ></textarea>
        </div>
      </fieldset>
    </template>

    <template v-if="isRecallInfoFilled && isItemCountFilled">
      <fieldset>
        <legend class="h3">Your Information</legend>
        <div class="mb-3">
          <label for="" class="form-label">Name</label>
          <input name="name" v-model="name" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Address</label>
          <div class="input-group w-50 mb-3">
            <span class="input-group-text" id="basic-addon1">〒</span>
            <input name="zip" v-model="zip" type="text" class="form-control" />
            <button class="btn btn-sm btn-primary">Search</button>
          </div>
          <input
            name="address"
            v-model="address"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Email</label>
          <input
            name="email"
            v-model="email"
            type="email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Email Confirmation</label>
          <input
            name="verify_email"
            v-model="verify_email"
            type="email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Tel</label>
          <input name="tel" v-model="tel" type="text" class="form-control" />
        </div>
      </fieldset>
      <div class="text-center">
        <button class="btn btn-lg btn-primary">Confirm</button>
      </div>
    </template>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import { ITEM_LIST, USER_PROFILE, RECALL_INFO, PICKUP_TIMES } from "../consts";

export default defineComponent({
  setup(props, { emit, attrs, slots }) {
    const items = reactive<ItemType[]>(ITEM_LIST);
    const prorile = reactive<ProfileType>(USER_PROFILE);
    const recallInfo = reactive<RecallInfoType>(RECALL_INFO);

    const isItemCountFilled = computed(() => {
      return true;
      return items.some((item) => item.purchased_count > 0);
    });

    const isRecallInfoFilled = computed(() => {
      return true;
      return recallInfo.purchased_shop !== "";
    });

    const isPickupDateFilled = computed(() => {
      return recallInfo.pickup_date !== "";
    });

    return {
      items,
      ...toRefs(prorile),
      ...toRefs(recallInfo),
      pickupTimes: PICKUP_TIMES,
      isItemCountFilled,
      isRecallInfoFilled,
      isPickupDateFilled,
    };
  },
});
</script>
