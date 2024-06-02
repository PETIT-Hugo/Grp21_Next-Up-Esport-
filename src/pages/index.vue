<script setup lang="ts">
import TournoiCard from '@/components/TournoiCard.vue'
import { getAllTournois } from '@/backend'
//
const tournoiListe = await getAllTournois()
</script>

<template>
  <h1 class="text-2xl">Page d'Accueil</h1>
  <TournoiCard v-for="unTournoi in tournoiListe" :key="unTournoi.id" v-bind="unTournoi"/>

  

</template>
