import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase('https://next-up-esport.petit-hugommi1.fr:443')

// Copier ici les fonctions developpées en R214 | Système d'information

export async function signUp(newUtilisateur) {
    await pb.collection('maison').create();
}
