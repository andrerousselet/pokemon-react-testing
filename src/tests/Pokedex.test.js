import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Requisito 5: componente <Pokedex.js />', () => {
  test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading',
      { level: 2, name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  test(`se é exibido o próximo pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg).toBeInTheDocument();
    const nextPokBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokBtn);
    const charmanderImg = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmanderImg).toBeInTheDocument();
    for (let i = 1; i < pokemons.length - 1; i += 1) {
      userEvent.click(nextPokBtn);
    }
    const dragonairImg = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(dragonairImg).toBeInTheDocument();
  });

  test('se estiver no último pokémon, volta para o primeiro ao clicar no botão', () => {
    renderWithRouter(<App />);
    const nextPokBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    for (let i = 1; i < pokemons.length; i += 1) {
      userEvent.click(nextPokBtn);
    }
    const dragonairImg = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(dragonairImg).toBeInTheDocument();
    userEvent.click(nextPokBtn);
    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg).toBeInTheDocument();
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    filterBtns.forEach((btn, index) => {
      userEvent.click(btn);
      expect(btnAll).toBeEnabled();
      expect(btn).toHaveTextContent(`${types[index]}`);
    });
  });

  test(`A partir da seleção de um botão de tipo,
  a Pokédex deve circular somente pelos pokémons daquele tipo`, () => {
    renderWithRouter(<App />);
    const nextPokBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    const normalBtn = screen.getByRole('button', { name: /normal/i });

    userEvent.click(electricBtn);
    expect(nextPokBtn).toBeDisabled();

    userEvent.click(fireBtn);
    const charmanderImg = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmanderImg).toBeInTheDocument();
    userEvent.click(nextPokBtn);
    const rapidashImg = screen.getByRole('img', { name: /rapidash sprite/i });
    expect(rapidashImg).toBeInTheDocument();

    userEvent.click(psychicBtn);
    const alakazamImg = screen.getByRole('img', { name: /alakazam sprite/i });
    expect(alakazamImg).toBeInTheDocument();
    userEvent.click(nextPokBtn);
    const mewImg = screen.getByRole('img', { name: /mew sprite/i });
    expect(mewImg).toBeInTheDocument();

    userEvent.click(normalBtn);
    expect(nextPokBtn).toBeDisabled();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const nextPokBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnAll).toBeInTheDocument();
    expect(nextPokBtn).toBeEnabled();

    userEvent.click(btnAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    for (let i = 1; i < pokemons.length; i += 1) {
      userEvent.click(nextPokBtn);
      const pokemonName = screen.getByText(pokemons[i].name);
      expect(pokemonName).toBeInTheDocument();
    }
  });
});
