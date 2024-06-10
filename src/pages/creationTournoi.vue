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
  <div>
    <h1>Création de tournois</h1>
    <p>
      <label>Nom du tournoi</label>
      <input type="text" placeholder="Nom du tournoi" v-model="tournamentName">
    </p>
    <p>
      <label>Jeu</label>
      <select v-model="jeu">
        <option value="Valorant">Valorant</option>
        <option value="League of Legends">League of Legends</option>
      </select>
    </p>
    <p>
      <label>Nombre de joueurs</label>
      <select v-model="nbJoueurs">
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
      </select>
    </p>
    <p>
      <label>Nombre de manches</label>
      <input type="number" v-model="nbManches">
    </p>
    <p>
      <label>Date</label>
      <input type="date" v-model="date">
    </p>
    <p>
      <label>Type</label>
      <select v-model="type">
        <option value="Public">Public</option>
        <option value="Privé">Privé</option>
      </select>
    </p>
    <p>
      <label>Description</label>
      <textarea v-model="description"></textarea>
    </p>

    <button @click="createTournament" class="bg-slate-400">Créer le tournoi</button>
    <label v-text="statusMessage"></label>
  </div>
</template>
