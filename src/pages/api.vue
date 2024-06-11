<template>
  <div>
    <h1>Obtenir des informations sur un compte Riot Games</h1>
    <form @submit.prevent="fetchAccountData">
      <div>
        <label for="gameName">Pseudo Riot Games:</label>
        <input id="gameName" v-model="gameName" required />
      </div>
      <div>
        <label for="tagLine">Tag:</label>
        <input id="tagLine" v-model="tagLine" required />
      </div>
      <button type="submit">Rechercher</button>
    </form>
    <div v-if="accountData">
      <h2>Résultats:</h2>
      <p><strong>PUUID:</strong> {{ accountData.puuid }}</p>
      <p><strong>Nom de jeu:</strong> {{ accountData.gameName }}</p>
      <p><strong>Tag:</strong> {{ accountData.tagLine }}</p>
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAccountByRiotId } from '@/services/riotApi';

const gameName = ref('');
const tagLine = ref('');
const accountData = ref<any>(null);
const errorMessage = ref('');

const fetchAccountData = async () => {
  try {
    accountData.value = await getAccountByRiotId(gameName.value, tagLine.value);
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des informations du compte Riot.';
    console.error('Erreur:', error);
  }
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
}
button {
  padding: 10px 15px;
}
</style>
