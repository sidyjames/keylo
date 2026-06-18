import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import BienDetail from '../src/pages/BienDetail';

function renderBienDetail(route = '/biens/1') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/biens/:bienId" element={<BienDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('BienDetail', () => {
  it('affiche le détail du bien demandé dans l URL', () => {
    renderBienDetail('/biens/3');

    expect(screen.getByRole('heading', { name: 'Maison - Bordeaux' })).toBeInTheDocument();
    expect(screen.getByText('Sophie Leroy')).toBeInTheDocument();
    expect(screen.getByText('82 m²')).toBeInTheDocument();
  });

  it('contient un lien de retour vers la liste des biens', () => {
    renderBienDetail();

    expect(screen.getByRole('link', { name: /retour aux biens/i })).toHaveAttribute('href', '/biens');
  });
});
