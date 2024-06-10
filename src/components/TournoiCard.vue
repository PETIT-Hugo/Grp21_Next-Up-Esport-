<script setup lang="ts">
import type { TournoiResponse } from '@/pocketbase-types';
import IconJeuTournoi from './icons/IconJeuTournoi.vue';
import IconDateTournoi from './icons/IconDateTournoi.vue';
import IconJoueurTournoi from './icons/IconJoueurTournoi.vue';
import IconTypeTournoi from './icons/IconTypeTournoi.vue';

const props = defineProps<TournoiResponse<any>>();

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getBannerImage = (game: string): string => {
  if (game === 'League of Legends') {
    return '/banner_lol.jpg';
  } else if (game === 'Valorant') {
    return '/banner_valorant.jpg';
  }
  return '';
};
</script>

<template>
  <div class="card-tournament bg-gray-900 text-white p-4 rounded-lg shadow-md w-64">
    <img :src="getBannerImage(props.jeu)" alt="Game Banner" class="w-full h-32 object-cover rounded-t-lg" />
    <div class="p-4">
      <p class="text-lg font-bold mb-2">{{ props.nom }}</p>
      <div class="flex items-center my-2">
        <IconJeuTournoi class="mr-2" />
        <p>{{ props.jeu }}</p>
      </div>
      <div class="flex items-center my-2">
        <IconTypeTournoi class="mr-2" />
        <p>{{ props.type }}</p>
      </div>
      <div class="flex items-center my-2">
        <IconJoueurTournoi class="mr-2" />
        <p>{{ props.nb_joueurs }} joueurs</p>
      </div>
      <div class="flex items-center my-2">
        <IconDateTournoi class="mr-2" />
        <p>{{ formatDate(props.date) }}</p>
      </div>
      <button class="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600">Aperçu</button>
    </div>
  </div>
</template>

<style scoped>
.card-tournament {
  background-color: #1a202c;
  color: #cbd5e0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  width: 16rem; /* Width to match the example size */
}

.card-tournament img {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  height: 8rem; /* Adjusted height for the banner */
}

.card-tournament .p-4 {
  padding: 1rem; /* Adjust padding for consistent spacing */
}

.card-tournament .text-lg {
  font-size: 1.125rem; /* Large text size */
  margin-bottom: 0.5rem; /* Margin bottom for spacing */
}

.card-tournament .flex {
  display: flex;
  align-items: center;
}

.card-tournament .mr-2 {
  margin-right: 0.5rem;
}

.card-tournament .my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-tournament button {
  display: block;
  width: 100%;
  text-align: center;
  background-color: #4299e1;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.card-tournament button:hover {
  background-color: #3182ce;
}
</style>
