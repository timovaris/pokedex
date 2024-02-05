const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemon = async (pokemonName) => {
  try {
    const response = await fetch(`${BASE_URL}${pokemonName}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
