<script setup lang="ts">
import { ref } from 'vue'
import { signUp } from '@/backend'

const pseudoRiot = ref('')
const mail = ref('')
const pseudoNextUp = ref('')
const mdp = ref('')

const handleSignUp = async () => {
  try {
    const newUtil = {
      id_riot: pseudoRiot.value,
      mail: mail.value,
      pseudo: pseudoNextUp.value,
      mdp: mdp.value,
    }
    
    await signUp(newUtil)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <h1>Inscription</h1>
  <p>
    <label>Pseudo Riot</label>
    <input type="text" placeholder="Pseudo Riot" class="ml-5" v-model="pseudoRiot">
  </p>
  <p>
    <label>Adresse Mail</label>
    <input type="email" placeholder="Adresse mail" class="ml-5" v-model="mail">
  </p>
  <p>
    <label>Pseudo Next Up</label>
    <input type="text" placeholder="Pseudo Next Up" class="ml-5" v-model="pseudoNextUp">
  </p>
  <p>
    <label>Mot de passe</label>
    <input type="password" minlength="1" placeholder="Mot de passe" class="ml-5" v-model="mdp">
  </p>
  <button @click="handleSignUp" class="bg-slate-400">S'inscrire</button>
</template>