import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Dashboard from '../src/pages/Dashboard';

// Fonction utilitaire pour afficher le Dashboard dans un test.
// MemoryRouter est nécessaire parce que Dashboard contient un composant <Link />.
function renderDashboard() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
}

describe('Dashboard', () => {
  it('affiche les cartes KPI principales', () => {
    renderDashboard();

    expect(screen.getByText('Revenu mensuel')).toBeInTheDocument();
    expect(screen.getByText('12 345 €')).toBeInTheDocument();
    expect(screen.getByText('Loyers en attente')).toBeInTheDocument();
    expect(screen.getByText('Loyers en retard')).toBeInTheDocument();
    expect(screen.getByText('Biens')).toBeInTheDocument();
  });

  it('affiche le tableau des paiements du mois avec ses colonnes', () => {
    renderDashboard();

    expect(screen.getByRole('heading', { name: 'Paiements du mois' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Bien' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Locataire' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Montant' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Statut' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Échéance' })).toBeInTheDocument();
  });

  it('affiche les paiements attendus dans le tableau', () => {
    renderDashboard();

    const rows = screen.getAllByRole('row');

    expect(within(rows[1]).getByText('Appartement T2 - Lyon')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Marie Martin')).toBeInTheDocument();
    expect(within(rows[1]).getByText('1 200 €')).toBeInTheDocument();
    expect(within(rows[1]).getByText('05/06/2024')).toBeInTheDocument();

    expect(screen.getByText('Studio - Paris')).toBeInTheDocument();
    expect(screen.getByText('Maison - Bordeaux')).toBeInTheDocument();
    expect(screen.getByText('Appartement T3 - Lille')).toBeInTheDocument();
  });

  it('affiche les statuts de paiement avec les bons libellés', () => {
    renderDashboard();

    expect(screen.getAllByText('En attente')).toHaveLength(2);
    expect(screen.getByText('En retard')).toBeInTheDocument();
    expect(screen.getByText('Payé')).toBeInTheDocument();
  });

  it('contient un lien vers la page de tous les paiements', () => {
    renderDashboard();

    const link = screen.getByRole('link', { name: /voir tous les paiements/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/paiements');
  });
});
