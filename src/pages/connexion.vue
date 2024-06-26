<script setup lang="ts">
import { ref } from 'vue';
import { signIn } from '@/backend';
import { useAuthStore } from '@/store/auth';
import type { UtilisateurResponse } from '@/pocketbase-types';

const props = defineProps<UtilisateurResponse>();

const identifier = ref('');
const mdp = ref('');
const statusMessage = ref('Veuillez vous connecter');
const authStore = useAuthStore();

const handleSignIn = async () => {
  try {
    if (!identifier.value || !mdp.value) {
      statusMessage.value = 'Veuillez remplir tous les champs.';
      return;
    }

    const user = await signIn(identifier.value, mdp.value);
    statusMessage.value = `Connexion réussie, bienvenue ${user.pseudo} !`;
    authStore.setCurrentUserId(user.id);
    authStore.setUpcoins(user.upcoins); // Ajouter cette ligne pour définir les upcoins
    console.log('User ID set:', user.id); 
  } catch (e: any) {
    console.error(e);
    if (e.name === "UserNotFoundError") {
      statusMessage.value = "Aucun utilisateur trouvé avec cette adresse mail";
    } else if (e.name === "IncorrectPasswordError") {
      statusMessage.value = "Mot de passe incorrect.";
    } else {
      statusMessage.value = 'Erreur lors de la connexion, veuillez vérifier vos informations.';
    }
  }
}

</script>

<template>
  <div class="custom-bg">
    <div class="mx-4 justify-center flex">
      <h1 class="titre-element-bleu">Se connecter<span class="titre-element-blanc"> à NextUp E-Sport</span></h1>
    </div>
    <div class="justify-center mx-4 flex">
      <p class="menu-element">Bienvenue sur NextUp E-Sport ! Indiquer ci-dessous vos informations de connexion pour accéder au site.</p>
    </div>
  </div>
  <div class="custom-bg flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <p>
      <label class="text-[#7C7C7C] typo">Pseudo ou Courriel</label>
      <input type="text" placeholder="exemple@abc.fr" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="identifier">
    </p>
    <p class="mt-8">
      <label class="text-[#7C7C7C] typo">Mot de passe</label>
      <input type="password" minlength="1" placeholder="Mot de passe" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="mdp">
    </p>
    <button @click="handleSignIn" class="bg-[#36C1ED] mt-8 text-white hover:text-gray-300 rounded-md px-10 py-4 creer_un_compte typo">Se connecter</button>
    <label id="status" class="block mt-4 text-white" v-text="statusMessage"></label>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

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
  font-weight: bold;
}

.menu-element-upcoins {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  color: #36C1ED;
  font-weight: bold;
}

.typo {
  font-family: 'Orbitron', sans-serif;
}
</style>