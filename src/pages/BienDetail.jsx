import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CircleDollarSign,
  FilePlus2,
  FileText,
  Home,
  MoreHorizontal,
  Pencil,
  UserRound,
  X,
  Save
} from "lucide-react";
import { properties, statusStyles } from "../data/properties";


// Pour l'instant ils servent à montrer l'état actif, le contenu complet reste visible en dessous.
const tabs = ["Informations", "Locataire", "Paiements", "Documents"];

export default function BienDetail() {
  // Récupère l'id du bien depuis l'URL /biens/:bienId.
  const { bienId } = useParams();

  // Onglet actif dans la page de détail.
  const [activeTab, setActiveTab] = useState("Informations");

  // Cherche le bien correspondant à l'id de l'URL.
  const baseProperty = properties.find((property) => property.id === Number(bienId));

  // Version modifiée localement depuis le modal.
  // null signifie que la fiche affiche encore le bien original de properties.js.
  const [editedProperty, setEditedProperty] = useState(null);

  // Contrôle l'ouverture du modal d'édition.
  // false = modal fermé, true = formulaire visible par-dessus la page.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Bien réellement affiché.
  // Si l'id de l'URL change, on ignore automatiquement une ancienne modification locale d'un autre bien.
  const selectedProperty =
    editedProperty?.id === baseProperty?.id ? editedProperty : baseProperty;

  // Ouvre le modal de modification avec les informations actuelles du bien.
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Ferme le modal sans appliquer les modifications saisies.
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Applique les champs modifiés depuis le modal.
  // Pour l'instant, la sauvegarde reste locale à la page car le projet utilise des données temporaires.
  const savePropertyChanges = (updatedProperty) => {
    setEditedProperty(updatedProperty);
    setIsEditModalOpen(false);
  };

  // Si l'id ne correspond à aucun bien, on revient vers la liste.
  if (!baseProperty || !selectedProperty) {
    return <Navigate to="/biens" replace />;
  }

  return (
    <div className="space-y-5">
      {/* Lien de retour pour repasser de la page détail à la liste des biens. */}
      <Link
        to="/biens"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        Retour aux biens
      </Link>

      {/* Carte principale de détail : elle reprend le bloc que tu voulais déplacer hors de la liste. */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        {/* En-tête du détail avec fil d'Ariane, titre et actions. */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400">Biens / {selectedProperty.name}</p>
            <h2 className="mt-3 text-2xl font-extrabold text-gray-950">
              {selectedProperty.name}
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={openEditModal}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              <Pencil size={17} />
              Modifier
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200 text-gray-500 transition hover:border-orange-200 hover:text-orange-500"
              aria-label="Plus d'actions"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Navigation interne du détail. */}
        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-stone-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-3 py-3 text-sm font-bold transition ${
                activeTab === tab
                  ? "border-orange-500 bg-orange-50 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cartes de détail : informations du bien, locataire et prochain paiement. */}
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <InfoCard selectedProperty={selectedProperty} />
          <TenantCard selectedProperty={selectedProperty} />
          <PaymentCard selectedProperty={selectedProperty} />
        </div>

        {/* Liste des documents liés au bien sélectionné. */}
        <DocumentsPanel selectedProperty={selectedProperty} />
      </section>

      {/* Modal d'édition du bien et du locataire.
          Il est monté seulement quand l'utilisateur clique sur le bouton Modifier. */}
      {isEditModalOpen && (
        <EditPropertyModal
          property={selectedProperty}
          onCancel={closeEditModal}
          onSave={savePropertyChanges}
        />
      )}
    </div>
  );
}

// Carte "Informations du bien".
// Elle transforme les champs du bien en liste définition pour garder un affichage propre et accessible.
function InfoCard({ selectedProperty }) {
  // Lignes affichées dans la carte d'informations.
  // Ce format rend l'ajout ou le retrait d'un champ très simple.
  const rows = [
    ["Adresse", selectedProperty.address],
    ["Type de bien", selectedProperty.type],
    ["Surface", selectedProperty.surface],
    ["Loyer mensuel", selectedProperty.rent],
    ["Charges mensuelles", selectedProperty.charges],
    ["Dépôt de garantie", selectedProperty.deposit],
  ];

  return (
    <article className="rounded-xl border border-stone-200 p-4">
      {/* Titre de la carte. */}
      <div className="mb-4 flex items-center gap-2">
        <Home className="text-orange-500" size={18} />
        <h3 className="text-sm font-extrabold text-gray-950">Informations du bien</h3>
      </div>

      {/* Liste des informations générales du bien. */}
      <dl className="space-y-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-extrabold text-gray-900">{label}</dt>
            <dd className="mt-1 text-sm font-medium leading-5 text-gray-500">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

// Carte "Locataire".
// Elle regroupe l'identité et les coordonnées du locataire du bien sélectionné.
function TenantCard({ selectedProperty }) {
  return (
    <article className="rounded-xl border border-stone-200 p-4">
      {/* Titre de la carte locataire. */}
      <div className="mb-4 flex items-center gap-2">
        <UserRound className="text-orange-500" size={18} />
        <h3 className="text-sm font-extrabold text-gray-950">Locataire</h3>
      </div>

      {/* Avatar basé sur les initiales du locataire. */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-base font-extrabold text-gray-800">
        {selectedProperty.tenant
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>

      {/* Coordonnées principales du locataire. */}
      <div className="mt-4 space-y-2 text-sm">
        <p className="font-extrabold text-gray-950">{selectedProperty.tenant}</p>
        <p className="font-medium text-gray-500">{selectedProperty.tenantEmail}</p>
        <p className="font-medium text-gray-500">{selectedProperty.tenantPhone}</p>
        <p className="font-medium text-gray-500">Entrée le {selectedProperty.leaseStart}</p>
      </div>

      {/* Action prévue pour ouvrir une future fiche locataire complète. */}
      <button
        type="button"
        className="mt-5 h-10 w-full rounded-lg border border-stone-200 text-sm font-bold text-gray-800 transition hover:border-orange-200 hover:text-orange-500"
      >
        Voir le locataire
      </button>
    </article>
  );
}

// Carte "Prochain paiement".
// Elle met en avant le prochain loyer attendu et son statut.
function PaymentCard({ selectedProperty }) {
  return (
    <article className="rounded-xl border border-stone-200 p-4">
      {/* Titre de la carte paiement. */}
      <div className="mb-4 flex items-center gap-2">
        <CircleDollarSign className="text-orange-500" size={18} />
        <h3 className="text-sm font-extrabold text-gray-950">Prochain paiement</h3>
      </div>

      {/* Montant, date et badge de statut du prochain paiement. */}
      <p className="text-2xl font-extrabold text-gray-950">{selectedProperty.rent}</p>
      <p className="mt-1 text-sm font-bold text-gray-400">Le {selectedProperty.nextPayment}</p>
      <span
        className={`mt-4 inline-flex rounded-md px-2.5 py-1 text-xs font-extrabold ${
          statusStyles[selectedProperty.status]
        }`}
      >
        {selectedProperty.status}
      </span>

      {/* Actions liées au paiement du bien sélectionné. */}
      <button
        type="button"
        className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 text-sm font-bold text-white transition hover:bg-orange-600"
      >
        <Check size={16} />
        Marquer comme payé
      </button>
      <button
        type="button"
        className="mt-3 h-10 w-full rounded-lg border border-stone-200 text-sm font-bold text-gray-800 transition hover:border-orange-200 hover:text-orange-500"
      >
        Voir l'historique
      </button>
    </article>
  );
}

// Bloc "Documents".
// Il liste les fichiers rattachés au bien et propose une zone pour en ajouter un nouveau.
function DocumentsPanel({ selectedProperty }) {
  return (
    <section className="mt-4 rounded-xl border border-stone-200 p-4">
      <h3 className="text-sm font-extrabold text-gray-950">Documents</h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* Cartes des documents existants. */}
        {selectedProperty.documents.map((document) => (
          <article
            key={document.title}
            className="rounded-lg border border-stone-200 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
          >
            <FileText className="text-orange-500" size={22} />
            <p className="mt-3 text-sm font-extrabold text-gray-950">{document.title}</p>
            <p className="mt-1 text-xs font-medium text-gray-400">Ajouté le {document.date}</p>
          </article>
        ))}

        {/* Bouton d'ajout d'un document, prêt à être branché à un upload plus tard. */}
        <button
          type="button"
          className="flex min-h-[112px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-stone-300 text-sm font-bold text-gray-500 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500"
        >
          <FilePlus2 size={24} />
          Ajouter un document
        </button>
      </div>
    </section>
  );
}

// Modal de modification du bien et du locataire.
// Il reçoit le bien actuel, préremplit tous les champs éditables, puis renvoie la version modifiée au parent.
function EditPropertyModal({ property, onCancel, onSave }) {
  // Etat local du formulaire.
  // On copie le bien pour permettre à l'utilisateur d'annuler sans toucher aux informations déjà affichées.
  const [formValues, setFormValues] = useState({
    name: property.name,
    address: property.address,
    type: property.type,
    surface: property.surface,
    rent: property.rent,
    charges: property.charges,
    deposit: property.deposit,
    tenant: property.tenant,
    tenantEmail: property.tenantEmail,
    tenantPhone: property.tenantPhone,
    leaseStart: property.leaseStart,
  });

  // Description des champs du bien.
  // Chaque objet pilote un input pour éviter de répéter le même JSX plusieurs fois.
  const propertyFields = [
    { name: "name", label: "Nom du bien", type: "text" },
    { name: "address", label: "Adresse", type: "text" },
    { name: "type", label: "Type de bien", type: "text" },
    { name: "surface", label: "Surface", type: "text" },
    { name: "rent", label: "Loyer mensuel", type: "text" },
    { name: "charges", label: "Charges mensuelles", type: "text" },
    { name: "deposit", label: "Dépôt de garantie", type: "text" },
  ];

  // Description des champs locataire.
  // Le même composant de champ est réutilisé pour garder un formulaire homogène.
  const tenantFields = [
    { name: "tenant", label: "Nom du locataire", type: "text" },
    { name: "tenantEmail", label: "Email", type: "email" },
    { name: "tenantPhone", label: "Téléphone", type: "tel" },
    { name: "leaseStart", label: "Date d'entrée", type: "text" },
  ];

  // Met à jour un seul champ du formulaire contrôlé.
  // Le nom de l'input correspond à la clé dans formValues.
  const updateField = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  // Valide le formulaire et reconstruit le bien complet.
  // Les champs non édités comme les documents, le statut et l'image sont conservés tels quels.
  const submitForm = (event) => {
    event.preventDefault();

    const cleanedValues = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [key, value.trim()])
    );

    onSave({
      ...property,
      ...cleanedValues,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
    >
      {/* role dialog + aria-modal indiquent aux technologies d'assistance qu'il s'agit d'une fenêtre modale. */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-property-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-stone-200 bg-white shadow-xl"
      >
        <form onSubmit={submitForm}>
          {/* En-tête du modal avec le titre et la fermeture sans sauvegarde. */}
          <div className="flex items-start justify-between gap-4 border-b border-stone-100 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-orange-500">
                Modification
              </p>
              <h2 id="edit-property-title" className="mt-1 text-xl font-extrabold text-gray-950">
                Modifier le bien et le locataire
              </h2>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-stone-100 hover:text-gray-700"
              aria-label="Fermer la modification"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-6 p-5">
            {/* Champs liés au bien affiché dans la carte Informations du bien. */}
            <FormSection title="Informations du bien" icon={Home}>
              {propertyFields.map((field) => (
                <EditInput
                  key={field.name}
                  field={field}
                  value={formValues[field.name]}
                  onChange={updateField}
                />
              ))}
            </FormSection>

            {/* Champs liés au locataire affiché dans la carte Locataire. */}
            <FormSection title="Locataire concerné" icon={UserRound}>
              {tenantFields.map((field) => (
                <EditInput
                  key={field.name}
                  field={field}
                  value={formValues[field.name]}
                  onChange={updateField}
                />
              ))}
            </FormSection>
          </div>

          {/* Actions du formulaire : annuler ou enregistrer les informations saisies. */}
          <div className="flex flex-col-reverse gap-3 border-t border-stone-100 p-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-stone-200 px-4 text-sm font-bold text-gray-700 transition hover:border-stone-300 hover:bg-stone-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              <Save size={17} />
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// Section visuelle du formulaire.
// Elle groupe les champs par thème pour séparer clairement le bien du locataire.
function FormSection({ title, icon, children }) {
  // Renomme le composant icône en majuscule pour pouvoir le rendre comme un composant React.
  const SectionIcon = icon;

  return (
    <section className="rounded-xl border border-stone-200 p-4">
      <div className="mb-4 flex items-center gap-2">
        <SectionIcon className="text-orange-500" size={18} />
        <h3 className="text-sm font-extrabold text-gray-950">{title}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

// Champ contrôlé réutilisable du modal.
// La valeur vient de formValues et chaque frappe remonte vers updateField.
function EditInput({ field, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-extrabold text-gray-900">{field.label}</span>
      <input
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        className="mt-2 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm font-medium text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
      />
    </label>
  );
}
