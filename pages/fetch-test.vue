<template>
  <div>
    <div v-for="item in responseData" :key="item.id">
      <div>
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

let data = ""

export default Vue.extend({
  name: 'IndexPage',
  async created () {
    // GET request using fetch with async/await
    const response = await fetch("https://api.npms.io/v2/search?q=vue");
     this.responseData = await response.json();
  },
  data () {
    return {
        responseData: null
    }
  },
})
</script>
