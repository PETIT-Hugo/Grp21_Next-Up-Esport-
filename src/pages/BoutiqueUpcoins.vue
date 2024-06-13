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
  <div class="boutique-container">
    <div class="flex items-center mx-8 justify-center mb-6">
      <div class="flex-grow border-t-2 border-white"></div>
      <h1 class="mx-4 text-center titre-element-blanc">ACHETER DES <span class="titre-element-bleu">UPCOINS</span></h1>
      <div class="flex-grow border-t-2 border-white"></div>
    </div>
    
    <div class="cosmetique-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
      <div class="cosmetique-item w-80 h-140 bg-transparent overflow-hidden relative mb-10">
        <div class="image-container relative w-full h-80 border-4 border-[#36C1ED]">
          <img src="../components/img/500_Upcoins.webp" alt="">
          <div class="barre-bleue absolute bottom-16 w-full bg-[#36C1ED] h-1"></div>
          <h2 class="cosmetique-name absolute bottom-0 w-full bg-[#1C1A1A] bg-opacity-50 text-white text-center m-0 py-4 text-2xl">500 Upcoins</h2>
        </div>
        <a href="https://buy.stripe.com/test_00g4iK1tn7TNfSM5kk">
  <button class="flex items-center justify-center w-10/12 mx-auto mt-3 mb-3 py-3 bg-[#36C1ED] text-white rounded-lg text-center cursor-pointer hover:bg-[#5aecff] hover:shadow-lg transition duration-300 ease-in-out">
    <p class="typo mx-auto">Acheter</p>
  </button>
</a>

      </div>

      <div class="cosmetique-item w-80 h-140 bg-transparent overflow-hidden relative mb-10">
        <div class="image-container relative w-full h-80 border-4 border-[#36C1ED]">
          <img src="../components/img/1500_Upcoins.webp" alt="">
          <div class="barre-bleue absolute bottom-16 w-full bg-[#36C1ED] h-1"></div>
          <h2 class="cosmetique-name absolute bottom-0 w-full bg-[#1C1A1A] bg-opacity-50 text-white text-center m-0 py-4 text-2xl">1500 Upcoins</h2>
        </div>
        <a href="https://buy.stripe.com/test_00g7uW0pj2zt6iceUV">
  <button class="flex items-center justify-center w-10/12 mx-auto mt-3 mb-3 py-3 bg-[#36C1ED] text-white rounded-lg text-center cursor-pointer hover:bg-[#5aecff] hover:shadow-lg transition duration-300 ease-in-out">
    <p class="typo mx-auto">Acheter</p>
  </button>
</a>


      </div>

      <div class="cosmetique-item w-80 h-140 bg-transparent overflow-hidden relative mb-10">
        <div class="image-container relative w-full h-80 border-4 border-[#36C1ED]">
          <img src="../components/img/5000_Upcoins.webp" alt="">
          <div class="barre-bleue absolute bottom-16 w-full bg-[#36C1ED] h-1"></div>
          <h2 class="cosmetique-name absolute bottom-0 w-full bg-[#1C1A1A] bg-opacity-50 text-white text-center m-0 py-4 text-2xl">5000 Upcoins</h2>
        </div>
        <a href="https://buy.stripe.com/test_aEU2aCgoheib360eUW">
  <button class="flex items-center justify-center w-10/12 mx-auto mt-3 mb-3 py-3 bg-[#36C1ED] text-white rounded-lg text-center cursor-pointer hover:bg-[#5aecff] hover:shadow-lg transition duration-300 ease-in-out">
    <p class="typo mx-auto">Acheter</p>
  </button>
</a>
      </div>
    </div>
  </div> 

  <div class="bg-[#1C1A1A] py-8">
    <div class="flex items-center mx-8 justify-start">
      <h1 class="mx-4 text-center titre-element-blanc">LES UPCOINS, <span class="titre-element-bleu">C'EST QUOI</span> ?</h1>
    </div>
    <div class="flex justify-between items-center">
      <div class="text-white text-2xl mx-12">
        <p>&nbsp;</p>
        <p class="mb-4">Les Upcoins sont la monnaie du site internet NextUp E-Sport. Il s’agit de crédits vous permettant d’acheter des cosmétiques dans la boutique, et de créer des tournois. </p>
        <p>&nbsp;</p>
        <p class="mb-4">Vous pouvez obtenir des Upcoins en achetant ces derniers dans la boutique d’Upcoins, ou en réalisant des tournois à succès, avec le nombre maximal de joueurs atteint. </p>
        <p>&nbsp;</p>
        <p class="mb-4">Chaque joueur possédant un compte NextUp E-Sport est accueillit avec 500 Upcoins, soit une somme suffisante pour créer un tournois.</p>
      </div>
      
    </div>

    <div class="flex items-center mx-8 justify-start">
      <h1 class="mx-4 titre-element-blanc">ACHETER DES <span class="titre-element-bleu">COSMÉTIQUES</span> POUR
      <span class="titre-element-bleu">PERSONNALISER VOTRE EXPÉRIENCE </span>AU MAXIMUM !</h1>
    </div>

    <div class="flex justify-between items-center">
      <div class="text-white text-2xl mx-12">
        <p>&nbsp;</p>
        <p class="mb-4">NextUp E-Sport est un projet que nous souhaitons faire grandir à l’aide d’une communauté dévouée, qui prendra plaisir à accumuler les victoires sur leur profil et s’améliorer sur la plateforme. </p>
        <p>&nbsp;</p>
        <p class="mb-4">Les cosmétiques ont pour but de renforcer ce sentiment d’unité, en offrant à nos utilisateurs un choix de personnalisation que nous continuerons à améliorer. Ces items ne sont en aucun requis pour participer à des tournois, et n’offrent aucun avantages de référencement lors de la création de tournois.  </p>
        <p>&nbsp;</p>
        <p class="mb-4">N’hésitez pas à acheter ces cosmétiques grâce aux Upcoins si vous souhaitez nous soutenir !</p>
      </div>
  </div></div>
</template>

<style scoped>
.typo {
    font-family: 'Orbitron', sans-serif;
    font-size:20px;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');

.titre-element-bleu {
  font-family: 'Mulish', sans-serif;
  font-size: 50px;
  color: #36C1ED;
  font-weight: 800;
  letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

.titre-element-blanc {
  font-family: 'Mulish', sans-serif;
  font-size: 50px;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

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

@media (min-width: 768px) {
  .flex {
    justify-content: space-between;
  }
}

button:hover {
  background-color: #36C1ED;
  box-shadow: 0 0 20px #36C1ED;
}
</style>
