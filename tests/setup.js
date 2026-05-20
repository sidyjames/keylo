import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Ce fichier est chargé avant chaque fichier de test.
// Il ajoute les assertions comme toBeInTheDocument() et nettoie le DOM après chaque test.
afterEach(() => {
  cleanup();
});
