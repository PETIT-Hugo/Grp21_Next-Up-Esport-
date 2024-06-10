<script setup lang="ts">
import TournoiCard from '@/components/TournoiCard.vue';
import { getAllTournois } from '@/backend';
import Search from '@/components/icons/Search.vue';
import Fleche from '@/components/icons/Fleche.vue';

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

    <div class="w-full text-center text-[#303030] mt-4 pb-4">
      リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ 
    </div>
  </div>

  <div class="bg-[#1C1A1A]">
    <div class="mx-8 justify-start flex">
      <h1 class="titre-element-bleu">Tournois<span class="titre-element-blanc"> en vedette</span></h1>
    </div>

    <div class="flex items-center space-x-4 mx-10">
      <!-- Search Bar -->
      <div class="relative w-[400px]">
        <input
          type="text"
          placeholder="Rechercher un tournoi"
          class="bg-[#2D2D2D] text-[#A0A0A0] rounded w-full h-16 pl-4 pr-8 py-2 focus:outline-none"
        />
        <Search class="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" />
      </div>
      
      <!-- Dropdown Buttons -->
      <div class="flex space-x-4">
        <!-- Dropdown Button 1 -->
        <div class="relative">
          <button class="bg-[#2D2D2D] text-white py-2 px-4 h-16 rounded focus:outline-none">
            JEUX
            <Fleche class="inline-block ml-2"/>
          </button>
          <div class="absolute left-0 mt-2 w-48 bg-[#2D2D2D] text-white border border-[#A0A0A0] rounded hidden">
            <!-- Dropdown content here -->
          </div>
        </div>

        <!-- Dropdown Button 2 -->
        <div class="relative">
          <button class="bg-[#2D2D2D] text-white py-2 px-4 h-16 rounded focus:outline-none">
            TYPE
            <Fleche class="inline-block ml-2"/>
          </button>
          <div class="absolute left-0 mt-2 w-48 bg-[#2D2D2D] text-white border border-[#A0A0A0] rounded-sm hidden">
            <!-- Dropdown content here -->
          </div>
        </div>

        <!-- Dropdown Button 3 -->
        <div class="relative">
          <button class="bg-[#2D2D2D] text-white py-2 px-4 h-16 rounded-sm focus:outline-none">
            JOUEURS
            <Fleche class="inline-block ml-2"/>
          </button>
          <div class="absolute left-0 mt-2 w-48 bg-[#2D2D2D] text-white border border-[#A0A0A0] rounded-sm hidden">
            <!-- Dropdown content here -->
          </div>
        </div>
      </div>
    </div>

    <div class="mx-4 sm:mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 pt-8">
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
