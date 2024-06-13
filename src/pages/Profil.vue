<template>
  <div class="bg-[#1C1A1A] pb-16 min-h-screen text-white">
    <div class="container mx-auto p-4 flex flex-col items-start">
      <div class="flex justify-between w-full items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Profil de <span class="text-[#36C1ED]">{{ user.pseudo }}</span></h1>
          <p class="mb-2 typo">{{ user.victoires }} victoires</p>
        </div>
        <PhotoDeProfil :src="user.avatarUrl" alt="Photo de profil" class="w-20 h-20 rounded-full" />
      </div>
      <h2 class="text-2xl font-bold mb-4 text-[#36C1ED]">SETUP UTILISÉ</h2>
      <form @submit.prevent="updateUser" class="w-full">
        <div class="mb-4">
          <label for="souris" class="block text-sm font-medium typo">Souris actuelle : <span class="text-[#36C1ED]">{{ user.souris }}</span></label>
          <input id="souris" v-model="user.souris" type="text" class="input" />
        </div>
        <div class="mb-4">
          <label for="clavier" class="block text-sm font-medium typo">Clavier actuel : <span class="text-[#36C1ED]">{{ user.clavier }}</span></label>
          <input id="clavier" v-model="user.clavier" type="text" class="input" />
        </div>
        <div class="mb-4">
          <label for="casque" class="block text-sm font-medium typo">Casque actuel : <span class="text-[#36C1ED]">{{ user.casque }}</span></label>
          <input id="casque" v-model="user.casque" type="text" class="input" />
        </div>
        <button type="submit" class="btn">Mettre à jour</button>
      </form>
      <button @click="deleteUserProfile" class="btn-delete mt-4">Supprimer le profil</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserDetails, updateUserDetails, deleteUser } from '@/backend.ts';
import { useRouter } from 'vue-router';
import PhotoDeProfil from '@/components/icons/PhotoDeProfil.vue';

const user = ref({
  pseudo: '',
  victoires: 0,
  souris: '',
  clavier: '',
  casque: '',
  avatarUrl: '' // Assurez-vous d'avoir ce champ dans votre utilisateur
});

// Remplacez cet ID par un ID valide de votre base de données pour tester
const userId = '55lk2zwc5c27bkm'; // Remplacez par l'ID de l'utilisateur connecté
const router = useRouter();

const fetchUserDetails = async () => {
  try {
    console.log('Current User ID:', userId);
    const userDetails = await getUserDetails(userId);
    user.value = userDetails;
    console.log('Fetched user details:', user.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'utilisateur', error);
  }
};

const updateUser = async () => {
  try {
    console.log('Détails de l\'utilisateur à mettre à jour:', user.value);
    await updateUserDetails(userId, {
      souris: user.value.souris,
      clavier: user.value.clavier,
      casque: user.value.casque
    });
    alert('Informations mises à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des détails de l\'utilisateur', error);
    alert('Erreur lors de la mise à jour des informations');
  }
};

const deleteUserProfile = async () => {
  try {
    await deleteUser(userId);
    alert('Profil supprimé avec succès');
    router.push('/'); // Redirige vers la page d'accueil après la suppression
  } catch (error) {
    console.error('Erreur lors de la suppression du profil', error);
    alert('Erreur lors de la suppression du profil');
  }
};

onMounted(() => {
  fetchUserDetails();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  background-color: #333;
  border: 1px solid #444;
  color: #fff;
}

.typo {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #36C1ED;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem; /* Arrondir les bords */
  transition: background-color 0.3s;
  font-family: 'Orbitron', sans-serif;
}

.btn:hover {
  background-color: #2597c5;
}

.btn-delete {
  padding: 0.5rem 1rem;
  background-color: #cf1010;
  color: #fff;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Orbitron', sans-serif;
}

.btn-delete:hover {
  background-color: #e9352e;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
