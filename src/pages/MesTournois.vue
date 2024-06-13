<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { getTournoisByUser } from '@/backend';
import type { TournoiResponse, TournoiRecord } from '@/pocketbase-types';
import IconJeuTournoi from '../components/icons/IconJeuTournoi.vue';
import IconDateTournoi from '../components/icons/IconDateTournoi.vue';
import IconJoueurTournoi from '../components/icons/IconJoueurTournoi.vue';
import IconTypeTournoi from '../components/icons/IconTypeTournoi.vue';

const authStore = useAuthStore();
const tournois = ref<TournoiResponse<any>[]>([]);

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

onMounted(async () => {
  const userId = authStore.getCurrentUserId.value;
  if (userId) {
    try {
      tournois.value = await getTournoisByUser(userId);
    } catch (error) {
      console.error('Erreur lors de la récupération des tournois de l\'utilisateur', error);
    }
  }
});
</script>

<template>
  <div class="bg-[#1C1A1A] min-h-screen p-8">
    <div class="flex items-center justify-center mx-8 mb-8">
      <div class="flex-grow border-t-2 border-white"></div>
      <h2 class="mx-12 titre-element-bleu">Mes <span class="titre-element-blanc">tournois</span></h2>
      <div class="flex-grow border-t-2 border-white"></div>
    </div>
    <section class="bg-[#292929]">
      <div class="flex items-center justify-start p-8">
        <h1 class="mx-4 titre-element-bleu">VOS TOURNOIS <span class="titre-element-blanc">EN COURS</span></h1>
        <div class="mx-8 flex-grow border-t-2 border-white"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        <div class="card-tournament bg-gray-900 text-white p-4 rounded-lg shadow-md border mx-8">
          <router-link to="/CreationTournoi">
            <img src="../components/img/Ajout_tournoi.webp" alt="Game Banner" class="custom-image w-full h-32 object-cover rounded-t-lg" />
          </router-link>
          <div class="p-4">
            <p class="text-lg font-bold mb-2">Créer un nouveau tournoi</p>
            <div class="flex items-center my-2">
              <IconJeuTournoi class="mr-2" />
              <p>Choisi ton jeu</p>
            </div>
            <div class="flex items-center my-2">
              <IconTypeTournoi class="mr-2" />
              <p>Accessibilité</p>
            </div>
            <div class="flex items-center my-2">
              <IconJoueurTournoi class="mr-2" />
              <p>Choisi le nombre de joueurs</p>
            </div>
            <div class="flex items-center my-2">
              <IconDateTournoi class="mr-2" />
              <p>Choisi la date</p>
            </div>
          </div>
        </div>
        <div v-for="tournoi in tournois" :key="tournoi.id" class="card-tournament bg-gray-900 text-white p-4 rounded-lg shadow-md border mx-8">
          <img :src="getBannerImage(tournoi.jeu)" alt="Game Banner" class="custom-image w-full h-32 object-cover rounded-t-lg" />
          <div class="p-4">
            <p class="text-lg font-bold mb-2">{{ tournoi.nom }}</p>
            <div class="flex items-center my-2">
              <IconJeuTournoi class="mr-2" />
              <p>{{ tournoi.jeu }}</p>
            </div>
            <div class="flex items-center my-2">
              <IconTypeTournoi class="mr-2" />
              <p>{{ tournoi.type }}</p>
            </div>
            <div class="flex items-center my-2">
              <IconJoueurTournoi class="mr-2" />
              <p>{{ tournoi.nb_joueurs }} joueurs</p>
            </div>
            <div class="flex items-center my-2">
              <IconDateTournoi class="mr-2" />
              <p>{{ formatDate(tournoi.date) }}</p>
            </div>
            <button class="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600">Aperçu</button>
          </div>
        </div>
      </div>
    

    <div class="flex items-center mx-8 justify-start">
    
      <h1 class="mx-4 text-center titre-element-bleu">FONCTIONNEMENT <span class="titre-element-blanc">DES TOURNOIS</span></h1>
    </div>
    <div class="flex justify-between items-center">
      <div class="text-white text-2xl mx-12">
        <p>&nbsp;</p>
        <p class="mb-4">Vous pouvez créer jusqu'à <span class="text-[#36C1ED]">3 tournois simultanément</span>, au prix de <span class="text-[#36C1ED]">500 Upcoins pour chaque tournoi</span>. Une fois que votre tournoi est créé, n'hésitez pas à inviter autant de personnes que possible !</p>
        <p>&nbsp;</p>
        <p class="mb-4">En effet, si vous parvenez à remplir le nombre de joueurs que vous avez sélectionné et que chacun participe au tournoi, <span class="text-[#36C1ED]">vous gagnerez 300 Upcoins</span>, soit le prix pour créer à nouveau un tournoi.</p>
        <p>&nbsp;</p>
        <p class="mb-4">En tant que créateur du tournoi, vous pouvez également choisir ou non de participer à votre propre tournoi.</p>
        <p>&nbsp;</p>
    </div>
  </div></section></div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');

.titre-element-bleu {
  font-family: 'Mulish', sans-serif;
  font-size: 50px;
  color: #36C1ED;
  font-weight: 800;
  letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

.titre-element-blanc {
  font-family: 'Mulish', sans-serif;
  font-size: 50px;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

.card-tournament {
  background-color: #292929;
  color: #cbd5e0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  width: 344px; /* Ajuster la largeur de la carte à 344px */
}

.card-tournament img.custom-image {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  height: 8rem; /* Hauteur ajustée pour la bannière */
  width: 344px; /* Fixer la largeur de l'image à 344px */
}

.card-tournament .p-4 {
  padding: 1rem; /* Ajuster le padding pour un espacement cohérent */
}

.card-tournament .text-lg {
  font-size: 1.125rem; /* Taille de texte large */
  margin-bottom: 0.5rem; /* Espace en bas pour espacement */
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
