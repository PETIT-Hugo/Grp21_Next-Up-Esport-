<script setup lang="ts">
import { ref } from 'vue'
import { signUp, checkIfUserExists } from '@/backend'

const pseudoRiot = ref('')
const mail = ref('')
const pseudoNextUp = ref('')
const mdp = ref('')
const confirmMdp = ref('')
const statusMessage = ref('Inscrivez-vous dès maintenant !')

const termes = ref(false)
const majeur = ref(false)
const newsletter = ref(false)

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

        if (!termes.value) {
      statusMessage.value = 'Vous devez accepter les conditions d\'utilisation.'
      return
    }

    if (!majeur.value) {
      statusMessage.value = 'Vous devez avoir plus de 18 ans pour utiliser NextUp Esport.'
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

<style>
.typo {
  font-family: 'Orbitron', sans-serif;
}

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
          <h1 class="titre-element-bleu">Inscrivez-vous<span class="titre-element-blanc"> sur NextUp E-Sport</span></h1>
          </div>
          <div class="justify-center mx-4 flex">
            <p class="sous-titre-element">L’aventure commence ici. Indiquer votre pseudonyme Riot Games (trouvable sur le site de Riot Games) et créez un compte. </p>
          </div>
          
    
    <div class="custom-bg  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <p>
        <label class="text-[#7C7C7C] typo">Pseudo Riot</label>
        <input type="text" id="pseudoRiot" placeholder="exemple#EUW*" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4  placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="pseudoRiot">
      </p>
      <p class="mt-6">
        <label class="text-[#7C7C7C] typo">Adresse Mail</label>
        <input type="email" placeholder="exemple@abc.fr*" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4  placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="mail">
      </p>
      <p class="mt-6">
        <label class="text-[#7C7C7C] typo">Pseudo Next Up</label>
        <input type="text" placeholder="Votre pseudo*" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4  placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="pseudoNextUp">
      </p>
      <p class="mt-6">
        <label class="text-[#7C7C7C] typo">Mot de passe</label>
        <input type="password" minlength="1" placeholder="strongMDP123*"  class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4  placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  v-model="mdp">
      </p>
      <p class="mt-6">
        <label class="text-[#7C7C7C] typo">Confirmer le mot de passe</label>
        <input type="password" minlength="1" placeholder="strongMDP123*" class="appearance-none bg-[#292929] rounded-none relative block w-full px-16 py-4  placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" v-model="confirmMdp">
      </p>
    </div>
    <div class="flex flex-col margin justify-center">

    <p class="flex items-center mb-3">
        <input type="checkbox" id="accept-cookies" class="mr-2 appearance-none h-6 w-6 border-2 border-gray-300 rounded-md checked:bg-[#36C1ED] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white" v-model="termes">
        <label for="accept-cookies" class="text-white font-roboto largeur">J’accepte les Conditions générales d’utilisation et la Politique de confidentialité.*</label>
    </p>
    <p class="flex items-center mb-3">
        <input type="checkbox" id="majeur" class="mr-2 appearance-none h-6 w-6 border-2 border-gray-300 rounded-md checked:bg-[#36C1ED] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white" v-model="majeur">
        <label for="majeur" class="text-white font-roboto largeur">Je certifie être âgé d’au moins 18 ans.*</label>
    </p>
    <p class="flex items-center mb-3">
        <input type="checkbox" id="newsletter" class="mr-2 appearance-none h-6 w-6 border-2 border-gray-300 rounded-md checked:bg-[#36C1ED] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white" v-model="newsletter">
        <label for="newsletter" class="text-white font-roboto largeur">Je souhaite recevoir des e-mails promotionnels sur les actualités de NextUp E-Sport.</label>
    </p>
</div>


      
  <body class="flex  justify-center">
  <div class="text-center mt-6">
    <button @click="handleSignUp" class="bg-[#36C1ED] text-white hover:text-gray-300 rounded-md px-10 py-4 creer_un_compte">
      Créer un compte
    </button>
    <label id="status" class="block mt-4 text-white" v-text="statusMessage"></label>
  </div>
</body>
  </div>
</template>