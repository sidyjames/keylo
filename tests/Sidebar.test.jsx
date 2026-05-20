import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Sidebar from '../src/components/layout/Sidebar';

// Fonction utilitaire pour afficher la Sidebar dans un test.
// MemoryRouter permet à NavLink de connaître la route active.
function renderSidebar({ route = '/dashboard', props = {} } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Sidebar {...props} />
    </MemoryRouter>
  );
}

describe('Sidebar', () => {
  it('affiche le logo, le profil et tous les liens du menu', () => {
    renderSidebar();

    expect(screen.getByAltText('Keylo logo')).toBeInTheDocument();
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
    expect(screen.getByText('Propriétaire')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /tableau de bord/i })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /biens/i })).toHaveAttribute('href', '/biens');
    expect(screen.getByRole('link', { name: /paiements/i })).toHaveAttribute('href', '/paiements');
    expect(screen.getByRole('link', { name: /documents/i })).toHaveAttribute('href', '/documents');
    expect(screen.getByRole('link', { name: /paramètres/i })).toHaveAttribute('href', '/parametres');
  });

  it('met en évidence le lien actif selon la route actuelle', () => {
    renderSidebar({ route: '/paiements' });

    const activeLink = screen.getByRole('link', { name: /paiements/i });

    expect(activeLink).toHaveStyle({
      background: '#fff7ed',
      color: '#f97316',
      fontWeight: '600',
    });
  });

  it('peut réduire puis agrandir le menu sur desktop', async () => {
    const user = userEvent.setup();

    renderSidebar();

    await user.click(screen.getByRole('button', { name: /réduire le menu/i }));

    expect(screen.queryByText('Tableau de bord')).not.toBeInTheDocument();
    expect(screen.queryByText('Jean Dupont')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agrandir le menu/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /agrandir le menu/i }));

    expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
  });

  it('appelle onClose quand on ferme le menu mobile', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderSidebar({
      props: {
        isMobile: true,
        open: true,
        onClose,
      },
    });

    await user.click(screen.getByRole('button', { name: /fermer le menu/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('appelle onClose quand on clique sur un lien en mobile', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderSidebar({
      props: {
        isMobile: true,
        open: true,
        onClose,
      },
    });

    await user.click(screen.getByRole('link', { name: /biens/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
