<!-- id.vue -->
<script setup lang="ts">
import type { TerrainResponse, TournoiResponse } from '@/pocketbase-types';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { oneIDTournoi, getTerrainsByTournoiId } from '@/backend';
import TerrainCard from '../components/TerrainCard.vue';

const route = useRoute();
const unTournoi = ref<TournoiResponse | null>(null);
const terrains = ref<TerrainResponse[]>([]);

const fetchTournoiAndTerrains = async () => {
  try {
    const tournoiId = route.params.id;
    unTournoi.value = await oneIDTournoi(tournoiId);
    terrains.value = await getTerrainsByTournoiId(tournoiId);
  } catch (error) {
    console.error('Erreur lors de la récupération du tournoi et des terrains:', error);
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

    <div v-if="terrains.length > 0">
      <h2>Terrains</h2>
      <div v-for="terrain in terrains" :key="terrain.id">
        <TerrainCard :numero="terrain.numero" />
      </div>
    </div>
  </div>
</template>
