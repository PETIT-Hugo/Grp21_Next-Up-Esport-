import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase('https://nextupesport.petit-hugommi1.fr:443')



export async function oneIDTournoi(id) {
  const records = await pb.collection('tournoi').getOne(`${id}`)
  return records
}

export async function getAllCosmetique() {
  try {
    const records = await pb.collection('cosmetique').getFullList()
    return records
  } catch (error) {
    console.error('Erreur lors de la récupération des cosmetiques', error)
    throw error
  }
}

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


// Composants terrain




export async function registerPlayer(tournoiId: string, userId: string) {
  try {
    if (!userId) {
      throw new Error('Vous devez être connecté pour vous inscrire.')
    }

    const terrains = await getTerrainsByTournoiId(tournoiId)

    // Vérifier si l'utilisateur est déjà inscrit dans le tournoi
    const joueurs = await pb.collection('joueur').getFullList({
      filter: `id_utilisateur="${userId}" && id_tournoi="${tournoiId}"`
    })

    if (joueurs.length > 0) {
      throw new Error('Vous êtes déjà inscrit à ce tournoi.')
    }

    let terrainLibre = null
    for (const terrain of terrains.sort((a, b) => a.numero - b.numero)) {
      if ((terrain.participants || []).length < 2) {
        terrainLibre = terrain
        break
      }
    }

    if (!terrainLibre) {
      throw new Error('Pas de place libre dans le tournoi.')
    }

    const userRecord = await pb.collection('utilisateur').getOne(userId)
    const pseudo = userRecord.pseudo

    const newPlayer = {
      num_terrain: terrainLibre.numero,
      victoires: 0,
      createur: false,
      id_utilisateur: userId,
      id_tournoi: tournoiId
    }

    const playerRecord = await pb.collection('joueur').create(newPlayer)

    if (!terrainLibre.participants) {
      terrainLibre.participants = []
    }
    terrainLibre.participants.push(playerRecord.id)

    await pb.collection('terrain').update(terrainLibre.id, {
      participants: terrainLibre.participants
    })

    return playerRecord
  } catch (error) {
    console.error("Erreur lors de l'inscription du joueur:", error)
    throw error
  }
}


export async function getTerrainsByTournoiId(tournoiId: string) {
  try {
    console.log(`Récupération des terrains pour le tournoi ID: ${tournoiId}`)
    const terrains = await pb.collection('terrain').getFullList({
      filter: `id_tournoi="${tournoiId}"`,
      expand: 'participants'
    })

    if (!terrains || terrains.length === 0) {
      throw new Error(`Aucun terrain trouvé pour le tournoi ID: ${tournoiId}`)
    }

    const joueurs = await pb.collection('joueur').getFullList()
    const utilisateurs = await pb.collection('utilisateur').getFullList()

    const utilisateurMap = Object.fromEntries(utilisateurs.map((user) => [user.id, user.pseudo]))
    const joueurMap = Object.fromEntries(
      joueurs.map((joueur) => [joueur.id, joueur.id_utilisateur])
    )

    return terrains.map((terrain) => ({
      ...terrain,
      joueurs: (terrain.participants || []).map((participantId) => {
        const userId = joueurMap[participantId]
        const pseudo = utilisateurMap[userId]
        const gagnant = joueurs.find((joueur) => joueur.id === participantId)?.gagnant // Ajout du statut de gagnant
        return userId
          ? { id: participantId, nom: pseudo, gagnant }
          : { id: null, nom: 'Libre', gagnant: false }
      })
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des terrains', error)
    throw error
  }
}


export async function getTournoisByUser(userId: string) {
  try {
    const records = await pb.collection('tournoi').getFullList({
      filter: `id_createur="${userId}"`
    })
    return records
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois', error)
    throw error
  }
}

export async function nextRound(tournoiId: string) {
  try {
    console.log(`Début de la fonction nextRound pour le tournoi ID: ${tournoiId}`)
    const terrains = await getTerrainsByTournoiId(tournoiId)

    if (!terrains || terrains.length === 0) {
      throw new Error(`Aucun terrain trouvé pour le tournoi ID: ${tournoiId}`)
    }

    console.log('Terrains récupérés:', terrains)

    // Mettre à jour les gagnants pour chaque terrain
    for (const terrain of terrains) {
      const participants = terrain.joueurs
      console.log(`Participants du terrain ${terrain.id}:`, participants)

      if (participants.length === 1) {
        // Si un seul participant, il est automatiquement gagnant
        await pb.collection('joueur').update(participants[0].id, {
          gagnant: true
        })
      } else if (participants.length === 2) {
        // Choisir un gagnant aléatoire entre les deux participants
        const winnerIndex = Math.floor(Math.random() * 2)
        const loserIndex = winnerIndex === 0 ? 1 : 0
        await pb.collection('joueur').update(participants[winnerIndex].id, {
          gagnant: true
        })
        await pb.collection('joueur').update(participants[loserIndex].id, {
          gagnant: false
        })
      }
    }

    // Mettre à jour la manche actuelle du tournoi
    const tournoi = await oneIDTournoi(tournoiId)
    const updatedRound = tournoi.manche_actuelle + 1
    await pb.collection('tournoi').update(tournoiId, {
      manche_actuelle: updatedRound
    })

    return { success: true }
  } catch (error) {
    console.error('Erreur lors du passage à la manche suivante:', error)
    throw error
  }
}


export async function getPlayersByTournoiId(tournoiId: string) {
  try {
    const joueurs = await pb.collection('joueur').getFullList({
      filter: `id_tournoi="${tournoiId}"`
    })
    return joueurs
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs:', error)
    throw error
  }
}

export async function getUserTournaments(userId: string) {
  try {
    // Tournois créés par l'utilisateur
    const createdTournaments = await pb.collection('tournoi').getFullList({
      filter: `id_createur="${userId}"`
    });

    // Tournois auxquels l'utilisateur est inscrit
    const playerRecords = await pb.collection('joueur').getFullList({
      filter: `id_utilisateur="${userId}"`
    });

    const joinedTournamentsIds = playerRecords.map(record => record.id_tournoi);
    const joinedTournaments = await pb.collection('tournoi').getFullList({
      filter: `id in (${joinedTournamentsIds.join(',')})`
    });

    return { createdTournaments, joinedTournaments };
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois de l\'utilisateur:', error);
    throw error;
  }
}


// backend.ts


export async function getPlayersByVictories() {
  try {
    const utilisateurs = await pb.collection('utilisateur').getFullList({
      sort: '-victoires' // Sort by victories in descending order
    });

    const players = utilisateurs.map(user => ({
      id: user.id,
      victoires: user.victoires,
      pseudo: user.pseudo,
      email: user.mail,
      avatarUrl: user.pp, // Assuming the profile picture is stored in the 'pp' field
    }));

    return players;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs par victoires', error);
    throw error;
  }
}
