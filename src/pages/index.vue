<script setup lang="ts">
import TournoiCard from '@/components/TournoiCard.vue';
import { getAllTournois } from '@/backend';

// Récupérer la liste des tournois
const tournoiListe = await getAllTournois();
</script>

<template>
  <div class="bg-[#1C1A1A]">
    <!-- Conteneur pour les cartes avec grille de 4 colonnes et espace réduit -->
    <div class="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 pt-8">
      <RouterLink
        v-for="unTournoi in tournoiListe"
        :key="unTournoi.id"
        :to="{
          name: '/[id]',
          params: {
            id: unTournoi.id
          }
        }"
      >   
        <TournoiCard v-bind="unTournoi" class="" />
      </RouterLink>
    </div>
  </div>
</template>
