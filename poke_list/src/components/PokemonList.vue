<script>
import axios from "axios"

export default {
  name: 'App',

  data () {
    return {
      list:[],
      search: "",
      loading: true,
    }
  },
  computed: {
    filteredPokemons() {
      // return pokemons that match search input
      return this.list.filter((p) =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  async mounted() {
    try {
    //Get list of pokemon
    let response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=20")
    this.list = response.data.results
    
    //Fetch details
    let details = await Promise.all(
      response.data.results.map((p) => axios.get(p.url).then((r) => r.data))
    )
    this.list = details

    } catch (err) {
      console.error("Pokémon fetch error:", err);
    } finally {
      this.loading = false;
    }
  }

}
</script>

<template>
  <h1>Pokémon List</h1>

    <!-- Search Input -->
    <input
      v-model="search"
      type="text"
      placeholder="Search Pokémon..."
      class="border p-2 rounded w-full mb-4"
    />
  <div v-if="loading">Loading Pokémon...</div>
  <div v-else>
    <ol>
      <router-link 
      v-for = "pokemon in filteredPokemons" 
      :key="pokemon.id"
      :to="`/pokemon/${pokemon.id}`">
        
        <img
          :src="pokemon.sprites.front_default"
          :alt="pokemon.name"
          class="mx-auto"
        />
        <div class="container">
          <h4><b>{{pokemon.name}}</b></h4>
        </div>
      </router-link>
    </ol>
</div>
</template>

