import { ReactComponent as DescendentArrow } from "../assets/descendent-arrow.svg";
import { ReactComponent as AscendentArrow } from "../assets/ascendent-arrow.svg";


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
      <button onClick={toggleStatsOrdering} className="stats-btn align-items-center">
        Stats  {statsOrdering == null ?  "" : statsOrdering === 1 ? <AscendentArrow className="ms-1"/> : <DescendentArrow className="ms-1"/>}
      </button>

      <ul className="poke-stats p-3">
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
  );
}

export default PokeStats;
