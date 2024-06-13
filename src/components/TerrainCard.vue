<script setup lang="ts">
import type { TerrainResponse } from '@/pocketbase-types';

const props = defineProps<{
  numero: number,
  joueurs: { id: string, nom: string, gagnant: boolean }[]
}>();


</script>

<template>
  <div class="terrain-wrapper">
    <h1 class="terrain-title">Terrain {{ props.numero }}</h1>
    <div class="terrain-card">
      <div class="terrain-content">
        <div class="player" :class="{ winner: props.joueurs[0]?.gagnant, loser: props.joueurs[0] && !props.joueurs[0]?.gagnant }">
          {{ props.joueurs[0]?.nom || 'Libre' }}
        </div>
        <div class="vs-container">
          <div class="vs">VS</div>
        </div>
        <div class="player" :class="{ winner: props.joueurs[1]?.gagnant, loser: props.joueurs[1] && !props.joueurs[1]?.gagnant }">
          {{ props.joueurs[1]?.nom || 'Libre' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player.winner {
  color: #77ec9a;
}

.player.loser {
  color: whitesmoke /* Assurez-vous que les perdants sont en rouge pour mieux les distinguer */
}

/* Existing styles */

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px #00ffff;
  }
  50% {
    box-shadow: 0 0 20px #00ffff;
  }
}

.terrain-wrapper {
  text-align: center;
  margin-bottom: 1em;
}

.terrain-card {
  border: 4px solid #00ffff;
  padding: 1em;
  margin: 1em;
  background-color: #333;
  color: white;
  box-shadow: 0 0 10px #00ffff;
  animation: glow 3.5s infinite;
  position: relative;
}

.terrain-title {
  color: #ffffff;
  font-size: 1.5em;
  margin-bottom: 1em;
  font-family: 'Mulish', sans-serif;
  font-weight:900;
  font-size:32px; 
}

.terrain-content {
  background-color: #333;
  padding: 1em;
  border: 2px solid #00ffff;
  position: relative;
  width: 100%;
  text-align: center;
}

.player {
  background-color: #333;
  margin: 0.5em 0;
  font-family: 'Orbitron', sans-serif; 
  font-size: 24px;
}

.vs-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
}

.vs {
  color: #00ffff;
  font-size: 1.2em;
  position: relative;
  padding: 0 1em;
  font-family: 'Orbitron', sans-serif;
}

.vs-container::before, .vs-container::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 2em);
  height: 2px;
  background-color: #00ffff;
}

.vs-container::before {
  left: 0;
}

.vs-container::after {
  right: 0;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
