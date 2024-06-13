import axios from 'axios'

const PROXY_URL = 'https://nextupesport.petit-hugommi1.fr/api/riot'

export async function getAccountByRiotId(gameName: string, tagLine: string) {
  const url = `${PROXY_URL}/account/${gameName}/${tagLine}`
  console.log('Request URL:', url) // Log the URL
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du compte Riot:', error)
    throw error
  }
}

export async function getLastMatchId(puuid: string) {
  const url = `${PROXY_URL}/matches/${puuid}`
  console.log('Request URL:', url) // Log the URL
  try {
    const response = await axios.get(url)
    return response.data[0]
  } catch (error) {
    console.error('Erreur lors de la récupération du dernier match:', error)
    throw error
  }
}

export async function getMatchResult(matchId: string, puuid: string) {
  const url = `${PROXY_URL}/match/${matchId}`
  console.log('Request URL:', url) // Log the URL
  try {
    const response = await axios.get(url)
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
