import { ReactComponent as DescendentArrow } from "../assets/descendent-arrow.svg";
import { ReactComponent as AscendentArrow } from "../assets/ascendent-arrow.svg";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";


function PokeStats({ pokemonData, toggleStatsOrdering, statsOrdering }) {
  const orderPokemonDataStats = (stats, statsOrdering) => {
    return stats?.sort((a, b) =>
      a.base_stat > b.base_stat ? 1 * statsOrdering : -1 * statsOrdering
    );
  };

  const orderedStats =
    statsOrdering == null
      ? pokemonData?.stats
      : orderPokemonDataStats(pokemonData.stats, statsOrdering);

  return (
    <div className="p-2">
     <div className="d-flex align-items-center">
     <h1 className="me-2 sort-title">Sort By</h1>
     <button onClick={toggleStatsOrdering} className="sort-btn align-items-center">

         {!statsOrdering   ?  <RightArrow /> : statsOrdering === 1 ? <AscendentArrow className="ms-1"/> : <DescendentArrow className="ms-1"/>}
      </button>
     </div>
      <div className="poke-stats p-2">
        <h5>Stats:</h5>
      <ul className="ps-1" >
        {orderedStats?.map((item, i) => {
          return (
            <li key={i} className="text-capitalize">
              {" "}
              {item.stat.name}: {item.base_stat}{" "}
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}

export default PokeStats;
