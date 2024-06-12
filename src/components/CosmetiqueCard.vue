<script setup lang="ts">
import { ref } from 'vue';
import type { CosmetiqueResponse } from '@/pocketbase-types';
import ImgPb from './ImgPb.vue';
import UpCoin from './icons/UpCoin.vue';

const props = defineProps<CosmetiqueResponse>();

const showDescription = ref(false);

const toggleDescription = () => {
  showDescription.value = !showDescription.value;
};

const handleBuyClick = () => {
  console.log(`Buying item: ${props.nom} for ${props.prix} UpCoins`);
  // Ajoutez ici la logique pour acheter l'item
};
</script>

<template>
  <div class="cosmetique-item w-80 h-140 bg-transparent overflow-hidden relative mb-10">
    <div class="image-container relative w-full h-80 border-4 border-[#36C1ED]">
      <ImgPb :record="props" :filename="props.image" />
      <div class="info-icon absolute top-2 right-2 bg-[#36C1ED] bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" @click="toggleDescription">i</div>
      <transition name="fade">
        <div v-if="showDescription" class="cosmetique-description absolute top-10 right-2 bg-black bg-opacity-75 text-white p-4 text-base rounded-lg">
          {{ props.description }}
        </div>
      </transition>
      <div class="barre-bleue absolute bottom-16 w-full bg-[#36C1ED] h-1"></div>
      <h2 class="cosmetique-name absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center m-0 py-4 text-2xl">{{ props.nom }}</h2>
    </div>
    <button class="flex items-center justify-center space-x-2 price-button w-10/12 mx-auto mt-3 mb-3 py-3 bg-[#36C1ED] text-white rounded-lg text-center cursor-pointer" 
    @click="handleBuyClick">
      <UpCoin class="w-16 h-16" />
      <span class="prix -ml-4">{{ props.prix }}</span> 
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.prix {
    font-size: 2em;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
}
</style>
