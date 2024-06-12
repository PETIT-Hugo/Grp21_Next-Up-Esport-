<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllCosmetique } from '@/backend'; // Assurez-vous que le chemin est correct
import type { CosmetiqueResponse } from '@/pocketbase-types';
import CosmetiqueCard from '@/components/CosmetiqueCard.vue'; // Importez le composant

const cosmetiques = ref<CosmetiqueResponse[]>([]);

const fetchCosmetiques = async () => {
  try {
    const records = await getAllCosmetique();
    cosmetiques.value = records;
    console.log('Cosmetiques data:', cosmetiques.value);
  } catch (error) {
    console.error('Failed to fetch cosmetiques:', error);
  }
};

onMounted(() => {
  fetchCosmetiques();
});
</script>

<template>
  <div class="boutique-container">
    
    <div class="cosmetique-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
      <CosmetiqueCard 
        v-for="cosmetique in cosmetiques" 
        :key="cosmetique.id" 
        v-bind="cosmetique" 
      />
    </div>
  </div>
</template>

<style scoped>
.boutique-container {
  padding: 20px;
  background-color: #292929;
}

.cosmetique-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120px;
}
</style>
