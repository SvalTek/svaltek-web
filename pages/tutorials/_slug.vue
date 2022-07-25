<template>
  <main>
     <nuxt-content :document="page" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData ({ $content, params }) {
    const page = await $content('tutorials', params.slug)
      .fetch()
      .catch(() => {
        console.error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      page
    }
  }
})
</script>