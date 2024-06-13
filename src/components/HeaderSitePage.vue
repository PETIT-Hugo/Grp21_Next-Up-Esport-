<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import LogoNextUp from './icons/LogoNextUp.vue';
import UpCoin from './icons/UpCoin.vue';
import PhotoDeProfil from './icons/PhotoDeProfil.vue';
import FlecheBleu from './icons/FlecheBleu.vue';
import { logout } from '@/services/authService'; 
import { useAuthStore } from '@/store/auth'; // Importer le store

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const upcoins = computed(() => authStore.getUpcoins.value); // Ajouter cette ligne

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
  logout();
  console.log('User logged out'); 
};
</script>

<template>
  <header class="bg-[#1C1A1A] py-4 md:py-6">
    <div class="container mx-auto flex items-center justify-between px-4 md:px-6">
      <RouterLink to="/" class="flex items-center">
        <LogoNextUp class="w-[30vw] max-w-[300px] min-w-[150px] mr-4" />
      </RouterLink>
      <nav class="relative flex items-center justify-center flex-grow md:flex-none md:w-3/5">
        <!-- Menu for desktop -->
        <ul class="hidden md:flex md:gap-16">
          <li><RouterLink to="/apropos" class="text-white hover:text-gray-300 menu-element">Mes tournois</RouterLink></li>
          <li><RouterLink to="/connexion" class="text-white hover:text-gray-300 menu-element">Classement</RouterLink></li>
          <li><RouterLink to="/Boutique" class="text-white hover:text-gray-300 menu-element">Boutique</RouterLink></li>
        </ul>
        <ul class="hidden md:flex md:gap-16 ml-12">
          <UpCoin class="w-12 h-12" />
        </ul>
        <ul class="hidden md:flex md:gap-16">
          <li><div class="text-[#36C1ED] menu-element-upcoins">{{ upcoins }}</div></li>
        </ul>
        <div class="relative flex items-center ml-12"> <!-- Ajout de marge à gauche ici -->
          <PhotoDeProfil class="w-12 h-12" />
          <div @click="toggleDropdown" class="cursor-pointer">
            <FlecheBleu class="w-12 h-12" />
          </div>
          <!-- Menu déroulant pour la déconnexion -->
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute right-0 mt-20 w-48 bg-[#292929] rounded-md shadow-lg z-50">
              <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-white hover:bg-red-500 rounded-md">Se déconnecter</button>
            </div>
          </transition>
        </div>
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
        <li class="py-4 border-b border-gray-700"><RouterLink to="/MesTournois" @click="toggleMenu">Mes tournois</RouterLink></li>
        <li class="py-4 border-b border-gray-700"><RouterLink to="/connexion" @click="toggleMenu">Classement</RouterLink></li>
        <li class="py-4"><RouterLink to="/Boutique" @click="toggleMenu">Boutique</RouterLink></li>
        <!-- Bouton de déconnexion mobile -->
        <li class="py-4"><button @click="handleLogout" class="text-white bg-red-500 rounded-md px-4 py-2">Se déconnecter</button></li>
      </ul>
    </div>
  </header>
</template>
