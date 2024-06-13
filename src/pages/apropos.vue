<script setup lang="ts">
// Ajoutez votre script ici si nécessaire
</script>   

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');

.custom-bg {
  background-color: #1C1A1A;
}

.titre-element-bleu {
    font-family: 'Mulish', sans-serif;
    font-size: 4vw;
    max-font-size: 50px;
    color: #36C1ED;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

.titre-element-blanc {
    font-family: 'Mulish', sans-serif;
    font-size: 4vw;
    max-font-size: 50px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

p, h2, li {
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
}

p, h2 {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}

p {
    margin-bottom: 1em; /* Ajoute un espace entre les paragraphes */
    font-weight: 300;
}

h2 {
    margin-top: 1.5em; /* Ajoute un espace au-dessus des titres */
    margin-bottom: 1em;
    font-weight: bold;
}

li {
    font-weight: 300;
}

@media (min-width: 768px) {
    p, h2 {
        margin-left: 6rem;
        margin-right: 6rem;
    }
}
</style>

<template>
  <div class="custom-bg py-6 container mx-auto px-4 md:px-6">
    <div class="flex items-center justify-center mb-6">
      <div class="bg-white w-full h-[4px] md:w-[360px]"></div>
      <div class="mx-4">
        <h1 class="titre-element-bleu text-center">A PROPOS</h1>
      </div>
      <div class="bg-white w-full h-[4px] md:w-[360px]"></div>
    </div>

    <p class="mb-5">
      Next Up Esport est une société spécialisée dans le gaming et le tournois en ligne. Nous avons comme objectif de développer la culture de l’esport en France, en proposant aux utilisateurs, une plateforme sur laquelle ils peuvent participer et organiser leurs propres tournois sous le format Up & down (montante/descendante). À travers nos services, nous espérons permettre aux joueurs de s’améliorer en se confrontant à des joueurs de tous niveaux, tout au long d’un tournoi à un format compétitif plus permissif qu’un format “arbre de tournoi”. 
      Nous espérons parallèlement, permettre aux organisateurs de tournois de faire le premier pas dans le domaine de l’organisation d’évènements en ligne.
    </p>

    <p>
      Nous prônons des valeurs d’entraide et bienveillance entre la communauté. À travers les affrontements, nous invitons les joueurs à s’entraider et à se conseiller. Nous mettons en place des outils pour permettre aux utilisateurs d’interagir sur notre discord au lien suivant : <a href="https://discord.gg/exemple" class="text-blue-500 underline">https://discord.gg/exemple</a>.
    </p>

    <div class="flex justify-center mt-12">
      <img class="h-40" src="../../public/logoblancUP.webp" alt="Logo Blanc UP" />
    </div>

    <p class="mt-10">
      Next Up Esport est une société spécialisée dans la compétition esport et le développement de la culture esport en France. Elle est composée de trois associés, elle est immatriculée au Registre du Commerce et des Sociétés de XXX sous le numéro XXX XXX XXX, dont le siège social se situe au 46 avenue Villarceau, 25000 BESANÇON.
    </p>
  </div>
</template>
