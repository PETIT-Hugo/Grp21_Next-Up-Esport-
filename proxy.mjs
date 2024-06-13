// proxy.mjs
import express from 'express'
import axios from 'axios'

const app = express()
const port = 3121

const API_KEY = 'RGAPI-e85561b4-cfcc-4ffd-9da3-c325516ba710'

// Middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Middleware pour enregistrer les requêtes entrantes
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`)
  console.log('Headers:', req.headers)
  console.log('Query:', req.query)
  next()
})

app.get('/api/riot/account/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params
  const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`
  try {
    console.log(`Fetching data from Riot API: ${url}`)
    const response = await axios.get(url)
    console.log('Riot API response:', response.data)
    res.json(response.data)
  } catch (error) {
    console.error('Error fetching data from Riot API:', error.message)
    if (error.response) {
      console.error('Riot API error response:', error.response.data)
      res.status(error.response.status).send(error.response.data)
    } else {
      res.status(500).send('Internal Server Error')
    }
  }
})

app.get('/api/riot/matches/:puuid', async (req, res) => {
  const { puuid } = req.params
  const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1&api_key=${API_KEY}`
  try {
    console.log(`Fetching data from Riot API: ${url}`)
    const response = await axios.get(url)
    console.log('Riot API response:', response.data)
    res.json(response.data)
  } catch (error) {
    console.error('Error fetching data from Riot API:', error.message)
    if (error.response) {
      console.error('Riot API error response:', error.response.data)
      res.status(error.response.status).send(error.response.data)
    } else {
      res.status(500).send('Internal Server Error')
    }
  }
})

app.get('/api/riot/match/:matchId', async (req, res) => {
  const { matchId } = req.params
  const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
  try {
    console.log(`Fetching data from Riot API: ${url}`)
    const response = await axios.get(url)
    console.log('Riot API response:', response.data)
    res.json(response.data)
  } catch (error) {
    console.error('Error fetching data from Riot API:', error.message)
    if (error.response) {
      console.error('Riot API error response:', error.response.data)
      res.status(error.response.status).send(error.response.data)
    } else {
      res.status(500).send('Internal Server Error')
    }
  }
})

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`)
})
