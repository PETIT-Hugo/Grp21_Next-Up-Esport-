<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <h1 class="text-6xl font-bold text-red-500">404</h1>
    <p class="text-2xl text-gray-700 mt-4 mb-8">Désolé, la page que vous cherchez n'existe pas.</p>
    <router-link to="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
</style>
