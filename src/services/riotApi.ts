// src/services/riotApi.ts
import axios from 'axios'

const API_KEY = 'RGAPI-4e28f481-3699-4b8a-a86d-070b61cf2644' // Remplacez par votre clé API

export async function getAccountByRiotId(gameName: string, tagLine: string) {
  const url = `/proxy/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    })
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du compte Riot:', error)
    throw error
  }
}

export async function getLastMatchId(puuid: string) {
  const url = `/proxy/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    })
    return response.data[0] // Assuming the API returns a list of match IDs and we want the first one
  } catch (error) {
    console.error('Erreur lors de la récupération du dernier match:', error)
    throw error
  }
}

export async function getMatchResult(matchId: string, puuid: string) {
  const url = `/proxy/lol/match/v5/matches/${matchId}`

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    })

    const matchData = response.data
    const participant = matchData.info.participants.find((p: any) => p.puuid === puuid)

    if (!participant) {
      throw new Error('Participant non trouvé dans le match')
    }

    return participant.win
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du match:', error)
    throw error
  }
}
