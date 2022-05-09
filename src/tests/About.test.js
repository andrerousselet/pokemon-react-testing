import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Requisito 2: componente <About.js />', () => {
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();

    const text1 = 'This application simulates a Pokédex, ';
    const text2 = 'a digital encyclopedia containing all Pokémons';
    const firstParagraph = text1 + text2;
    const firstP = screen.getByText(firstParagraph);
    expect(firstP).toBeInTheDocument();

    const text3 = 'One can filter Pokémons by type, ';
    const text4 = 'and see more details for each one of them';
    const secondParagraph = text3 + text4;
    const secondP = screen.getByText(secondParagraph);
    expect(secondP).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(URL);
  });
});
