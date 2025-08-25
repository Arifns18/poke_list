import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    list: [],       // all Pokémon
    current: null,  // selected Pokémon
    loading: false,
  }),

  actions: {
    async fetchList(limit, offset) {
      this.loading = true;
      try {
        // Get Pokémon list (only names + URLs)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        
        // Fetch details for each Pokémon (id, sprites, height, weight, etc.)
        const details = await Promise.all(
          res.data.results.map((p) => axios.get(p.url).then((r) => r.data))
        );

        this.list = details;
      } catch (err) {
        console.error("Error fetching Pokémon list:", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemon(id) {
      this.loading = true;
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        this.current = res.data;
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
      } finally {
        this.loading = false;
      }
    },
    updatePokemon(newName, newHeight, newWeight) {
      this.updatePokemonName(newName)
      if(Number.isNaN(newHeight) && Number.isNaN(newWeight)){
        this.updatePokemonBmi(newHeight, newWeight)
      }
      

    },

    updatePokemonName(newName) {
      if (this.current) {
        this.current.name = newName.toLowerCase();
        const idx = this.list.findIndex((p) => p.id === this.current.id);
        if (idx !== -1) this.list[idx].name = newName.toLowerCase();
      }
    },
    updatePokemonBmi(newHeight, newWeight) {
      if (this.current) {
        this.current.height = newHeight;
        this.current.weight = newWeight;
      }
    },
  },
});
