<script setup lang="ts">
import { onErrorCaptured, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import Footer from './components/FooterPage.vue';
import HeaderPage from './components/HeaderPage.vue';
import HeaderSitePage from './components/HeaderSitePage.vue';
import { useAuthStore } from './store/auth'; // Importer le store


const authStore = useAuthStore();
const isUserLoggedIn = computed(() => {
  console.log('Current User ID:', authStore.getCurrentUserId.value); // Ajouter cette ligne pour vérifier l'état
  return authStore.getCurrentUserId.value !== null;
});

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance);
  return true;
});
</script>

<template>
  <component :is="isUserLoggedIn ? HeaderSitePage : HeaderPage" />
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
        <li>
          <RouterLink to="/creationTournoi" class="text-red-500 underline"> Creation Tournoi </RouterLink>
        </li>
        <li>
          <RouterLink to="/api" class="text-red-500 underline"> Tests API </RouterLink>
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

