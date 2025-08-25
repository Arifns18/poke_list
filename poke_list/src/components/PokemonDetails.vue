<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { usePokemonStore } from '../stores/pokemon'

  const route = useRoute();
  const store = usePokemonStore();
  const editing = ref(false); // edit mode

  const newName = ref("");

  onMounted(() => {
    store.fetchPokemon(route.params.id);
  });
</script>

<template>
  <router-link to="/" class="text-blue-500 underline">&larr; Back</router-link>
  <div class="container mt-4">
    <div v-if="store.loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="store.current" class="card shadow p-4">
      <div class="d-flex align-items-center">
        <img
          :src="store.current.sprites.other['official-artwork'].front_default"
          :alt="store.current.name"
          class="img-fluid"
          style="max-width: 150px;"
        />
        <div class="ms-3">
          <div v-if="editing">
            <input v-model="newName" :placeholder="store.current.name" class="border p-2 rounded" />
          </div>
          <div v-else>
            <h2  class="fw-bold text-capitalize">
              {{ store.current.name }}<small class="text-muted">#{{ store.current.id }}</small>
          </h2>
          </div>
          <p><strong>Height:</strong> {{ store.current.height / 10 }} m</p>
          <p><strong>Weight:</strong> {{ store.current.weight / 10 }} kg</p>
        </div>
      </div>
      <hr />

      <h4>Types</h4>
      <div>
        <span
          v-for="t in store.current.types"
          :key="t.type.name"
          class="badge bg-info text-dark me-2"
        >
          {{ t.type.name }}
        </span>
      </div>

      <hr />

      <h4>Abilities</h4>
      <ul>
        <li v-for="a in store.current.abilities" :key="a.ability.name" class="text-capitalize">
          {{ a.ability.name }}
        </li>
      </ul>

      <hr />

      <h4>Base Stats</h4>
      <div v-for="s in store.current.stats" :key="s.stat.name" class="mb-2">
        <strong class="text-capitalize">{{ s.stat.name }}:</strong>
        <div class="progress" style="height: 20px;">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            :style="{ width: s.base_stat + '%' }"
          >
            {{ s.base_stat }}
          </div>
        </div>
      </div>

      <div class="mt-4">
        <button @click="store.updatePokemonName(newName), editing = false" class="ml-2 px-4 py-2 rounded">Save</button>
        <button @click="editing = true" class="ml-2 px-4 py-2 rounded">Edit</button>
      </div>
    </div>
  </div>
</template>

      <!-- <div class="mt-4">
        <input v-model="newName" :placeholder="store.current.name" class="border p-2 rounded" />
        <button
          @click="store.updatePokemonName(newName)"
          class="ml-2 px-4 py-2 rounded"
        >
          Update name
        </button>
        <button @click="editing = true" class="ml-2 px-4 py-2 rounded">Edit</button>
      </div> -->