<template>
  <div>
    <h1>Match Details</h1>
    <input v-model="summonerName" placeholder="Enter summoner name" />
    <button @click="fetchMatchDetails">Get Match Details</button>

    <div v-if="match">
      <p>Game ID: {{ match.gameId }}</p>
      <p>Game Duration: {{ match.gameDuration }}</p>
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>Enter a summoner name to get match details.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getSummonerByName, getMatchlistByAccount, getMatchById } from '../services/riotApi';

export default defineComponent({
  name: 'MatchDetails',
  setup() {
    const match = ref<any>(null);
    const summonerName = ref<string>('');
    const loading = ref<boolean>(false);

    const fetchMatchDetails = async () => {
      if (!summonerName.value) return;

      loading.value = true;
      match.value = null;

      try {
        const summonerData = await getSummonerByName(summonerName.value);
        const accountId = summonerData.accountId;

        const matchlist = await getMatchlistByAccount(accountId);
        const matches = matchlist.matches;

        if (matches.length > 0) {
          const matchId = matches[0].gameId;
          const matchData = await getMatchById(matchId);
          match.value = matchData;
        }
      } catch (error) {
        console.error('Failed to fetch match details:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      match,
      summonerName,
      fetchMatchDetails,
      loading
    };
  }
});
</script>

