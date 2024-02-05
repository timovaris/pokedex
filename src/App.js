import React from 'react';
import './App.css';
import PokemonSearch from './components/PokemonSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon Search</h1>
      </header>
      <PokemonSearch />
    </div>
  );
}

export default App;
