import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CalendarCheck2,
  ChevronRight,
  CircleDollarSign,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { properties, statusStyles } from "../data/properties";

export default function Biens() {
  // Liste des biens affichés dans la page.
  // On part des données temporaires de properties.js, puis on peut retirer un bien de cette liste localement.
  const [displayedProperties, setDisplayedProperties] = useState(properties);

  // Champ de recherche utilisé pour filtrer le tableau des biens.
  const [query, setQuery] = useState("");

  // Bien sélectionné pour suppression.
  // null signifie qu'aucun modal de confirmation n'est ouvert.
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Données des cartes de synthèse affichées en haut de la page.
  // La valeur "Biens actifs" dépend de displayedProperties pour se mettre à jour après une suppression.
  const summaryCards = [
    {
      label: "Biens actifs",
      value: String(displayedProperties.length),
      icon: Building2,
      tone: "bg-orange-100 text-orange-600",
    },
    {
      label: "Revenus mensuels",
      value: "3 800 €",
      icon: CircleDollarSign,
      tone: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Paiements à suivre",
      value: "3",
      icon: CalendarCheck2,
      tone: "bg-sky-100 text-sky-600",
    },
  ];

  // Liste filtrée des biens.
  // useMemo évite de recalculer le filtre tant que la recherche ne change pas.
  const filteredProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return displayedProperties;

    return displayedProperties.filter((property) =>
      [property.name, property.address, property.tenant, property.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [displayedProperties, query]);

  // Ouvre le modal en mémorisant le bien concerné.
  // On ne supprime rien à cette étape : on demande d'abord confirmation à l'utilisateur.
  const openDeleteModal = (property) => {
    setPropertyToDelete(property);
  };

  // Ferme le modal sans modifier la liste.
  // C'est utilisé par le bouton "Annuler" et par la croix en haut du modal.
  const closeDeleteModal = () => {
    setPropertyToDelete(null);
  };

  // Confirme la suppression.
  // On filtre la liste pour retirer uniquement le bien dont l'id correspond au bien sélectionné.
  const confirmDelete = () => {
    if (!propertyToDelete) return;
// On met à jour la liste des biens affichés en retirant le bien sélectionné.
    setDisplayedProperties((currentProperties) =>
      currentProperties.filter((property) => property.id !== propertyToDelete.id)
    );
    setPropertyToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Cartes de synthèse : donnent une vision rapide du portefeuille immobilier. */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div>
                <p className="text-sm font-semibold text-gray-500">{card.label}</p>
                <p className="mt-2 text-2xl font-extrabold text-gray-950">{card.value}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-full ${card.tone}`}>
                <Icon size={22} strokeWidth={1.9} />
              </div>
            </article>
          );
        })}
      </section>

      {/* Page liste : recherche et tableau seulement. Le détail est sur une page dédiée. */}
      <section className="rounded-xl border border-stone-200 bg-white shadow-sm">
        {/* Barre de recherche pour retrouver rapidement un bien par nom, adresse, locataire ou statut. */}
        <div className="border-b border-stone-100 p-5">
          <label className="relative block w-full md:max-w-md">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Rechercher un bien..."
              className="h-11 w-full rounded-lg border border-stone-200 bg-white pl-11 pr-4 text-sm font-medium text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
            />
          </label>
        </div>

        {/* Tableau des biens : il garde une largeur minimale et devient scrollable sur petit écran. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            {/* En-tête du tableau avec les colonnes principales de la page. */}
            <thead className="bg-stone-50 text-xs font-bold text-gray-400">
              <tr>
                <th className="px-5 py-4">Bien</th>
                <th className="px-5 py-4">Adresse</th>
                <th className="px-5 py-4">Locataire</th>
                <th className="px-5 py-4">Loyer mensuel</th>
                <th className="px-5 py-4">Statut</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Une ligne par bien filtré. Les actions ouvrent la page dédiée du bien. */}
              {filteredProperties.map((property) => (
                <tr
                  key={property.id}
                  className="border-t border-stone-100 bg-white text-sm transition hover:bg-orange-50/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.image}
                        alt=""
                        className="h-12 w-12 rounded-lg object-cover ring-1 ring-stone-200"
                      />
                      <span className="font-extrabold text-gray-900">{property.name}</span>
                    </div>
                  </td>
                  <td className="max-w-[280px] px-5 py-4 font-medium leading-5 text-gray-500">
                    {property.address}
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900">{property.tenant}</td>
                  <td className="px-5 py-4 font-extrabold text-gray-950">{property.rent}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-extrabold ${
                        statusStyles[property.status]
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {/* Actions possibles : modifier, supprimer, ou ouvrir le détail. */}
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/biens/${property.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-orange-500"
                        aria-label={`Modifier ${property.name}`}
                      >
                        <Pencil size={17} />
                      </Link>
        
                      <button
                        type="button"
                        onClick={() => openDeleteModal(property)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label={`Supprimer ${property.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                      <Link
                        to={`/biens/${property.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-orange-500"
                        aria-label={`Voir ${property.name}`}
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal de confirmation.
          Il s'affiche seulement quand propertyToDelete contient un bien. */}
      {propertyToDelete && (
        <DeletePropertyModal
          property={propertyToDelete}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

// Modal de confirmation de suppression.
// Il est séparé du composant principal pour garder le tableau lisible.
function DeletePropertyModal({ property, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
    >
      {/* Boîte du modal : role dialog rend le composant compréhensible par les lecteurs d'écran. */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-property-title"
        aria-describedby="delete-property-description"
        className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-xl"
      >
        {/* En-tête du modal : titre + bouton de fermeture. */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="delete-property-title" className="text-lg font-extrabold text-gray-950">
              Supprimer ce bien ?
            </h2>
            <p id="delete-property-description" className="mt-2 text-sm font-medium leading-6 text-gray-500">
              Êtes-vous sûr de vouloir supprimer le bien ?
           
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-stone-100 hover:text-gray-700"
            aria-label="Fermer la confirmation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Rappel du bien concerné pour éviter de supprimer la mauvaise ligne. */}
        <div className="mt-5 rounded-lg bg-stone-50 p-4">
          <p className="text-sm font-extrabold text-gray-950">{property.name}</p>
          <p className="mt-1 text-sm font-medium text-gray-500">{property.address}</p>
          <p className="mt-1 text-sm font-medium text-gray-500">Locataire : {property.tenant}</p>
        </div>

        {/* Actions du modal : annuler ferme seulement, supprimer retire vraiment le bien. */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-stone-200 px-4 text-sm font-bold text-gray-700 transition hover:border-stone-300 hover:bg-stone-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-red-500 px-4 text-sm font-bold text-white transition hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </section>
    </div>
  );
}
