import Image from "next/image"
import { useEffect, useState } from "react"

import './card.css'

function Card({ pokemon }){
    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [ pokemonStats, setPokemonStats ] = useState(null)

    useEffect(() => {
        async function getpokemo(){
            const response = await fetch(pokemon.url)
            const json = await response.json()
            setPokemonInfo(json)
        }

        getpokemo()
    },[pokemon])


    useEffect(() => {
        if(pokemonInfo){
            const stats = pokemonInfo.stats
            const ataque = stats.find( item => item.stat.name === 'attack') 
            const defensa = stats.find( item => item.stat.name === 'defense') 
            setPokemonStats([ataque, defensa])
        }
    },[pokemonInfo])

    console.log(pokemonStats)
    return <>
        <div className="border card flex justify-center w-full flex-col items-center">
        {pokemonInfo && <Image src={pokemonInfo?.sprites?.front_default} alt="pokemon sprite" width={100} height={100}></Image>}
            <h2>{pokemon.name}</h2>

            {pokemonStats && pokemonStats?.map( item => (
                <h3 key={item.base_stat}>{item.stat.name}: {item.base_stat}</h3>
            ))}
        </div>
    </>
}

export default Card