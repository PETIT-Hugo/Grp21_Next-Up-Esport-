<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { createTournament as createTournamentApi } from '@/backend';

const tournamentName = ref('');
const jeu = ref('Valorant');
const nbJoueurs = ref(6); // Par défaut à 6
const nbManches = ref(0);
const date = ref('');
const type = ref('Public');
const description = ref('');
const statusMessage = ref('');
const authStore = useAuthStore();

const createTournament = async () => {
  try {
    const userId = authStore.getCurrentUserId.value;
    if (!userId) {
      statusMessage.value = 'Vous devez être connecté pour créer un tournoi.';
      return;
    }

    if (!tournamentName.value || !jeu.value || !nbJoueurs.value || !nbManches.value || !date.value || !type.value || !description.value) {
      statusMessage.value = 'Tous les champs doivent être remplis.';
      console.error('Erreur: Tous les champs doivent être remplis.');
      return;
    }

    const tournamentData = {
      name: tournamentName.value,
      jeu: jeu.value,
      nb_joueurs: nbJoueurs.value,
      nb_manches: nbManches.value,
      date: date.value,
      type: type.value,
      manche_actuelle: 0,
      officiel: false,
      description: description.value,
      userId: userId,
    };

    console.log('Données du tournoi à envoyer:', tournamentData);

    await createTournamentApi(tournamentData);

    tournamentName.value = '';
    statusMessage.value = 'Le tournoi a été créé avec succès!';
  } catch (error) {
    statusMessage.value = 'Erreur lors de la création du tournoi.';
    console.error('Erreur lors de la création du tournoi:', error);
  }
};
</script>

<template>
  <div class="bg-[#292929] min-h-screen p-8 text-white">
    <div class="mx-32">
      <h1 class="text-6xl font-bold mb-4 balise"><span class="text-[#36C1ED]">Création</span> de tournois</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-2 balise">Nom du tournoi*</label>
          <input type="text" placeholder="Entrez le nom du tournoi..." v-model="tournamentName" class="w-full p-2 h-14 bg-[#353535] rounded text-white" />
        </div>
        <div>
          <label class="block mb-2 balise">Description</label>
          <textarea placeholder="Description..." v-model="description" class="w-full p-2 h-24 bg-[#353535] rounded text-white"></textarea>
        </div>
        <div class="">
          <label class="block mb-2 balise">Jeu*</label>
          <select v-model="jeu" class="w-full p-2 h-14 bg-[#353535] rounded text-white">
            <option value="Valorant">Valorant</option>
            <option value="League of Legends">League of Legends</option>
          </select>
        </div>
        <div>
          <label class="block mb-2 balise">Type*</label>
          <select v-model="type" class="w-full p-2 h-14 bg-[#353535] rounded text-white">
            <option value="Public">Public</option>
            <option value="Privé">Privé</option>
          </select>
        </div>
        <div>
          <label class="block mb-2 balise">Nombre de joueurs*</label>
          <select v-model="nbJoueurs" class="w-full p-2 h-14 bg-[#353535] rounded text-white">
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
          </select>
        </div>
        <div>
          <label class="block mb-2 balise">Nombre de manches*</label>
          <input type="number" v-model="nbManches" class="w-full h-14 p-2 bg-[#353535] rounded text-white" />
        </div>
        <div>
          <label class="block mb-2 balise">Date du tournoi*</label>
          <input type="date" v-model="date" class="w-full p-2 h-14 bg-[#353535] rounded text-white" />
        </div>
      </div>
      <div class="text-center mt-8">
        <button @click="createTournament" class="glow-button bg-[#36C1ED] text-white py-4 px-8 rounded mt-4 bouton_participer">Créer le tournoi</button>
        <p v-if="statusMessage" class="text-white mt-4">{{ statusMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.bouton_participer {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px; /* Augmenté la taille de la police */
  color: #FFFFFF;
  padding: 1em 2em; /* Agrandi le bouton */
}

.glow-button {
  transition: box-shadow 0.3s ease-in-out;
}

.glow-button:hover,
.glow-button:focus {
  box-shadow: 0 0 20px #36C1ED;
}

.balise {
  font-family: 'Mulish', sans-serif;
  font-weight: 900;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900&display=swap');
</style>
