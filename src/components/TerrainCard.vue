<script setup lang="ts">
import type { TerrainResponse } from '@/pocketbase-types';

const props = defineProps<{
  numero: number,
  joueurs: { id: string, nom: string }[]
}>();
</script>

<template>
  <div class="terrain-card">
    <h1 class="terrain-title">Terrain {{ props.numero }}</h1>
    <div class="terrain-content">
      <div class="player">{{ props.joueurs[0]?.nom || 'Libre' }}</div>
      <div class="vs">VS</div>
      <div class="player">{{ props.joueurs[1]?.nom || 'Libre' }}</div>
    </div>
  </div>
</template>

<style scoped>
.terrain-card {
  border: 2px solid #00ffff;
  padding: 1em;
  margin: 1em;
  background-color: #333;
  color: white;
  text-align: center;
  box-shadow: 0 0 10px #00ffff;
}

.terrain-title {
  color: #00ffff;
}

.terrain-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
}

.player {
  flex: 1;
  background-color: #444;
  padding: 1em;
  margin: 0.5em;
}

.vs {
  flex: 0.2;
  color: #00ffff;
}
</style>
