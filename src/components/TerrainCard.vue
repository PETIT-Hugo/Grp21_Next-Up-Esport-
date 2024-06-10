<script setup lang="ts">
import type { TerrainResponse } from '@/pocketbase-types';

const props = defineProps<TerrainResponse>();
</script>

<template>
  <div class="terrain-card">
    <h1>Terrain numéro {{ props.numero }}</h1>
  </div>
</template>

<style scoped>
.terrain-card {
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em 0;
}
</style>