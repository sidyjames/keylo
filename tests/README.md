# Tests

Ce dossier regroupe les tests du projet Keylo.

## Fichiers

- `setup.js` : configuration globale lancée avant les tests.
- `Dashboard.test.jsx` : tests de la page Dashboard.
- `Sidebar.test.jsx` : tests du menu de navigation.

## Commandes utiles

Lancer les tests une seule fois :

```bash
npm run test:run
```

Lancer les tests en mode surveillance :

```bash
npm run test
```

Le mode surveillance relance automatiquement les tests quand un fichier change.

## Comment lire un test

Un test suit généralement cette logique :

```jsx
it('explique ce que le test vérifie', () => {
  // 1. On affiche le composant.
  renderDashboard();

  // 2. On cherche un élément visible à l'écran.
  const link = screen.getByRole('link', { name: /voir tous les paiements/i });

  // 3. On vérifie le résultat attendu.
  expect(link).toHaveAttribute('href', '/paiements');
});
```

## Tests du Dashboard

`Dashboard.test.jsx` vérifie que :

- les cartes KPI s'affichent ;
- le tableau "Paiements du mois" existe ;
- les colonnes du tableau sont présentes ;
- les paiements temporaires sont affichés ;
- les statuts sont corrects ;
- le lien "Voir tous les paiements" mène vers `/paiements`.

## Tests du menu

`Sidebar.test.jsx` vérifie que :

- le logo et le profil utilisateur s'affichent ;
- tous les liens du menu sont présents ;
- chaque lien pointe vers la bonne route ;
- le lien actif est bien mis en évidence ;
- le menu peut être réduit et agrandi sur desktop ;
- le menu mobile appelle `onClose` quand on le ferme ;
- le menu mobile appelle `onClose` quand on clique sur un lien.

## Pourquoi userEvent ?

`userEvent` permet de simuler des actions utilisateur :

```jsx
const user = userEvent.setup();

await user.click(screen.getByRole('button', { name: /réduire le menu/i }));
```

On l'utilise pour tester les clics sur les boutons du menu.

## Pourquoi MemoryRouter ?

La page Dashboard contient un composant `Link` de React Router.
Dans un test, il faut donc entourer le composant avec `MemoryRouter`, sinon React Router ne sait pas gérer la navigation.

```jsx
render(
  <MemoryRouter>
    <Dashboard />
  </MemoryRouter>
);
```

## Pourquoi setup.js ?

`setup.js` ajoute des assertions pratiques comme :

```jsx
expect(element).toBeInTheDocument();
```

Il nettoie aussi le DOM après chaque test pour éviter que les rendus précédents restent dans la page de test.
