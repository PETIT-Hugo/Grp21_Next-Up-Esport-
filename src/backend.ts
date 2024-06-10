import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase('https://nextupesport.petit-hugommi1.fr:443')

// Page d'accueil
export async function getAllTournois() {
  try {
    const records = await pb.collection('tournoi').getFullList()
    return records
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois', error)
    throw error
  }
}

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

export async function signIn(identifier: string, mdp: string) {
  try {
    let user

    try {
      user = await pb.collection('utilisateur').getFirstListItem(`mail="${identifier}"`)
    } catch (error: any) {
      if (error.status === 404) {
        try {
          user = await pb.collection('utilisateur').getFirstListItem(`pseudo="${identifier}"`)
        } catch (error: any) {
          if (error.status === 404) {
            throw new UserNotFoundError('Utilisateur non trouvé')
          } else {
            throw error
          }
        }
      } else {
        throw error
      }
    }

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

// Creation de tournois
export async function createTournament(tournamentData: {
  name: string
  userId: string
  jeu: string
  nb_joueurs: number
  nb_manches: number
  date: string
  type: string
  manche_actuelle: number
  officiel: boolean
  description: string
}) {
  try {
    console.log('Données du tournoi à envoyer:', tournamentData)

    if (
      !tournamentData.name ||
      !tournamentData.userId ||
      !tournamentData.jeu ||
      !tournamentData.nb_joueurs ||
      !tournamentData.nb_manches ||
      !tournamentData.date ||
      !tournamentData.type ||
      typeof tournamentData.manche_actuelle !== 'number' ||
      typeof tournamentData.officiel !== 'boolean' ||
      !tournamentData.description
    ) {
      throw new Error('Un ou plusieurs champs requis sont manquants ou invalides.')
    }

    const newTournament = await pb.collection('tournoi').create({
      nom: tournamentData.name,
      jeu: tournamentData.jeu,
      nb_joueurs: tournamentData.nb_joueurs,
      nb_manches: tournamentData.nb_manches,
      date: tournamentData.date,
      type: tournamentData.type,
      manche_actuelle: tournamentData.manche_actuelle,
      officiel: tournamentData.officiel,
      description: tournamentData.description,
      id_createur: tournamentData.userId
    })

    console.log('Tournoi créé avec succès:', newTournament)

    // Création des terrains
    const nbTerrains = Math.ceil(tournamentData.nb_joueurs / 2)
    for (let i = 1; i <= nbTerrains; i++) {
      await pb.collection('terrain').create({
        id_match_riot: null, 
        numero: i,
        id_tournoi: newTournament.id,
        id_participant: null 
      })
    }

    return newTournament
  } catch (error) {
    console.error('Erreur lors de la création du tournoi:', error)
    throw error
  }
}
