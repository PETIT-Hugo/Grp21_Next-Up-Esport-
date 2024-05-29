import axios from 'axios'

const API_KEY = 'RGAPI-9fa7e706-b0ff-4736-a38d-b4250dcf4a3c'
const BASE_URL = 'https://euw1.api.riotgames.com/lol'

const riotApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Riot-Token': API_KEY
  }
})

export const getSummonerByName = async (summonerName: string) => {
  const response = await riotApi.get(`/summoner/v4/summoners/by-name/${summonerName}`)
  return response.data
}

export const getMatchlistByAccount = async (accountId: string) => {
  const response = await riotApi.get(`/match/v4/matchlists/by-account/${accountId}`)
  return response.data
}

export const getMatchById = async (matchId: number) => {
  const response = await riotApi.get(`/match/v4/matches/${matchId}`)
  return response.data
}
