<script setup lang="ts">
import { ref } from 'vue'
import { signIn } from '@/backend'

const mail = ref('')
const mdp = ref('')
const identifier = ref('')
const statusMessage = ref('Veuillez vous connecter')

const handleSignIn = async () => {
  try {
    if (!identifier.value || !mdp.value) {
      statusMessage.value = 'Veuillez remplir tous les champs.';
      return;
    }

    const user = await signIn(identifier.value, mdp.value);
    statusMessage.value = `Connexion réussie, bienvenue ${user.pseudo} !`;
  } catch (e: any) {
    console.error(e);
    if (e.name === "UserNotFoundError") {
      statusMessage.value = "Aucun utilisateur trouvé avec cette adresse mail ou ce pseudo.";
    } else if (e.name === "IncorrectPasswordError") {
      statusMessage.value = "Mot de passe incorrect.";
    } else {
      statusMessage.value = 'Erreur lors de la connexion, veuillez vérifier vos informations.';
    }
  }
}

</script>

<template>
      <div>
    <h1>Connexion</h1>
    <p>
      <label>Pseudo ou Courriel</label>
      <input type="email" placeholder="exemple@abc.fr" class="ml-5" v-model="identifier">
    </p>
    <p>
      <label>Mot de passe</label>
      <input type="password" minlength="1" placeholder="Mot de passe" class="ml-5" v-model="mdp">
    </p>
    <button @click="handleSignIn" class="bg-slate-400">Se connecter</button>
    <label id="status" v-text="statusMessage"></label>
  </div>
    
</template>