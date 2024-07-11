'use client'
import Card from '@/ui/Card'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [reponse, setResponse] = useState(null)
  const [nameFiltering, setNameFiltering] = useState(null)
  const [initialPage, setInitialPage] = useState([20,0])
  useEffect(() => {
    const getPokemon = async () => {
      const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      const json = await resp.json()
      setResponse(json?.results)
      setNameFiltering(json?.results)
    }

    getPokemon() 
  },[])

  function handleChanceSearch(e){
    const filtering = reponse?.filter( item => item.name.includes(e.target.value))
    console.log(filtering)
    setNameFiltering(filtering)
  }

  function handleClick(){
    const listName = nameFiltering.map( item => item.name)
    const nameOrder = listName.toSorted()

    const listOrder = nameOrder.map((item) => {
      return nameFiltering.find( pokemon => pokemon.name === item)
    })
    setNameFiltering(listOrder)
  }

  async function nextPage(){
    const [limit, offset] = initialPage
    const currentOffset = offset + 20
    setInitialPage([20, currentOffset ])
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`)
      const json = await resp.json()
      setNameFiltering(json?.results)
  }

  async function backPage(){}

  return (
    <main className="">
      <input type='text' onChange={handleChanceSearch}></input>
      <button onClick={handleClick}>Ordenar</button>

      <section className='grid grid-cols-4 gap-[8px]'>
        {nameFiltering?.map(pokemon => (
          <Card pokemon={pokemon} key={pokemon.name}/>
        ))}
      </section>

      <div className='flex gap-5'>
        <button onClick={backPage}>{'<'}</button>
        <button onClick={nextPage}>{'>'}</button>
      </div>
    </main>
  )
}
