<template>
    <div class="p-6">
      <router-link to="/" class="text-blue-500 underline">&larr; Back</router-link>
  
      <div v-if="loading">Loading Pokémon details...</div>
  
      <div v-else class="mt-6 text-center">
        <h1 class="text-3xl font-bold capitalize mb-4">{{ pokemon.name }}</h1>
        <img :src="pokemon.sprites.other['official-artwork'].front_default" class="mx-auto w-48" />
        <p class="mt-2">Height: {{ pokemon.height }}</p>
        <p>Weight: {{ pokemon.weight }}</p>
  
        <h2 class="text-xl font-semibold mt-4">Abilities</h2>
        <ul>
          <li v-for="a in pokemon.abilities" :key="a.ability.name">
            {{ a.ability.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
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
  