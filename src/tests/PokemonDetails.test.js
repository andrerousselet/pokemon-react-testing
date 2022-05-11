import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
import userEvent from '@testing-library/user-event';

describe('Requisito 7: componente <PokemonDetails.js />', () => {
  test('se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      pokemons.forEach((pokemon) => {
        history.push(`/pokemons/${pokemon.id}`);

        const heading = screen.getByRole('heading',
          { level: 2, name: `${pokemon.name} Details` });
        expect(heading).toBeInTheDocument();

        expect(screen.queryByRole('link', { name: /more details/i }))
          .not.toBeInTheDocument();

        const summaryHeading = screen.getByRole('heading',
          { level: 2, name: /summary/i });
        expect(summaryHeading).toBeInTheDocument();

        const summaryText = screen.getByText(pokemon.summary);
        expect(summaryText).toBeInTheDocument();
      });
    });

  test('se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      pokemons.forEach((pokemon) => {
        history.push(`/pokemons/${pokemon.id}`);

        const locationsHeading = screen.getByRole('heading',
          { level: 2, name: `Game Locations of ${pokemon.name}` });
        expect(locationsHeading).toBeInTheDocument();

        const imgLocations = screen.getAllByRole('img',
          { name: `${pokemon.name} location` });
        expect(imgLocations.length).toEqual(pokemon.foundAt.length);

        imgLocations.forEach((img, index) => {
          expect(img.src).toBe(pokemon.foundAt[index].map);
          const locationName = screen.getByText(pokemon.foundAt[index].location);
          expect(locationName).toBeInTheDocument();
        });
      });
    });

  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);

      const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
      expect(checkbox).toBeInTheDocument();
      userEvent.click(checkbox);
    });

    history.push('/favorites');

    pokemons.forEach((pokemon) => {
      const pokemonImg = screen.getByRole('img', { name: `${pokemon.name} sprite` });
      const favoriteStar = screen.getByRole('img',
        { name: `${pokemon.name} is marked as favorite` });
      expect(pokemonImg).toBeInTheDocument();
      expect(favoriteStar).toBeInTheDocument();
    });

    pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);

      const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
      userEvent.click(checkbox);
    });

    history.push('/favorites');

    const notFoundText = screen.getByText(/no favorite pokemon found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
