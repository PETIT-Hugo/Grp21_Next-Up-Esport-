import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase('https://next-up-esport.petit-hugommi1.fr:443')

// Copier ici les fonctions developpées en R214 | Système d'information

export async function signUp(newUser: any) {
  try {
    const record = await pb.collection('utilisateur').create(newUser)
    return record
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    throw error
  }
}

export async function checkIfUserExists(field: string, value: string): Promise<boolean> {
  try {
    const result = await pb.collection('utilisateur').getFirstListItem(`${field}="${value}"`)
    return !!result
  } catch (error) {
    if ((error as any).status === 404) {
      return false
    }
    console.error("Erreur lors de la vérification de l'utilisateur:", error)
    throw error
  }
}
