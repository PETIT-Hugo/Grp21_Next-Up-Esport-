<script setup lang="ts">
import TournoiCard from '@/components/TournoiCard.vue'
import { getAllTournois } from '@/backend'
//
const tournoiListe = await getAllTournois()
</script>

<template>
  <h1 class="text-2xl">Page d'Accueil test</h1>
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
      <TournoiCard
       
        v-bind="unTournoi"
        class="mx-auto"
      />
      
    </RouterLink>

  

</template>
