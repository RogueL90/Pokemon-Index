const http = require('http')
const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())
let pokemon = [

]

app.get('/api/pokemon/', (request, response) => {
    response.json(pokemon)
}
)

app.delete('/api/pokemon/:id', (request, response) => {
    const id = Number(request.params.id)
    pokemon = pokemon.filter(poke => poke.id!== id)

    response.status(204).end()
})

app.post('/api/pokemon/', (request, response) => {
    const body = request.body

      if (!body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const poke = {
    name: body.name,
    id: body.id
  }

    pokemon = pokemon.concat(poke)
    response.json(poke)
})



const PORT = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)