const data = require("./data/pokemon.js");
const strData = JSON.stringify(data)
  .replace("Previous evolution(s)", "previousEvolutions")
  .replace("Common Capture Area", "commonCaptureArea")
  .replace("Pokémon Class", "pokemonClass");
const correctData = JSON.parse(strData);
const dataPokeBalls = require("./data/pokeballs.js");

const root = {
  Pokemons: () => {
    return correctData;
  },
  Pokemon: (request) => {
    return correctData.find((pokemon) => pokemon.name === request.name);
  },
  Types: () => {
    const types = [];
    correctData.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        if (!types.includes(type)) {
          types.push(type);
        }
      });
    });
    return types.map((type) => ({
      name: type,
    }));
  },
  Pokeballs: () => {
    return dataPokeBalls;
  },
  Pokeball: (request) => {
    return dataPokeBalls.find((pokeball) => pokeball.name === request.name);
  },
  createPokeball: (request) => {
    dataPokeBalls.push(request.input);
  },
  createPokemon: (request) => {
    correctData.push(request.input);
  },
  updatePokeball: (request) => {
    dataPokeBalls.forEach((pokeBall, index) => {
      if (pokeBall.id === request.input.id) {
        pokeBall = { ...pokeBall, ...request.input };
        dataPokeBalls.splice(index, 1);
        dataPokeBalls.push(pokeBall);
      }
    });
  },
  updatePokemon: (request) => {
    correctData.forEach((pokemon, index) => {
      if (pokemon.id === request.input.id) {
        pokemon = { ...pokemon, ...request.input };
        correctData.splice(index, 1);
        correctData.push(pokemon);
      }
    });
  },
  deletePokeball: (request) => {
    dataPokeBalls.forEach((pokeBall, index) => {
      if (pokeBall.id === request.id) {
        dataPokeBalls.splice(index, 1);
      }
    });
  },
  deletePokemon: (request) => {
    correctData.forEach((pokemon, index) => {
      if (pokemon.id === request.id) {
        correctData.splice(index, 1);
      }
    });
  },
};

module.exports = root;
