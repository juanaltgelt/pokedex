import React from 'react'

function PokeStats({pokemonData, setPokemonData}) {
    console.log(pokemonData.stats.sort((a,b) => a - b))
    
    // const numAscending = () => {
    //     const {stats} = pokemonData;
    //     setPokemonData(() => {
    //         stats.sort((a, b) => (a.base_stat > b.base_stat ? 1 : -1));
    //         return stats;
    //       });
    // }
    
  
  return (
    <div>
        <h3>Stats</h3>
        <ul>
            {
                pokemonData.stats.map((item, i) => {
                 return <li key={i}> {item.stat.name}: {item.base_stat} </li>
            
                })
            }
        </ul>
    </div>
  )
}

export default PokeStats