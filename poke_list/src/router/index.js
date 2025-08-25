import { createRouter, createWebHistory } from "vue-router";
import PokemonList from "../components/PokemonList.vue";
import PokemonDetails from "../components/PokemonDetails.vue";

const routes = [
  { path: "/", name: "Home", component: PokemonList },
  { path: "/pokemon/:id", name: "PokemonDetails", component: PokemonDetails, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
