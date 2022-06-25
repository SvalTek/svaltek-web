<template>
  <main>
    <!-- Header -->
    <Header />
    <br />
    <!-- Main Page -->
    <b-container fluid>
      <!-- Notifications Area -->
      <b-row id="app-notifications" class="justify-content-center slide-up-fade-in">
        <b-col md="10">
          <Notifications />
        </b-col>
      </b-row>
      <!-- Content -->
      <Nuxt />
      <!-- Footer -->
      <Footer />
    </b-container>
  </main>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DefaultLayout',
})
</script>