const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
// The data below is mocked.
const data = require("./data/pokemon.js");
const strData = JSON.stringify(data)
  .replace("Previous evolution(s)", "previousEvolutions")
  .replace("Common Capture Area", "commonCaptureArea")
  .replace("Pokémon Class", "pokemonClass");
const correctData = JSON.parse(strData);
const dataPokeBalls = require("./data/pokeballs.js");

// The schema should model the full data object available.
const schema = buildSchema(`
  type Pokemon {
    id: String
    name: String!
    classification: String
    types: [String]
    resistant: [String]
    weaknesses: [String]
    weight: Weight
    height: Height
    fleeRate: Float
    commonCaptureArea: String
    pokemonClass: String
    previousEvolutions: [Evolution]
    evolutionRequirements: EvolutionRequirements
    evolutions: [Evolution]
    maxCP: Int
    maxHP: Int
    attacks: Attacks
  }
  type Pokeball {
    id: Int
    name: String
    effect: String
    catch_rate: Float
  }


  type Weight {
    minimum: String
    maximum: String
  }
  type Height {
    minimum: String
    maximum: String
  }
  type EvolutionRequirements {
    amount: Int
    name: String
  }
  type Evolution {
    id: Int
    name: String
  }

  type Attacks {
    fast: [Attack]
    special: [Attack]
  }

  type Type {
    name: String
  }

  type Attack {
    name: String
    type: String
    damage: Int
  }

  input PokeballInput {
    id: Int
    name: String
    effect: String
    catch_rate: Float
  }

  input PokemonInput {
    id: String
    name: String!
    classification: String
    types: [String]
    resistant: [String]
    weaknesses: [String]
    weight: WeightInput
    fleeRate: Float
    commonCaptureArea: String
    pokemonClass: String
    maxCP: Int
    maxHP: Int
  }

  input WeightInput {
    minimum: String
    maximum: String
  }

  type Query {
    Pokemons: [Pokemon]
    Pokemon(name: String): Pokemon
    Types: [Type]
    Pokeballs: [Pokeball]
    Pokeball(name: String): Pokeball
  }

  type Mutation {
    createPokeball(input: PokeballInput): Pokeball
    createPokemon(input: PokemonInput): Pokemon
    updatePokeball(input: PokeballInput): Pokeball
    updatePokemon(input: PokemonInput): Pokemon
    deletePokeball(id: Int): Pokeball
    deletePokemon(id: String): Pokemon
  }
 
`);

// The root provides the resolver functions for each type of query or mutation.
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

// Start your express server!
const app = express();

/*
  The only endpoint for your server is `/graphql`- if you are fetching a resource, 
  you will need to POST your query to that endpoint. Suggestion: check out Apollo-Fetch
  or Apollo-Client. Note below where the schema and resolvers are connected. Setting graphiql
  to 'true' gives you an in-browser explorer to test your queries.
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);

console.log("Running a GraphQL API server at localhost:4000/graphql");
