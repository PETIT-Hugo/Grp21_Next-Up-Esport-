<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FlecheIcon from './icons/FlecheIcon.vue';
import LogoNextUp from './icons/LogoNextUp.vue';
import DiscordLogo from './icons/DiscordLogo.vue';
import InstagramLogo from './icons/InstagramLogo.vue';
import TwitterLogo from './icons/TwitterLogo.vue';
</script>

<style>
.custom-bg {
  background-color: #1C1A1A;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.uppercase-title {
  font-family: 'Mulish', sans-serif;
  font-weight: 700; /* Gras */
}

.elements-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 200; 
  font-size: 12.5px;
  color:#7C7C7C;
}
</style>

<template>
  <footer class="custom-bg py-6 container">
    <div class="border border-white mt-16 mb-16"></div>
    <div class="mx-auto px-12">
    <!-- Elements de la partie gauche de la pages -->
      <!-- Footer Content -->
      <div class="flex justify-start items-start space-x-8">
        <!-- Mentions Légales -->
        <div class="w-2/8">
          <h3 class="text-white mb-1 uppercase-title">MENTIONS LÉGALES</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/conditionsVentes" class="text-white hover:text-gray-300 elements-title">Conditions générales de ventes</RouterLink></li>
            <li><RouterLink to="/conditionsUtilisation" class="text-white hover:text-gray-300 elements-title">Conditions générales d’utilisation</RouterLink></li>
            <li><RouterLink to="/politiqueConfidentialite" class="text-white hover:text-gray-300 elements-title">Politique de confidentialité</RouterLink></li>
            <li><RouterLink to="/Cookies" class="text-white hover:text-gray-300 elements-title">Cookies</RouterLink></li>
          </ul>
        </div>
        <!-- Nous Contacter -->

        <div class="w-2/8">
        <h3 class="text-white mb-1 uppercase-title">NOUS CONTACTER</h3>
        <ul class="space-y-2">
            <li><RouterLink to="#" class="text-white hover:text-gray-300 elements-title">contact@nextup-esport.com</RouterLink></li>
            <li class="flex items-center">
            <TwitterLogo class="mr-2 hover:text-gray-300" /> <!-- Ajout de l'effet hover -->
            <InstagramLogo class="mx-2 hover:text-gray-300" /> <!-- Ajout de l'effet hover -->
            <DiscordLogo class="ml-2 hover:text-gray-300" /> <!-- Ajout de l'effet hover -->
            </li>
        </ul>
        </div>

        <!-- Découvrir -->
        <div class="w-2/8">
          <h3 class="text-white mb-1 uppercase-title">DÉCOUVRIR</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/apropos" class="text-white hover:text-gray-300 elements-title">À propos</RouterLink></li>
          </ul>
        </div>
    </div>

<!-- Elements de la partie droite de la pages -->
    
    
      <div class="flex justify-end">
        <img src="../components/icons/nextupfinal.webp" class="w-[30vw] max-w-[200px] min-w-[150px] mr-4" />
      </div>
      <!-- Flèche SVG et texte de droits d'auteur -->
      <div class="flex items-center justify-end text-sm text-white mt-4 uppercase-title">
        <FlecheIcon/> <!-- Inclusion de la flèche SVG -->
        <span class="ml-2">© 2024 NextUp E-sport</span>
      </div>
    </div>
  </footer>
</template>
