import axios from "axios";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import PokeStats from "./Components/PokeStats";

const RandomPokemon = Math.floor(Math.random() * 806 + 1);

function App() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [statsOrdering, setStatsOrdering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPokemon = useCallback(async () => {
    setError(false);
    setLoading(true);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    try {
      const res = await axios.get(url);
      setPokemonData(res?.data);
    } catch (err) {
      setError(true);
    }
    setStatsOrdering(null);
    setLoading(false);
  }, [pokemon]);

  useEffect(() => {
    getPokemon();
  }, [pokemon, getPokemon]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const updateQuery = (e) => callApi(e?.target?.value);

  const debouncedOnChange = debounce(updateQuery, 1000);

  const callApi = (value) => {
    const query = value;
    setLoading(true);
    if (query) {
      setPokemon(query.toLowerCase());
    } else {
      setPokemon(RandomPokemon);
    }
    setLoading(false);
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
            />
          </form>
          {loading ? (
            <>
              <img
                src={require("./assets/pikachu-running.gif")}
                alt="pokemon-gif"
                className="loading-gif"
              />
            </>
          ) : error ? (
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
