import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase('https://next-up-esport.petit-hugommi1.fr:443')



// Page inscription

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


// Page connexion

class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundError'
  }
}

class IncorrectPasswordError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'IncorrectPasswordError'
  }
}

export async function signIn(mail: string, mdp: string) {
  try {
    const user = await pb.collection('utilisateur').getFirstListItem(`mail="${mail}"`)

    if (!user) {
      throw new UserNotFoundError('Utilisateur non trouvé')
    }

    if (user.mdp !== mdp) {
      throw new IncorrectPasswordError('Mot de passe incorrect')
    }

    return user
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    throw error
  }
}