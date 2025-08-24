  <script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { usePokemonStore } from '../stores/pokemonDetails'

  const route = useRoute();
  const store = usePokemonStore();

  const newName = ref("");

  onMounted(() => {
    store.fetchPokemon(route.params.id);
  });
  </script>

  <script>
  import axios from "axios";

  export default {
    props: ["id"],
    data() {
      return {
        pokemon: null,
        loading: true,
      };
    },
    async mounted() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        this.pokemon = res.data;
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
      } finally {
        this.loading = false;
      }
    },
  };
  </script>

<template>
  <div class="p-6">
    <router-link to="/" class="text-blue-500 underline">&larr; Back</router-link>

    <div v-if="loading">Loading Pokémon details...</div>

    <div v-else-if="store.current">
      <h1 class="text-3xl capitalize">{{ store.current.name }}</h1>
      <img
        :src="store.current.sprites.other['official-artwork'].front_default"
        class="w-48 mx-auto"
      />

      <p>Height: {{ store.current.height }}</p>
      <p>Weight: {{ store.current.weight }}</p>

      <!-- Edit Pokémon Name (local only) -->
      <div class="mt-4">
        <input v-model="newName" placeholder="New name" class="border p-2 rounded" />
        <button
          @click="store.updatePokemonName(newName)"
          class="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Name
        </button>
      </div>
    </div>
  </div>
</template>

  