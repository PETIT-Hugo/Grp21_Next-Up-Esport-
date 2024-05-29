<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { createTournament as createTournamentApi } from '@/backend';

const tournamentName = ref('');
const jeu = ref('valorant');
const nbJoueurs = ref(0);
const nbManches = ref(0);
const date = ref('');
const type = ref('public');
const mancheActuelle = ref(0);
const officiel = ref(false);
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

    const tournamentData = {
      name: tournamentName.value,
      jeu: jeu.value,
      nb_joueurs: nbJoueurs.value,
      nb_manches: nbManches.value,
      date: date.value,
      type: type.value,
      manche_actuelle: mancheActuelle.value,
      officiel: officiel.value,
      description: description.value,
      userId: userId
    };

    await createTournamentApi(tournamentData);

    tournamentName.value = '';
    statusMessage.value = 'Le tournoi a été créé avec succès!';
  } catch (error) {
    statusMessage.value = 'Erreur lors de la création du tournoi.';
    console.error('Erreur lors de la création du tournoi:', error);
  }
}
</script>

<template>
  <div>
    <h1>Création de tournoi</h1>
    <p>
      <label>Nom du tournoi</label>
      <input type="text" placeholder="Nom du tournoi" v-model="tournamentName">
    </p>
    <p>
      <label>Jeu</label>
      <select v-model="jeu">
        <option value="valorant">Valorant</option>
        <option value="lol">LoL</option>
      </select>
    </p>
    <p>
      <label>Nombre de joueurs</label>
      <input type="number" v-model="nbJoueurs">
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
        <option value="public">Public</option>
        <option value="prive">Privé</option>
      </select>
    </p>
    <p>
      <label>Manche actuelle</label>
      <input type="number" v-model="mancheActuelle">
    </p>
    <p>
      <label>Officiel</label>
      <input type="checkbox" v-model="officiel">
    </p>
    <p>
      <label>Description</label>
      <textarea v-model="description"></textarea>
    </p>

    <button @click="createTournament" class="bg-slate-400">Créer le tournoi</button>
    <label v-text="statusMessage"></label>
  </div>
</template>