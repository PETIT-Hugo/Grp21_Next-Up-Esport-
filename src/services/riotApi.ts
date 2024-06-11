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
