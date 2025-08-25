<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { usePokemonStore } from '../stores/pokemon'

  const route = useRoute();
  const store = usePokemonStore();
  const editing = ref(false);

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
          <div v-if="editing" class="mb-3">
            <div class="mb-2">
              <label for="name" class="form-label fw-bold">Name:</label>
              <input 
                id="name" 
                v-model="newName" 
                :placeholder="store.current.name" 
                class="form-control" 
                type="text"
              />
            </div>

            <div class="row mb-2">
              <div class="col-md-6">
                <label for="height" class="form-label fw-bold">Height (m):</label>
                <input 
                  id="height" 
                  v-model.number="newHeight" 
                  :placeholder="store.current.height / 10" 
                  class="form-control" 
                  type="number" 
                  step="0.1"
                />
              </div>
              <div class="col-md-6">
                <label for="weight" class="form-label fw-bold">Weight (kg):</label>
                <input 
                  id="weight" 
                  v-model.number="newWeight" 
                  :placeholder="store.current.weight / 10" 
                  class="form-control" 
                  type="number" 
                  step="0.1"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <h2  class="fw-bold text-capitalize">
              {{ store.current.name }}<small class="text-muted">#{{ store.current.id }}</small>
          </h2>
          <p><strong>Height:</strong> {{ store.current.height / 10 }} m</p>
          <p><strong>Weight:</strong> {{ store.current.weight / 10 }} kg</p>
          </div>
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

      <div v-if="editing" class="mt-4">
        <button @click="store.updatePokemon(newName, newHeight, newWeight), editing = false" class="ml-2 px-4 py-2 rounded">Save</button>
        <button @click="editing = false" class="ml-2 px-4 py-2 rounded">Cancel</button>
      </div>
      <div v-else class="mt-4">
        <button @click="editing = true" class="ml-2 px-4 py-2 rounded">Edit</button>
      </div>
    </div>
  </div>
</template>