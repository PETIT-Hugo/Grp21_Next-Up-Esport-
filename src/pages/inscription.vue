<script setup lang="ts">
import { ref } from 'vue'
import { signUp } from '@/backend'

// Utiliser des refs pour les champs de saisie
const pseudoRiot = ref('')
const pseudo = ref('')
const mail = ref('')
const mdp = ref('')

const handleSignUp = () => {
  const newUtil = {
    id_riot: pseudoRiot.value,
    pseudo: pseudo.value,
    mail: mail.value,
    mdp: mdp.value,
    upcoins: 0,
    victoires: 0,
  }
  signUp(newUtil)
}

</script>

<template>
  <h1>Inscription</h1>
  <div>
    <p>
      <label>Pseudo Riot</label>
      <input type="text" v-model="pseudoRiot" placeholder="Pseudo Riot" class="ml-5">
    </p>
    <p>
      <label>Tagline</label>
      <input type="text" id="tagline" placeholder="Tagline Riot" class="ml-5">
    </p>
    <p>
      <label>Pseudo (affiché sur le site)</label>
      <input type="text" v-model="pseudo" placeholder="Pseudo Nextup" class="ml-5">
    </p>
    <p>
      <label>Mail</label>
      <input type="email" v-model="mail" placeholder="Adresse mail" class="ml-5">
    </p>
    <p>
      <label>Mot de passe</label>
      <input type="password" v-model="mdp" placeholder="Mot de passe" class="ml-5">
    </p>
    <p>
      <label>Confirmer le mot de passe</label>
      <input type="password" id="mdp2" placeholder="Confirmer mot de passe" class="ml-5"/>
    </p>
  </div>
  <button @click="handleSignUp" class="bg-slate-400">S'inscrire</button>
</template>