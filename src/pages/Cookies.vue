<script setup lang="ts">
// Aucun script n'est nécessaire pour ce cas statique.
</script>   

<template>
  <div class="custom-bg py-6 container mx-auto">
    <div class="flex items-center justify-center mx-4 md:mx-12">
      <div class="bg-white w-20 md:w-[460px] h-1 md:h-[4px]"></div>
      <div class="mx-2 md:mx-12">
        <h1 class="titre-element-bleu">COOKIES</h1>
      </div>
      <div class="bg-white w-20 md:w-[460px] h-1 md:h-[4px]"></div>
    </div>

    <h2 class="mt-6 mb-4 text-white mx-4 md:mx-24 font-roboto">Vous pouvez modifier votre consentement vis-à-vis de l’utilisation des cookies sur le site via cette page. En décochant la case suivante, vous êtes conscient que cela peut bloquer l’accès à certaines fonctionnalités lors de votre navigation sur le site. Vous vous tenez donc pleinement responsable de toute modification négative de votre expérience sur le site.</h2>

    <div class="flex flex-col md:flex-row items-start mx-4 md:mx-24"> <!-- Espace pour la case a cocher -->
      <input type="checkbox" id="accept-cookies" class="mt-3 appearance-none h-6 w-8 border-2 border-gray-300 rounded-md checked:bg-[#36C1ED] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white">
      <label for="accept-cookies" class="text-white font-roboto ml-2 md:ml-4">
        J’accepte l’utilisation de cookies non-essentiels lors de ma navigation sur le site. Si je ne coche pas la case, je suis conscient que certaines fonctionnalités du site puissent être bloquées, et que, en conséquence, mon expérience sur le site puisse être altérée négativement.
      </label>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:wght@100..900&display=swap');

.custom-bg {
  background-color: #1C1A1A;
}

.titre-element-bleu {
  font-family: 'Mulish', sans-serif;
  font-size: 6vw; /* Responsive font size */
  max-font-size: 50px;
  color: #36C1ED;
  font-weight: 800;
  letter-spacing: -2px; /* Espacement des lettres de -4% */
}

.titre-element-blanc {
  font-family: 'Mulish', sans-serif;
  font-size: 6vw; /* Responsive font size */
  max-font-size: 50px;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -2.5px; /* Espacement des lettres de -4% */
}

p {
  margin-bottom: 1em; /* Ajoute un espace entre les paragraphes */
  color: #ffffff;
  margin-left: 1rem;
  margin-right: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 4vw; /* Responsive font size */
  max-font-size: 20px;
}

h2 {
  margin-top: 1.5em; /* Ajoute un espace au-dessus des titres */
  margin-bottom: 1em;
  color: #ffffff;
  margin-left: 1rem;
  margin-right: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: auto;
  font-size: 5vw; /* Responsive font size */
  max-font-size: 28px;
}

li {
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 4vw; /* Responsive font size */
  max-font-size: 20px;
}

ul {
  margin-left: 1rem;
  margin-right: 1rem;
}

@media (min-width: 768px) {
  p, li {
    margin-left: 6rem;
    margin-right: 6rem;
    font-size: 20px; /* Reset font size for larger screens */
  }

  h2 {
    margin-left: 6rem;
    margin-right: 6rem;
    font-size: 28px; /* Reset font size for larger screens */
  }

  ul {
    margin-left: 6rem;
    margin-right: 6rem;
  }
}
</style>
