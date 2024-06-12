import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000

const API_KEY = 'RGAPI-cec27d0e-599d-448c-8dbc-9b048e49690d'

// Middleware pour ajouter les en-têtes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api/riot/account/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params
  const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`
  try {
    const response = await axios.get(url)
    res.json(response.data)
  } catch (error) {
    res.status(error.response.status).send(error.message)
  }
})

app.get('/api/riot/matches/:puuid', async (req, res) => {
  const { puuid } = req.params
  const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1&api_key=${API_KEY}`
  try {
    const response = await axios.get(url)
    res.json(response.data)
  } catch (error) {
    res.status(error.response.status).send(error.message)
  }
})

app.get('/api/riot/match/:matchId', async (req, res) => {
  const { matchId } = req.params
  const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
  try {
    const response = await axios.get(url)
    res.json(response.data)
  } catch (error) {
    res.status(error.response.status).send(error.message)
  }
})

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`)
})
