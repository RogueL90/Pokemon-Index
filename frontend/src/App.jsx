import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [currSearch, setCurrSearch] = useState("")
  const [pokemon, setPokemon] = useState("")
  const [data, setData] = useState()
  const [myPokemon, setMyPokemon] = useState([])
 
  const handleChange = (event) =>{
    event.preventDefault()
    setCurrSearch(event.target.value)
  }

  const search = (event) => {
    event.preventDefault()
    setPokemon(currSearch)
  }

  const handleDelete = (id) => {
    let temp = myPokemon
    setMyPokemon(temp.filter(val => val.id !== id))
  }

  const handleAdd = (name, id) => {
    let temp = [...myPokemon, {id: id, name: name}]
    setMyPokemon(temp)
  }

  useEffect(() => {
    if(!pokemon) return
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    axios.get(url)
    .then(response => setData(response.data))
    .catch(() => setData(undefined))
  }
    , [pokemon])

  const Display = () => {
    if(data === undefined){
      return(
        <>
        <p>No Pokemon Found.</p>
        </>
      )
    }
    let Typs = ""
    data.types.forEach(typ => Typs +=(typ.slot === 1 ? "" : ", ")+typ.type.name)
    return(
      <div>
        <h2>Name: {data.name}</h2>
        <p>ID: {data.id}</p>
        <img src={data.sprites.front_default} />
        <br />
        <audio controls>
        <source src={data.cries.latest} type="audio/ogg" />
        Your browser does not support the audio element.
        </audio>
        <p>Types: {Typs}</p> 
        <p>HP: {data.stats[0].base_stat}</p>
        <p>Attack: {data.stats[1].base_stat}</p>
        <p>Defense: {data.stats[2].base_stat}</p>
        <p>Speed: {data.stats[5].base_stat}</p>
        <button onClick={() => handleAdd(data.name, Math.random())}>Add To Your Index!</button>
      </div>
    )
  }

  const PokemonList = () => {
     return myPokemon.map(pokemon => (
      <div key={pokemon.id}>
      <p>{pokemon.name}</p>
      <button onClick={() => handleDelete(pokemon.id)}>Abandon</button>
      </div>
    ))
  }

  return(
    <>
    <h1>Pokémon Index</h1>
    <div>
      <form onSubmit={search}>
        <input onChange = {handleChange} type="text" />
        <button type="submit" >Search</button>
      </form>
    </div>
    <Display />
    <h1>My Pokémon</h1>
    <PokemonList />
    </>
  )
}

export default App