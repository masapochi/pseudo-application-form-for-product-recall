<template>
  <img alt="Vue logo" src="../assets/logo.png" />

  <h1>{{ message }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>Current Count : {{ count }}</p>
  <p>
    <button type="button" @click="countUp">+</button>
    <button type="button" @click="countDown">-</button>
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, { emit, attrs, slots }) {
    const message = ref<string>("Hello Vue 3 + TypeScript + Vite");
    const count = ref<number>(0);

    function countUp() {
      count.value++;
    }
    function countDown() {
      count.value--;
    }

    return { message, count, countUp, countDown };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
