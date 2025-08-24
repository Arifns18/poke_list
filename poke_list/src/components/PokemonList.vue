<script setup>
import { onMounted, computed, ref } from "vue";
import { usePokemonStore } from "../stores/pokemonList";

const store = usePokemonStore();
const search = ref("");

// Load Pokémon list when component mounts
onMounted(() => {
  if (!store.list.length) {
    store.fetchList(100);
  }
});

// Filtered list based on search
const filteredPokemons = computed(() =>
  store.list.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
    <h1 class="text-2xl font-bold mb-4">Pokémon List</h1>
    <div class="p-2 rounded w- mb-4">
          <input
            v-model="search"
            type="text"
            class="form-control w-100"
            placeholder="Search Pokémon..."
          />
    </div>
    
    <div v-if="store.loading">Loading Pokémon...</div>
    <div v-else
      v-for="pokemon in filteredPokemons" 
      :key="pokemon.id"
      class="row"
    >
      <router-link 
      class="card text-center" 
      :to="`/pokemon/${pokemon.id}`"
      >
        <h5 class="card-header">{{ pokemon.name }}</h5>
        <div class="card-body">
          <img
          :src="pokemon.sprites.front_default"
          :alt="pokemon.name"
          class="mx-auto w-100"
          />
        </div>
      </router-link>
    </div>

</template>
