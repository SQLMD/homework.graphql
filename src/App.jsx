import React from "react";

const { createApolloFetch } = require("apollo-fetch");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }
  async componentDidMount() {
    const fetch = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });

    const result = await fetch({
      query: `{ Pokemons { id,
        name,
        types,
        resistant,
        weaknesses }}`,
    });

    await this.setState({ pokemons: result.data.Pokemons });
  }
  render() {
    return (
      <div id="container">
        {this.state.pokemons.map((pokemon, index) => {
          return (
            <div className="pokemon" key={index}>
              <p>Name: {pokemon.name}</p>
              <p>Classificaion: {pokemon.classification}</p>
              <p>Types: {pokemon.types}</p>
              <p>Weaknesses: {pokemon.weaknesses}</p>
              <p>Resistant: {pokemon.resistant}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
