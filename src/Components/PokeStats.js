import React from "react";

function PokeStats({ pokemonData, toggleStatsOrdering, statsOrdering }) {
    
 const orderPokemonDataStats = (stats, statsOrdering) => {
   return stats.sort((a, b) =>
    a.base_stat > b.base_stat ? 1 * statsOrdering : -1 * statsOrdering
  );
 } 

const orderedStats = statsOrdering == null ? pokemonData.stats :  orderPokemonDataStats(pokemonData.stats, statsOrdering)


  return (
    <div className="p-2">
      <h5 onClick={toggleStatsOrdering}>Stats:</h5>
      <ul className="poke-stats p-3">
        {
            statsOrdering === 1 ? <p>ascendente</p> : <p>descendente</p>
        }
        {  orderedStats.map((item, i) => {
          return (
            <li key={i}>
              {" "}
              {item.stat.name}: {item.base_stat}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PokeStats;
