import React, { useState, useEffect, useRef } from 'react';
import { fetchPokemon } from '../services/pokemonApi';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { TableHead, Card, CardMedia, Typography } from '@mui/material';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonId, setPokemonId] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const pokemonDataRef = useRef(null);

  const scrollToPokemonData = () => {
    if (pokemonDataRef.current) {
      pokemonDataRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (pokemonData) {
      scrollToPokemonData();
    }
  }, [pokemonData]);

  const handleSearch = async () => {
    const data = await fetchPokemon(pokemonName.toLowerCase());
    if (data) {
      setPokemonData(data);
      setPokemonId(data.id);  // Update the ID based on the searched name
    }
  };

  const handlePreviousNext = async (id) => {
    const data = await fetchPokemon(id);
    if (data) {
      setPokemonData(data);
      setPokemonId(data.id);
      setPokemonName(data.name);
    }
  };

  useEffect(() => {
    // When pokemonId changes and is not null, fetch the new Pokemon
    if (pokemonId !== null) {
      handlePreviousNext(pokemonId);
    }
  }, [pokemonId]);

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ marginBottom: '20px' }}>
        {pokemonData && pokemonData.sprites && pokemonData.sprites.other && pokemonData.sprites.other["official-artwork"] && pokemonData.sprites.other["official-artwork"].front_default ? (
          <CardMedia
            component="img"
            image={pokemonData.sprites.other["official-artwork"].front_default}
            alt={pokemonData.name}
            style={{ width: 'auto', maxHeight: '300px', margin: 'auto' }}
          />
        ) : null}
      </Card>
      <TextField 
        label="Enter Pokémon Name" 
        variant="outlined"
        value={pokemonName} 
        onChange={(e) => setPokemonName(e.target.value)} 
        onKeyPress={(e) => {
            if (e.key === 'Enter') {
            handleSearch();
            e.preventDefault(); // Prevent form submission
            }
        }}
        style={{ marginBottom: '20px' }}
        />
      <div>
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>
          Search
        </Button>
        <Button variant="contained" onClick={() => pokemonId > 1 && setPokemonId(pokemonId - 1)} disabled={!pokemonId || pokemonId <= 1}>
          Previous
        </Button>
        <Button variant="contained" onClick={() => pokemonId < 898 && setPokemonId(pokemonId + 1)} disabled={!pokemonId || pokemonId >= 898} style={{ marginLeft: '10px' }}>
          Next
        </Button>
      </div>
      <div ref={pokemonDataRef}>
      {pokemonData && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell colSpan={2} style={{ textAlign: 'center'}}>
                <Typography variant="h6" style={{ fontWeight: 'bold'}}>
                    {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
                </Typography>
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">Pokedex Number</TableCell>
                <TableCell>{pokemonData.id}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">Type</TableCell>
                <TableCell>{pokemonData.types.map(type => type.type.name).join(', ')}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">Abilities</TableCell>
                <TableCell>{pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">Height</TableCell>
                <TableCell>{pokemonData.height}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">Weight</TableCell>
                <TableCell>{pokemonData.weight}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">Base Stats</TableCell>
                <TableCell>
                {pokemonData.stats.map(stat => (
                    <Typography variant="body2" key={stat.stat.name}>
                    {`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}
                    </Typography>
                ))}
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
      )}
    </div>
    </div>
  );
};

export default PokemonSearch;

/* src={pokemonData.sprites.other["official-artwork"].front_default} */