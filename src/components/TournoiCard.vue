<script setup lang="ts">
import type { TournoiRecord, TournoiResponse } from '@/pocketbase-types';


const props = defineProps<TournoiResponse<any>>();
console.log (`props : `, {...props})

</script>

<template>
    <div class="border border-black mt-16 mb-16"></div>
    <div class="bg-indigo-400">
        <div>
            <p>Nom du tournoi :</p>
            <p class="font-extrabold"> {{ nom }}</p>
        </div>
        <div>
            <p> Jeu :</p>
            <p class="font-extrabold"> {{ jeu }}</p>
        </div>

        <div>
            <p> Type :</p>
            <p class="font-extrabold"> {{ type }}</p>
        </div>
        <div>
            <p> Nombre de joueurs :</p>
            <p class="font-extrabold"> {{ nb_joueurs }}</p>
        </div>
        <div>
            <p> Date :</p>
            <p class="font-extrabold"> {{ date }}</p>
        </div>
    </div>
    <div class="border border-black mt-16 mb-16"></div>

</template>