<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { oneIDTournoi, getTerrainsByTournoiId, registerPlayer } from '@/backend';
import { useAuthStore } from '@/store/auth';
import TerrainCard from '../components/TerrainCard.vue';

const route = useRoute();
const authStore = useAuthStore();
const unTournoi = ref(null);
const terrains = ref([]);
const statusMessage = ref('');

const fetchTournoiAndTerrains = async () => {
  try {
    const tournoiId = route.params.id;
    unTournoi.value = await oneIDTournoi(tournoiId);
    terrains.value = await getTerrainsByTournoiId(tournoiId);
    console.log('Terrains after fetch:', terrains.value);
  } catch (error) {
    console.error('Erreur lors de la récupération du tournoi et des terrains:', error);
  }
};

const inscrireJoueur = async () => {
  try {
    const userId = authStore.getCurrentUserId.value;
    if (!userId) {
      statusMessage.value = 'Vous devez être connecté pour vous inscrire.';
      return;
    }

    await registerPlayer(route.params.id, userId);
    statusMessage.value = 'Inscription réussie!';

    await fetchTournoiAndTerrains();
  } catch (error) {
    statusMessage.value = `Erreur lors de l'inscription: ${error.message}`;
  }
};

onMounted(() => {
  fetchTournoiAndTerrains();
});
</script>

<template>
  <div>
    <h1>{{ unTournoi?.nom }}</h1>
    <p>{{ unTournoi?.description }}</p>

    <button @click="inscrireJoueur">S'inscrire</button>
    <p v-if="statusMessage">{{ statusMessage }}</p>

    <div v-if="terrains.length > 0">
      <h2>Terrains</h2>
      <div class="terrains-grid">
        <div v-for="terrain in terrains" :key="terrain.id">
          <TerrainCard :numero="terrain.numero" :joueurs="terrain.joueurs || []" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terrains-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
