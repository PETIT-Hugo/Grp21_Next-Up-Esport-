<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { oneIDTournoi, getTerrainsByTournoiId, registerPlayer, nextRound, applyMontanteDescendante, getPlayersByTournoiId, getUserTournaments } from '@/backend';
import { useAuthStore } from '@/store/auth';
import TerrainCard from '../components/TerrainCard.vue';

const route = useRoute();
const authStore = useAuthStore();
const unTournoi = ref(null);
const terrains = ref([]);
const joueurs = ref([]);
const statusMessage = ref('');
const userTournaments = ref({ createdTournaments: [], joinedTournaments: [] });
const isFinDeManche = ref(false); // Variable pour gérer l'état des boutons

const fetchTournoiAndTerrains = async () => {
  try {
    const tournoiId = route.params.id;
    unTournoi.value = await oneIDTournoi(tournoiId);
    terrains.value = await getTerrainsByTournoiId(tournoiId);
    joueurs.value = await getPlayersByTournoiId(tournoiId);
    console.log('Terrains after fetch:', terrains.value);
    console.log('Joueurs after fetch:', joueurs.value);
  } catch (error) {
    console.error('Erreur lors de la récupération du tournoi et des terrains:', error);
  }
};

const fetchUserTournaments = async () => {
  try {
    const userId = authStore.getCurrentUserId.value;
    if (userId) {
      userTournaments.value = await getUserTournaments(userId);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois de l\'utilisateur:', error);
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

const avancerManche = async () => {
  try {
    const result = await nextRound(route.params.id);
    statusMessage.value = 'Les gagnants ont été définis!';
    isFinDeManche.value = true; // Passer à l'étape "Manche suivante"
    await nextTick(); // Assurer la mise à jour du DOM
    await fetchTournoiAndTerrains(); // Rafraîchir les données après mise à jour
  } catch (error) {
    statusMessage.value = `Erreur lors du passage à la manche suivante: ${error.message}`;
  }
};

const appliquerMontanteDescendante = async () => {
  try {
    const result = await applyMontanteDescendante(route.params.id);
    statusMessage.value = 'La réorganisation des joueurs est terminée!';
    isFinDeManche.value = false; // Revenir à l'étape "Fin de manche"
    await nextTick(); // Assurer la mise à jour du DOM
    await fetchTournoiAndTerrains(); // Rafraîchir les données après mise à jour
  } catch (error) {
    statusMessage.value = `Erreur lors de la réorganisation des joueurs: ${error.message}`;
  }
};

const isCreatorRegistered = () => {
  const userId = authStore.getCurrentUserId.value;
  const isCreator = unTournoi.value?.id_createur === userId;
  const isRegistered = joueurs.value.some(joueur => joueur.id_utilisateur === userId);
  return isCreator && isRegistered;
};

onMounted(() => {
  fetchTournoiAndTerrains();
  fetchUserTournaments();
});

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
  <div class="bg-[#1C1A1A] min-h-screen p-8">
    <div class="text-center mb-8">
      <h1 class="titre-element-bleu">{{ unTournoi?.nom }}</h1>
    </div>

    <div class="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8 mx-12">
      <!-- First Grey Box -->
      <div class="bg-[#353535] rounded p-8 flex-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- JEU -->
          <div class="flex items-center">
            <p class="text-2xl font-black text-blue-200">JEU</p>
          </div>
          <div class="flex items-center">
            <p class="text-xl text-blue-200">{{ unTournoi?.jeu }}</p>
          </div>
          
          <!-- NOMBRE DE JOUEURS -->
          <div class="flex items-center">
            <p class="text-2xl font-black text-blue-200">NOMBRE DE JOUEURS</p>
          </div>
          <div class="flex items-center">
            <p class="text-xl text-blue-200">{{ unTournoi?.nb_joueurs }} joueurs</p>
          </div>

          <!-- DATE DE DÉPART -->
          <div class="flex items-center">
            <p class="text-2xl font-black text-blue-200">DATE DE DÉPART</p>
          </div>
          <div class="flex items-center">
            <p class="text-xl text-blue-200">{{ formatDate(unTournoi?.date) }}</p>
          </div>

          <!-- DURÉE -->
          <div class="flex items-center">
            <p class="text-2xl font-black text-blue-200">DURÉE</p>
          </div>
          <div class="flex items-center">
            <p class="text-xl text-blue-200">{{ unTournoi?.nb_manches }} manches</p>
          </div>
        </div>
      </div>

      <!-- Second Grey Box for DESCRIPTION -->
      <div class="bg-[#353535] rounded p-8 flex-1">
        <div class="text-center mb-4">
          <p class="text-2xl font-black text-blue-200">DESCRIPTION</p>
        </div>
        <div>
          <p class="text-xl text-blue-200">{{ unTournoi?.description }}</p>
        </div>
      </div>
    </div>

    <div v-if="terrains.length > 0" class="mt-8">
      <h2 class="text-2xl text-white font-bold mb-4">Terrains</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="terrain in terrains" :key="terrain.id" class="m-2">
          <TerrainCard :numero="terrain.numero" :joueurs="terrain.joueurs || []" />
        </div>
      </div>
    </div>

    <div class="text-center mt-8">
      <button v-if="isCreatorRegistered()" 
              class="glow-button bg-[#36C1ED] text-white py-4 px-8 rounded mt-4 bouton_participer" 
              @click="avancerManche">
        Fin de manche
      </button>
      <button v-if="isCreatorRegistered()" 
              class="glow-button bg-[#36C1ED] text-white py-4 px-8 rounded mt-4 bouton_participer" 
              @click="appliquerMontanteDescendante">
        Manche suivante
      </button>
      <button v-else-if="!isCreatorRegistered()" 
              class="glow-button bg-[#36C1ED] text-white py-4 px-8 rounded mt-4 bouton_participer" 
              @click="inscrireJoueur">
        Participer au tournoi
      </button>
      <p v-if="statusMessage" class="text-blue-200 mt-4">{{ statusMessage }}</p>
    </div>
  </div>
</template>

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

.bouton_participer {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px; /* Augmenté la taille de la police */
  color: #FFFFFF;
  padding: 1em 2em; /* Agrandi le bouton */
}

.glow-button {
  animation: glow 1.5s infinite;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px #36C1ED;
  }
  50% {
    box-shadow: 0 0 20px #36C1ED;
  }
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900&display=swap');
</style>
