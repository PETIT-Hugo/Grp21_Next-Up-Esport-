<script setup lang="ts">
import { ref, computed } from 'vue';
import TournoiCard from '@/components/TournoiCard.vue';
import { getAllTournois } from '@/backend';
import Search from '@/components/icons/Search.vue';
import Fleche from '@/components/icons/Fleche.vue';

// Récupérer la liste des tournois
const tournoiListe = await getAllTournois();
const searchQuery = ref('');
const selectedGame = ref('Sans filtre');
const selectedType = ref('Sans filtre');
const selectedPlayers = ref('Sans filtre');
const showGameDropdown = ref(false);
const showTypeDropdown = ref(false);
const showPlayersDropdown = ref(false);

// Filtrer les tournois
const filteredTournois = computed(() => {
  return tournoiListe.filter(tournoi => {
    return (
      (selectedGame.value === 'Sans filtre' || tournoi.jeu === selectedGame.value) &&
      (selectedType.value === 'Sans filtre' || tournoi.type === selectedType.value) &&
      (selectedPlayers.value === 'Sans filtre' || `${tournoi.nb_joueurs} Joueurs` === selectedPlayers.value) &&
      (searchQuery.value === '' || tournoi.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  });
});

// Méthodes pour gérer les dropdowns
const toggleGameDropdown = () => { showGameDropdown.value = !showGameDropdown.value; };
const toggleTypeDropdown = () => { showTypeDropdown.value = !showTypeDropdown.value; };
const togglePlayersDropdown = () => { showPlayersDropdown.value = !showPlayersDropdown.value; };

const selectGame = (game: string) => {
  selectedGame.value = game;
  showGameDropdown.value = false;
};
const selectType = (type: string) => {
  selectedType.value = type;
  showTypeDropdown.value = false;
};
const selectPlayers = (players: string) => {
  selectedPlayers.value = players;
  showPlayersDropdown.value = false;
};

// Method to reset all filters
const resetFilters = () => {
  selectedGame.value = 'Sans filtre';
  selectedType.value = 'Sans filtre';
  selectedPlayers.value = 'Sans filtre';
  searchQuery.value = '';
};
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

.filtrage {
  font-family: 'Orbitron', sans-serif;
}
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

</style>

<template>
  <div class="relative bg-[#1C1A1A]">
    <img src="../components/img/banniere_accueil.webp" alt="" class="w-full">
    <div class="absolute inset-0 flex justify-center items-center mb-12">
      <h1 class="titre-element-blanc mb-4 sm:text-6xl text-center">
        BIENVENUE DANS <span class="titre-element-bleu">L'ARENE</span>
      </h1>
    </div>

    <div class="w-full text-center text-[#303030] mt-4 pb-4">
      リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ ̣⚍ !¡!¡ℸ ̣リ̇/ℸ 
    </div>
  </div>

  <div class="bg-[#1C1A1A]">
    <div class="mx-4 sm:mx-8 justify-start flex">
      <h1 class="titre-element-bleu">Tournois<span class="titre-element-blanc"> en vedette</span></h1>
    </div>

    <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mx-4 sm:mx-10">
      <!-- Search Bar -->
      <div class="relative w-full sm:w-[400px]">
        <input
          type="text"
          placeholder="Rechercher un tournoi"
          v-model="searchQuery"
          class="bg-[#2D2D2D] text-[#A0A0A0] rounded w-full h-16 pl-4 pr-8 py-2 focus:outline-none"
        />
        <Search class="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" />
      </div>
      
      <!-- Dropdown Buttons -->
      <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <!-- Dropdown Button 1 -->
        <div class="relative w-full sm:w-auto">
          <button @click="toggleGameDropdown" class="bg-[#2D2D2D] text-[#36C1ED] filtrage w-full sm:w-56 py-2 px-4 h-16 rounded focus:outline-none">
            JEUX
            <Fleche class="inline-block ml-2"/>
          </button>
          <div v-if="showGameDropdown" class="absolute left-0 mt-2 w-full sm:w-56 bg-[#2D2D2D] text-[#36C1ED] filtrage border border-[#A0A0A0] rounded">
            <div @click="selectGame('Valorant')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">Valorant</div>
            <div @click="selectGame('League of Legends')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">League of Legends</div>
            <div @click="selectGame('Sans filtre')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">Sans filtre</div>
          </div>
        </div>

        <!-- Dropdown Button 2 -->
        <div class="relative w-full sm:w-auto">
          <button @click="toggleTypeDropdown" class="bg-[#2D2D2D] text-[#36C1ED] filtrage py-2 w-full sm:w-48 px-4 h-16 rounded focus:outline-none">
            TYPE
            <Fleche class="inline-block ml-2"/>
          </button>
          <div v-if="showTypeDropdown" class="absolute left-0 mt-2 w-full sm:w-48 bg-[#2D2D2D] text-[#36C1ED] filtrage border border-[#A0A0A0] rounded">
            <div @click="selectType('Public')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">Public</div>
            <div @click="selectType('Privé')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">Privé</div>
            <div @click="selectType('Sans filtre')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">Sans filtre</div>
          </div>
        </div>

        <!-- Dropdown Button 3 -->
        <div class="relative w-full sm:w-auto">
          <button @click="togglePlayersDropdown" class="bg-[#2D2D2D] text-[#36C1ED] filtrage w-full sm:w-48 py-2 px-4 h-16 rounded focus:outline-none">
            JOUEURS
            <Fleche class="inline-block ml-2"/>
          </button>
          <div v-if="showPlayersDropdown" class="absolute left-0 mt-2 w-full sm:w-48 bg-[#2D2D2D] text-[#36C1ED] filtrage border border-[#36C1ED] rounded">
            <div @click="selectPlayers('6 Joueurs')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">6 Joueurs</div>
            <div @click="selectPlayers('8 Joueurs')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">8 Joueurs</div>
            <div @click="selectPlayers('10 Joueurs')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">10 Joueurs</div>
            <div @click="selectPlayers('12 Joueurs')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">12 Joueurs</div>
            <div @click="selectPlayers('Sans filtre')" class="px-4 py-2 cursor-pointer hover:bg-gray-700">Sans filtre</div>
          </div>
        </div>

        <!-- Reset Button -->
        <button @click="resetFilters" class="bg-[#36C1ED] text-white filtrage w-full sm:w-auto py-2 px-4 h-16 rounded focus:outline-none">
          Réinitialiser
        </button>
      </div>
    </div>

    <div class="mx-4 sm:mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 pt-8">
      <RouterLink
        v-for="unTournoi in filteredTournois"
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
