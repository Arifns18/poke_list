<script>
import axios from "axios"

export default {
  name: 'App',

  data () {
    return {
      list:[],
      loading: true,
    }
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
  <div v-if="loading">Loading Pokémon...</div>
  <div v-else>
    <h1>Pokémon List</h1>
    <ol>
      <li v-for = "pokemon in list" :key="pokemon.name">
        
        <img
          :src="pokemon.sprites.front_default"
          :alt="pokemon.name"
          class="mx-auto"
        />
        <div class="container">
          <h4><b>J{{pokemon.name}}</b></h4>
        </div>
      </li>
    </ol>
</div>
</template>

