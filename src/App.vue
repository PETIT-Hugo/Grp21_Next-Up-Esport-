<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
import Pocketbase from 'pocketbase'
import Footer from './components/FooterPage.vue'
import Header from'./components/HeaderPage.vue' 
import HeaderSite from'./components/HeaderSitePage.vue' 
import DiscordLogo from './components/icons/DiscordLogo.vue'
import InstagramLogo from './components/icons/InstagramLogo.vue'
import TwitterLogo from './components/icons/TwitterLogo.vue'

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})


</script>

<template>
  
  <HeaderSite />
 <main>
      <nav>
      <ul>
        <li>
          <RouterLink to="/" class="text-red-500 underline"> Accueil </RouterLink>
        </li>
        <li>
          <RouterLink to="/inscription" class="text-red-500 underline"> Inscription </RouterLink>
        </li>
        <li>
          <RouterLink to="/connexion" class="text-red-500 underline"> Connexion </RouterLink>
        </li>
      </ul>
    </nav>
    <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
  </main>
  <Footer />
  
</template>
