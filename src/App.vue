<template>
  <Header />

  <div class="container py-5">
    <Index />
  </div>

  <footer class="py-3 bg-dark text-center text-white">
    <small>&copy; All Right Reserved.</small>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Index from "./pages/Index.vue";
import Header from "./components/layout/Header.vue";
import { PICKUP_TIMES } from "./consts";

export default defineComponent({
  components: { Header, Index },
});
</script>

<style lang="scss"></style>
