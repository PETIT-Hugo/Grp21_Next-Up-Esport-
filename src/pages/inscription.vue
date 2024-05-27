<script setup lang="ts">
import { ref } from 'vue'
import { signUp, checkIfUserExists } from '@/backend'

const pseudoRiot = ref('')
const mail = ref('')
const pseudoNextUp = ref('')
const mdp = ref('')
const confirmMdp = ref('')
const statusMessage = ref('Inscrivez-vous dès maintenant !')

const validatePseudoRiot = (pseudo: string): boolean => {
  const riotRegex = /^[a-zA-Z0-9-]+#[A-Z0-9]{3,5}$/
  return riotRegex.test(pseudo)
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePseudoNextUp = (pseudo: string): boolean => {
  const noSpaceRegex = /^\S+$/
  return noSpaceRegex.test(pseudo)
}

const validatePasswords = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword
}


const handleSignUp = async () => {
  try {
    if (!validatePseudoRiot(pseudoRiot.value)) {
      statusMessage.value = 'L\'identifiant Riot doit être de la forme Pseudo#EX123.'
      return
    }

    if (!validateEmail(mail.value)) {
      statusMessage.value = 'Le format de l\'adresse mail est invalide.'
      return
    }

      if (!validatePseudoNextUp(pseudoNextUp.value)) {
      statusMessage.value = 'Le pseudo Next Up ne doit pas contenir d\'espaces.'
      return
    }

      if (!validatePasswords(mdp.value, confirmMdp.value)) {
      statusMessage.value = 'Les mots de passe ne correspondent pas.'
      return
    }

    const pseudoExists = await checkIfUserExists('pseudo', pseudoNextUp.value)
    const mailExists = await checkIfUserExists('mail', mail.value)
    const riotExists = await checkIfUserExists('id_riot', pseudoRiot.value)

    if (riotExists) {
      statusMessage.value = 'Un compte est déjà lié à ce pseudo Riot.'
      return
    }
    
    if (pseudoExists) {
      statusMessage.value = 'Ce pseudo NextUp est déjà utilisé.'
      return
    }
    
    if (mailExists) {
      statusMessage.value = 'Cette adresse mail est déjà utilisée.'
      return
    }
    
    const newUtil = {
      id_riot: pseudoRiot.value,
      mail: mail.value,
      pseudo: pseudoNextUp.value,
      mdp: mdp.value,
    }
    
    await signUp(newUtil)
    statusMessage.value = 'Inscription réussie, bienvenue sur NextUp Esport !' 
  } catch (e) {
    console.error(e)
    statusMessage.value = 'Erreur lors de l\'inscription.' 
  }
}
</script>

<template>
  <h1>Inscription</h1>
  <p>
    <label>Pseudo Riot</label>
    <input type="text" placeholder="exemple#EUW" class="ml-5" v-model="pseudoRiot">
  </p>
  <p>
    <label>Adresse Mail</label>
    <input type="email" placeholder="exemple@abc.fr" class="ml-5" v-model="mail">
  </p>
  <p>
    <label>Pseudo Next Up</label>
    <input type="text" placeholder="Votre pseudo" class="ml-5" v-model="pseudoNextUp">
  </p>
  <p>
    <label>Mot de passe</label>
    <input type="password" minlength="1" placeholder="strongMDP123" class="ml-5" v-model="mdp">
  </p>
  <p>
    <label>Confirmer le mot de passe</label>
    <input type="password" minlength="1" placeholder="strongMDP123" class="ml-5" v-model="confirmMdp">
  </p>
  <button @click="handleSignUp" class="bg-slate-400">S'inscrire</button>
  <label id="status" v-text="statusMessage"></label>
</template>