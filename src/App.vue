<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
import Footer from './components/FooterPage.vue'
import Header from './components/HeaderPage.vue'
import DiscordLogo from './components/icons/DiscordLogo.vue'
import InstagramLogo from './components/icons/InstagramLogo.vue'
import TwitterLogo from './components/icons/TwitterLogo.vue'

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})


</script>

<template>
  
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
  
</template>
