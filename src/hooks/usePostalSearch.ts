import { ref, computed, watch, readonly, Ref } from "vue";
import { fetch } from "../postalAPI";
import { useField } from "vee-validate";

export const usePostalSearch = (fieldName: string) => {
  const { value: postalCode } = useField<string>(fieldName);
  const waitingCount = ref<number>(0);
  const addresses = ref<string[]>([]);
  const isWaiting = computed(() => waitingCount.value > 0);

  watch(postalCode, async (): Promise<void> => {
    waitingCount.value++;
    addresses.value = [];

    const results = await fetch(postalCode.value);
    addresses.value = results;
    waitingCount.value--;
  });

  return {
    isWaiting,
    postalCode,
    addresses,
  };
};
