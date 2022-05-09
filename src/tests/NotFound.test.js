import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requisito 4: o componente <NotFound.js />', () => {
  test('se a página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
    const emoji = screen.getByRole('img', { name: /Crying emoji/i });
    expect(emoji).toBeInTheDocument();
  });

  test('se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const pikachuImg = screen.getByRole('img', { name: altText });
    expect(pikachuImg.src).toBe(URL);
  });
});
