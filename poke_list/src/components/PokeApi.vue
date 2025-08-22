<script>
import axios from "axios"

export default {
  name: 'App',

  data () {
    return {
      list:[]
    }
  },

  async mounted() {
    let response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=20")
    console.log(response)
    this.list = response.data.results
    console.log(this.list)
  }

}
</script>

<template>
  <h1>Pokemon List</h1>
  <ol>
    <li v-for = "item in list" :key="item.name">
    {{item.name}}
    {{item.url}}
    </li>
  </ol>
</template>

