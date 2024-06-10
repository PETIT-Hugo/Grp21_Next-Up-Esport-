<script setup lang="ts">
import { ref } from 'vue';
import { signIn } from '@/backend';
import { useAuthStore } from '@/store/auth';

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

<style>
.custom-bg {
  background-color: #1C1A1A;
}

.titre-element-bleu {
    font-family: 'Mulish', sans-serif;
    font-size:40px;
    color: #36C1ED;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */

}

.titre-element-blanc {
    font-family: 'Mulish', sans-serif;
    font-size:40px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */

}

.sous-titre-element {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #ffffff;
    font-weight:200;
}

.margin {
    margin-left: 550px;
}

.largeur {
    width: 450px;
}

.creer_un_compte {
    font-family: 'Orbitron', sans-serif;
    font-size:20px;
    color: #FFFFFF;
}

</style>

<template>
  
  <div class="custom-bg">
        <div class="mx-4 justify-center flex">
          <h1 class="titre-element-bleu">Se connecter<span class="titre-element-blanc"> à NextUp E-Sport</span></h1>
          </div>
          <div class="justify-center mx-4 flex">
            <p class="sous-titre-element">Bienvenue sur NextUp E-Sport ! Indiquer ci-dessous vos informations de connexion pour accéder au site.</p>
          </div>
          </div>
  <div class="custom-bg  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    
    <p>
      <label class="text-[#7C7C7C]">Pseudo ou Courriel</label>
      <input type="text" placeholder="exemple@abc.fr" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4  placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="identifier">
    </p>
    <p>
      <label class="text-[#7C7C7C]">Mot de passe</label>
      <input type="password" minlength="1" placeholder="Mot de passe" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4  placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="mdp">
    </p>
    <button @click="handleSignIn" class="bg-[#36C1ED] text-white hover:text-gray-300 rounded-md px-10 py-4 creer_un_compte mt-4">Se connecter</button>
    <label id="status" class="block mt-4 text-white" v-text="statusMessage"></label>
  </div>
</template>