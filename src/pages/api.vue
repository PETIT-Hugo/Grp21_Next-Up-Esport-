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
    <div v-if="lastMatchId">
      <h2>Dernier Match ID:</h2>
      <p>{{ lastMatchId }}</p>
    </div>
    <div v-if="matchResult !== null">
      <h2>Résultat du Dernier Match:</h2>
      <p>{{ matchResult ? 'Gagné' : 'Perdu' }}</p>
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAccountByRiotId, getLastMatchId, getMatchResult } from '@/services/riotApi';

const gameName = ref('');
const tagLine = ref('');
const accountData = ref<any>(null);
const lastMatchId = ref<string | null>(null);
const matchResult = ref<boolean | null>(null);
const errorMessage = ref('');

const fetchAccountData = async () => {
  try {
    accountData.value = await getAccountByRiotId(gameName.value, tagLine.value);
    if (accountData.value && accountData.value.puuid) {
      lastMatchId.value = await getLastMatchId(accountData.value.puuid);
      if (lastMatchId.value) {
        matchResult.value = await getMatchResult(lastMatchId.value, accountData.value.puuid);
      }
    }
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
