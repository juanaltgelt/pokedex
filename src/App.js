import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./App.css";
import PokeStats from "./Components/PokeStats";

function App() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [statsOrdering, setStatsOrdering] = useState(null);
  const [loading, setLoading] = useState(true);


  const getPokemon = async () => {
    try {
      setLoading(true);
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      setStatsOrdering(null);
      setPokemonData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error); //modificarlo
    }
  };

  useEffect(() => {
    getPokemon();
  }, [pokemon]);

  const handleChange = (e) => {
    if (!e.target.value) {
      return setPokemon("pikachu");
    } else {
      setPokemon(e.target.value.toLowerCase());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
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
          <form onSubmit={handleSubmit} className="mt-3">
            <label>
              <input
                type={"text"}
                placeholder={"Enter your Pokémon name"}
                onChange={handleChange}
              />
            </label>
          </form>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <div className="poke-card d-flex w-50 justify-content-around p-3 mt-3">
              <div className="card-image">
                <h3> {pokemonData.name} </h3>

                <img
                  src={pokemonData.sprites.front_default}
                  alt={`Pokémon ${pokemonData.name}`}
                  className="border"
                />
              </div>
              <PokeStats
                pokemonData={pokemonData}
                toggleStatsOrdering={toggleStatsOrdering}
                statsOrdering={statsOrdering}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
