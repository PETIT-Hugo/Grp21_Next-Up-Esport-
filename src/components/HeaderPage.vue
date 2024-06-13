<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import LogoNextUp from './icons/LogoNextUp.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.uppercase-title {
  font-family: 'Mulish', sans-serif;
  font-weight: 700; /* Gras */
}

.elements-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 200; 
  font-size: 12.5px;
  color: #7C7C7C;
}

.menu-element {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  color: #FFFFFF;
}
</style>

<template>
  <header class="bg-[#1C1A1A] py-4 md:py-6">
    <div class="container mx-auto flex items-center justify-between px-4 md:px-6">
      <RouterLink to="/" class="flex items-center">
        <img src="../components/icons/nextupfinal.webp" class="w-[30vw] max-w-[200px] min-w-[150px] mr-4" />
      </RouterLink>
      <nav class="relative flex items-center justify-center flex-grow md:flex-none md:w-1/2">
        <!-- Menu for desktop -->
        <ul class="hidden md:flex md:gap-16">
          <li><RouterLink to="/apropos" class="text-white hover:text-gray-300 menu-element">À propos</RouterLink></li>
          <li><RouterLink to="/connexion" class="text-white hover:text-gray-300 menu-element">Connexion</RouterLink></li>
          <!-- Cadre bleu agrandi autour du bouton "Inscription" -->
          <button><RouterLink to="/inscription" class="text-white hover:text-gray-300 menu-element bg-[#36C1ED] rounded-md px-10 py-4">Inscription</RouterLink></button>
        </ul>
        <!-- Burger menu icon for mobile -->
        <div class="md:hidden flex items-center ml-auto" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#36C1ED] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16" />
          </svg>
        </div>
      </nav>
    </div>
    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="fixed inset-0 bg-[#1C1A1A] z-50 flex justify-center items-center">
      <svg @click="toggleMenu" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 absolute top-4 right-4 text-[#36C1ED] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <ul class="text-white text-center">
        <li class="py-4 border-b border-gray-700"><RouterLink to="/apropos" @click="toggleMenu">À propos</RouterLink></li>
        <li class="py-4 border-b border-gray-700"><RouterLink to="/connexion" @click="toggleMenu">Connexion</RouterLink></li>
        <li class="py-4"><RouterLink to="/inscription" @click="toggleMenu">Inscription</RouterLink></li>
      </ul>
    </div>
  </header>
  <div class="w-full h-0.5 bg-[#353535] opacity-5"></div> <!-- Barre blanche -->
</template>
