import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import debounce from "lodash.debounce";
import PokeStats from "./Components/PokeStats";

const RandomPokemon = Math.floor(Math.random() * 806 + 1);

function App() {
  const [pokemon, setPokemon] = useState({
    name: "pikachu",
    loading: true,
    notFound: false
  });
  const [pokemonData, setPokemonData] = useState([]);
  const [statsOrdering, setStatsOrdering] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getPokemon() {
      setPokemon(prevState => ({...prevState, notFound: false, loading: true}));
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      try {
        const res = await axios.get(url);
        setPokemonData(res?.data);
      } catch (err) {
        setPokemon(prevState => ({...prevState, notFound:true}))
      }
      setStatsOrdering(null);
      setPokemon(prevState => ({...prevState, loading: false}))
    }
    getPokemon();
    // eslint-disable-next-line
  }, [pokemon.name]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const updateQuery = (e) => callApi(e?.target?.value);

  const debouncedOnChange = debounce(updateQuery, 1000);

  const callApi = (value) => {
    const query = value;
    setPokemon(prevState=> ({...prevState, loading: true}));
    if (query) {
      setPokemon(prevState => ({...prevState, name: query}))
    } else {
      setPokemon(prevState=> ({...prevState, name: RandomPokemon}));
    }
    setPokemon(prevState=> ({...prevState, loading: false}))
  };

  const toggleStatsOrdering = () => {
    setStatsOrdering((oldStatsOrdering) => {
      if (statsOrdering == null) {
        return 1;
      } else {
        return oldStatsOrdering * -1;
      }
    });
  };

  


  return (
    <>
      <div>
        <div className="nav-bar d-flex justify-content-center">
          <img
            src={require("./assets/pokemon_logo.png")}
            alt={"pokemon-logo"}
            className="pokemon_logo"
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit} className="my-4">
            <label></label>
            <input
              type={"text"}
              placeholder={"Enter your Pokémon name or id"}
              name="query"
              onChange={debouncedOnChange}
              autoComplete="off"
            />
          </form>
          {pokemon.loading ? (
            <>
              <img
                src={require("./assets/pikachu-running.gif")}
                alt="pokemon-gif"
                className="loading-gif"
              />
            </>
          ) : pokemon.notFound ? (
            <h3>No Pokémon Matched Your Search!</h3>
          ) : (
            pokemonData && (
              <div className="poke-card d-flex w-50 justify-content-around p-3">
                <div className="poke-image">
                  <h3 className="text-capitalize mb-3">
                    {" "}
                    {pokemonData?.name}{" "}
                  </h3>

                  <img
                    src={pokemonData?.sprites?.front_default}
                    alt={`Pokémon ${pokemonData?.name}`}
                    className="border"
                  />
                </div>
                <PokeStats
                  pokemonData={pokemonData}
                  toggleStatsOrdering={toggleStatsOrdering}
                  statsOrdering={statsOrdering}
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
