<script setup lang="ts">
import type { TournoiResponse } from '@/pocketbase-types';
import IconJeuTournoi from './icons/IconJeuTournoi.vue';
import IconDateTournoi from './icons/IconDateTournoi.vue';
import IconJoueurTournoi from './icons/IconJoueurTournoi.vue';
import IconTypeTournoi from './icons/IconTypeTournoi.vue';

const props = defineProps<TournoiResponse<any>>();

console.log(`props : `, { ...props });

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <div class="border border-black mt-16 mb-16"></div>
  <div class="bg-indigo-400">
    <div>
      <p>Nom du tournoi :</p>
      <p class="font-extrabold">{{ props.nom }}</p>
    </div>
    <div>
      <IconJeuTournoi/>
      <p class="font-extrabold">{{ props.jeu }}</p>
    </div>
    <div>
      <IconTypeTournoi/>
      <p class="font-extrabold">{{ props.type }}</p>
    </div>
    <div>
      <IconJoueurTournoi/>
      <p class="font-extrabold">{{ props.nb_joueurs }}</p>
    </div>
    <div>
      <IconDateTournoi/>
      <p class="font-extrabold">{{ formatDate(props.date) }}</p>
    </div>
  </div>

  <button>Aperçu</button>
  <div class="border border-black mt-16 mb-16"></div>
</template>
