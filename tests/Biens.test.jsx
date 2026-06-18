import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Biens from '../src/pages/Biens';

function renderBiens() {
  return render(
    <MemoryRouter>
      <Biens />
    </MemoryRouter>
  );
}

describe('Biens', () => {
  it('affiche la liste des biens avec les colonnes principales', () => {
    renderBiens();

    expect(screen.getByRole('columnheader', { name: 'Bien' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Adresse' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Locataire' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Loyer mensuel' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Statut' })).toBeInTheDocument();
    expect(screen.getByText('Appartement T2 - Lyon')).toBeInTheDocument();
    expect(screen.getByText('Maison - Bordeaux')).toBeInTheDocument();
  });

  it('filtre les biens depuis la recherche', async () => {
    const user = userEvent.setup();

    renderBiens();

    await user.type(screen.getByPlaceholderText('Rechercher un bien...'), 'Bordeaux');

    expect(screen.getByText('Maison - Bordeaux')).toBeInTheDocument();
    expect(screen.queryByText('Studio - Paris')).not.toBeInTheDocument();
  });

  it('retire le bouton d ajout et garde le détail sur une page dédiée', () => {
    renderBiens();

    expect(screen.queryByRole('button', { name: /ajouter un bien/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Appartement T2 - Lyon' })).not.toBeInTheDocument();
  });

  it('propose des actions sur chaque bien', () => {
    renderBiens();

    const rows = screen.getAllByRole('row');
    const bordeauxRow = rows[3];

    expect(within(bordeauxRow).getByRole('link', { name: /modifier maison - bordeaux/i })).toHaveAttribute(
      'href',
      '/biens/3'
    );
    expect(within(bordeauxRow).getByRole('button', { name: /supprimer maison - bordeaux/i })).toBeInTheDocument();
    expect(within(bordeauxRow).getByRole('link', { name: /voir maison - bordeaux/i })).toHaveAttribute(
      'href',
      '/biens/3'
    );
  });

  it('ouvre un modal de confirmation avant suppression puis permet d annuler', async () => {
    const user = userEvent.setup();

    renderBiens();

    await user.click(screen.getByRole('button', { name: /supprimer studio - paris/i }));

    const dialog = screen.getByRole('dialog', { name: /supprimer ce bien/i });

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/êtes-vous sûr/i)).toBeInTheDocument();
    expect(within(dialog).getAllByText('Studio - Paris')).toHaveLength(2);

    await user.click(within(dialog).getByRole('button', { name: /annuler/i }));

    expect(screen.queryByRole('dialog', { name: /supprimer ce bien/i })).not.toBeInTheDocument();
    expect(screen.getByText('Studio - Paris')).toBeInTheDocument();
  });

  it('supprime le bien de la liste après confirmation', async () => {
    const user = userEvent.setup();

    renderBiens();

    await user.click(screen.getByRole('button', { name: /supprimer maison - bordeaux/i }));
    await user.click(
      within(screen.getByRole('dialog', { name: /supprimer ce bien/i })).getByRole('button', {
        name: /^supprimer$/i,
      })
    );

    expect(screen.queryByText('Maison - Bordeaux')).not.toBeInTheDocument();
    expect(screen.getAllByText('3')).toHaveLength(2);
  });
});
