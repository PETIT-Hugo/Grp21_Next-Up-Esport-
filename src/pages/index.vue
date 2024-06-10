<script setup lang="ts">
import TournoiCard from '@/components/TournoiCard.vue';
import { getAllTournois } from '@/backend';

// Récupérer la liste des tournois
const tournoiListe = await getAllTournois();
</script>

<style>
.uppercase-title {
  font-family: 'Mulish', sans-serif;
  font-weight: 700; /* Gras */
}

.elements-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 200; 
  font-size: 12.5px;
  color: #7C7C7C;
}

.menu-element {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  color: #FFFFFF;
  font-weight: bold;
}

.menu-element-upcoins {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  color: #36C1ED;
  font-weight: bold;
}

.titre-element-bleu {
    font-family: 'Mulish', sans-serif;
    font-size:50px;
    color: #36C1ED;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */

}

.titre-element-blanc {
    font-family: 'Mulish', sans-serif;
    font-size:50px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */

}
</style>

<template>
  <div class="relative bg-[#1C1A1A]">
    <img src="../components/img/banniere_accueil.webp" alt="" class="w-full">
    <div class="absolute inset-0 flex justify-center items-center mb-12">
      <h1 class="titre-element-blanc text-4xl sm:text-6xl text-center">
  BIENVENUE DANS <span class="titre-element-bleu">L'ARENE</span>
</h1>

    </div>

<div class="w-full text-center text-[#303030] mt-4">
  リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ 
</div></div>

  <div class="bg-[#1C1A1A]">
    <!-- Conteneur pour les cartes avec grille de 4 colonnes et espace réduit -->
    <div class="mx-4 sm:mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 pt-8">

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
        <TournoiCard v-bind="unTournoi" class="mx-auto" />

      </RouterLink>
    </div>
  </div>
</template>
