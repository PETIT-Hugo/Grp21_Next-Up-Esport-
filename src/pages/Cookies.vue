<script setup lang="ts">

</script>   

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.custom-bg {
  background-color: #1C1A1A;
}

.titre-element-bleu {
    font-family: 'Mulish', sans-serif;
    font-size:50px;
    color: #36C1ED;
    font-weight: 800;
    letter-spacing: -2px; /* Espacement des lettres de -4% */

}

.titre-element-blanc {
    font-family: 'Mulish', sans-serif;
    font-size:50px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -2.5px; /* Espacement des lettres de -4% */

}

p {
            margin-bottom: 1em; /* Ajoute un espace entre les paragraphes */
            color: #ffffff;
            margin-left:6rem;
            margin-right:6rem;
            font-family:'Roboto', sans-serif;
            font-weight:300;
        }

h2 {
            margin-top: 1.5em; /* Ajoute un espace au-dessus des titres */
            margin-bottom: 1em;
            font-size:28px;
            color: #ffffff;
            margin-left:6rem;
            margin-right:6rem;
            font-family:'Roboto', sans-serif;
            font-weight:auto;
        }

li {
    color: #ffffff;
    font-family:'Roboto', sans-serif;
    font-weight:300;
}
</style>

<template>
    <div class="custom-bg py-6 container mx-auto">
        <div class="flex items-center justify-center">
            <div class="bg-white w-[460px] h-[4px]"></div>
                <div class="mx-12">
                    <h1 class="titre-element-bleu">COOKIES</h1>
                </div>
            <div class="bg-white w-[460px] h-[4px]"></div>
        </div>

        <h2 class="mt-6 mb-4 text-[28px] text-white mx-24 font-roboto">Vous pouvez modifier votre consentement vis-à-vis de l’utilisation des cookies sur le site via cette page. En décochant la case suivante, vous êtes conscient que cela peut bloquer l’accès à certaines fonctionnalités lors de votre navigation sur le site. Vous vous tenez donc pleinement responsable de toute modificaiton négative de votre expérience sur le site.</h2>

        <div class="flex items-start mx-24"> <!-- Espace pour la case a cocher -->
            <input type="checkbox" id="accept-cookies" class="mt-3 appearance-none h-6 w-8 border-2 border-gray-300 rounded-md checked:bg-[#36C1ED] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-white">
            <label for="accept-cookies" class="text-white font-roboto ml-2">
                J’accepte l’utilisation de cookies non-essentiels lors de ma navigation sur la site. Si je ne coche pas la case, je suis conscient que certaines fonctionnalités du site puissent et être bloquées, et que, en conséquence, mon expérience sur le site puisse être altérée négativement.
            </label>
        </div>
        
    </div>
</template>