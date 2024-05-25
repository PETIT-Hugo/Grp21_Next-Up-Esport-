<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
import Footer from './components/FooterPage.vue'
import Header from './components/HeaderPage.vue'

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})


</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" class="text-red-500 underline"> Accueil </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
  
</template>
