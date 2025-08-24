import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    list: [],       // all pokemons
    current: null,  // selected pokemon details
    loading: false,
  }),

  actions: {
    async fetchList(limit = 20) {
      this.loading = true;
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const details = await Promise.all(
          res.data.results.map((p) => axios.get(p.url).then((r) => r.data))
        );
        this.list = details;
      } catch (err) {
        console.error("Error fetching list:", err);
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
        console.error("Error fetching details:", err);
      } finally {
        this.loading = false;
      }
    },

    // Example edit function (local only, not API)
    updatePokemonName(newName) {
      if (this.current) {
        this.current.name = newName.toLowerCase();
        // If you also want to reflect it in the list:
        const idx = this.list.findIndex((p) => p.id === this.current.id);
        if (idx !== -1) this.list[idx].name = newName.toLowerCase();
      }
    },
  },
});
