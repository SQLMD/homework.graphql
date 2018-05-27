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

  type Attack {
    name: String
    type: String
    damage: Int
  }

  type Query {
    Pokemons: [Pokemon]
    Pokemon(name: String): Pokemon
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
