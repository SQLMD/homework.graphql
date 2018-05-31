const { buildSchema } = require("graphql");

schema = buildSchema(`
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

module.exports = schema;
