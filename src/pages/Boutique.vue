<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllCosmetique } from '@/backend'; // Assurez-vous que le chemin est correct
import type { CosmetiqueResponse } from '@/pocketbase-types';
import CosmetiqueCard from '@/components/CosmetiqueCard.vue'; // Importez le composant
import type ImgPb from '@/components/ImgPb.vue';

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
  <div class="boutique-container py-6">
    <div class="flex items-center mx-4 md:mx-8 justify-center mb-6">
      <div class="flex-grow border-t-2 border-white"></div>
      <h1 class="mx-4 text-center titre-element-bleu">BOUTIQUE <span class="titre-element-blanc">DU JOUR</span></h1>
      <div class="flex-grow border-t-2 border-white"></div>
    </div>
    
    <div class="cosmetique-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto">
      <CosmetiqueCard 
        v-for="cosmetique in cosmetiques" 
        :key="cosmetique.id" 
        v-bind="cosmetique" 
      />
    </div>
  </div>

  <div class="bg-[#1C1A1A] py-8">
    <div class="flex items-center mx-4 md:mx-8 justify-start">
      <h1 class="mx-4 text-center md:text-left titre-element-blanc">EN MANQUE D'<span class="titre-element-bleu">UPCOINS</span> ?</h1>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-center mx-4 md:mx-12">
      <div class="text-white text-base md:text-2xl mb-4 md:mb-0 md:w-1/2">
        <p class="mb-4">Ne vous inquiétez pas, nous avons la solution pour vous. Achetez des Upcoins avec le bouton ci-dessous !</p>
        <p class="mb-4">Vous pouvez également voir le nombre d’Upcoins en votre possession dans le menu, à côté de votre profil.</p>
        <a href="/BoutiqueUpcoins">
          <button class="bg-[#36C1ED] text-white py-3 px-6 rounded-lg mt-4 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 ease-in-out typo">
            Acheter des Upcoins
          </button>
        </a>
      </div>
      <div class="md:w-1/2 flex justify-center">
        <img src="../components/img/Upcoins_racks.webp" alt="Upcoins racks" class="max-w-full h-auto w-3/4 md:w-full" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.typo {
    font-family: 'Orbitron', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');

.titre-element-bleu {
  font-family: 'Mulish', sans-serif;
  font-size: 4vw; /* Responsive font size */
  
  color: #36C1ED;
  font-weight: 800;
  letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

.titre-element-blanc {
  font-family: 'Mulish', sans-serif;
  font-size: 4vw; /* Responsive font size */
  
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

.boutique-container {
  padding: 20px;
  background-color: #292929;
}

@media (min-width: 768px) {
  .cosmetique-list {
    max-width: 1200px;
  }
}

button:hover {
  background-color: #36C1ED;
  box-shadow: 0 0 20px #36C1ED;
}
</style>
