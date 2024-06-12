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
      
    </nav>
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </RouterView>
  </main>
  <Footer />
</template>

