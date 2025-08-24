<script>
import Header from "./components/Header.vue";

export default {
  components: { Header },
};
</script>

<template>
  <Header />
  <main class="mt-5 pt-4 px-3">
    <RouterView/>
  </main>
</template>