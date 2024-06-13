<template>
  <div class="classement-card flex items-center justify-between p-4 mx-96">
    <div class="left-rectangle flex items-center">
      <div class="position text-lg font-bold text-[#36C1ED] mr-4">{{ position }}</div>
      <PhotoDeProfil :src="player.avatarUrl" alt="Player Avatar" class="w-10 h-10 rounded-full mr-4" />
      <div class="user-info">
        <p class="text-lg font-400 text-[#AEECFF]">@{{ player.pseudo }}</p>
      </div>
    </div>
    <div class="right-rectangle flex items-center justify-between">
      <p class="text-lg  text-[#36C1ED] mr-8">Nombre de victoires</p>
      <p class="text-lg  text-[#FFFFFF]">{{ player.victoires }}</p>
    </div>
  </div>
</template>

<script setup>
import PhotoDeProfil from '@/components/icons/PhotoDeProfil.vue';
import { defineProps } from 'vue';

defineProps({
  player: Object,
  position: Number
});
</script>

<style scoped>
.classement-card {
  background-color: #292929;
  color: #FFFFFF;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-rectangle {
  display: flex;
  align-items: center;
}

.right-rectangle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.titre-element-bleu {
    font-family: 'Mulish', sans-serif;
    font-size:50px;
    color: #36C1ED;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

.titre-element-blanc {
    font-family: 'Mulish', sans-serif;
    font-size:50px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}
</style>
