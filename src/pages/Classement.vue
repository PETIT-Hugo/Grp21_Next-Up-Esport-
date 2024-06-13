<template>
  <div class="bg-[#1C1A1A] pb-16">
    <h1 class="mb-4 titre-element-bleu text-center pt-12">CLASSEMENT <span class="titre-element-blanc">DES JOUEURS</span></h1>
    <h2 class="mb-4 titre-element-bleu2 mx-24">Top 10 <span class="titre-element-blanc2">des meilleurs joueurs</span></h2>
    <p class="mb-16 mx-24 texte">Cette liste regroupe les 10 meilleurs joueurs du site internet, selon leur nombre de victoires totales.
      Les joueurs réussissant à atteindre le top 10 seront récompensés de 2000 Upcoins chaque mois. 
    </p>
    <div v-if="players.length">
      <ClassementCard 
        v-for="(player, index) in players.slice(0, 10)" 
        :key="player.id" 
        :player="player" 
        :position="index + 1" 
        :class="{'mb-4': index < players.length - 1, 'mb-16': index === players.length - 1}" 
      />
    </div>
    <div v-else>
      <p class="text-gray-600 text-center">Aucun joueur trouvé.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ClassementCard from '@/components/ClassementCard.vue';
import { getPlayersByVictories } from '@/backend.ts';

const players = ref([]);

const fetchPlayers = async () => {
  try {
    players.value = await getPlayersByVictories();
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs par victoires:', error);
  }
};

onMounted(() => {
  fetchPlayers();
});
</script>

<style scoped>
.titre-element-bleu {
    font-family: 'Mulish', sans-serif;
    font-size: 50px;
    color: #36C1ED;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -2.5% */
}

.titre-element-bleu2 {
    font-family: 'Mulish', sans-serif;
    font-size: 35px;
    color: #36C1ED;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -2.5% */
}

.titre-element-blanc {
    font-family: 'Mulish', sans-serif;
    font-size: 50px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -2.5% */
}

.titre-element-blanc2 {
    font-family: 'Mulish', sans-serif;
    font-size: 35px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -2.5% */
}

.texte {
    font-family: 'Mulish', sans-serif;
    font-size: 20px;
    color: #ffffff;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
