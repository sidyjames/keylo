import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, PiggyBank, Clock3, CalendarDays, Home } from "lucide-react";

// A remplacer après par des APIs.
// Pour l'instant, les données sont écrites ici pour construire l'interface.

// Étape 1 : données des cartes KPI en haut du dashboard.
// Chaque objet représente une carte : titre, valeur, description, icône et couleur.
const kpiCards = [
  {
    label: "Revenu mensuel",
    value: "12 345 €",
    detail: "En hausse de 8% par rapport au mois précédent",
    icon: PiggyBank,
    bg: "bg-orange-100"
  },
  {
    label: "Loyers en attente",
    value: "3",
    detail: "3 paiements en attente de traitement",
    icon: Clock3,
    bg: "bg-orange-100"
  },
  {
    label: "Loyers en retard",
    value: "2",
    detail: "2 paiements en retard de paiement",
    icon: CalendarDays,
    bg:"bg-red-100"
  },
  {
    label: "Biens",
    value: "5",
    detail: "Tous vos biens immobiliers",
    icon: Home,
    bg: "bg-blue-100"
  },
];

// Étape 2 : données temporaires du tableau "Paiements du mois".
// A remplacer par les vraies données de la Bdd.
// Chaque objet représente une ligne du tableau.
const monthlyPayments = [
  {
    id: 1,
    property: "Appartement T2 - Lyon", // Bien concerné
    tenant: "Marie Martin", // Locataire
    amount: "1 200 €", // Montant du paiement
    status: "En attente", // Statut du paiement
    dueDate: "05/06/2024", // Date d'échéance
  },
  {
    id: 2,
    property: "Studio - Paris",
    tenant: "Lucas Bernard",
    amount: "650 €",
    status: "En attente",
    dueDate: "07/06/2024",
  },
  {
    id: 3,
    property: "Maison - Bordeaux",
    tenant: "Sophie Leroy",
    amount: "1 000 €",
    status: "En retard",
    dueDate: "10/06/2024",
  },
  {
    id: 4,
    property: "Appartement T3 - Lille",
    tenant: "Thomas Petit",
    amount: "950 €",
    status: "Payé",
    dueDate: "01/06/2024",
  },
];

// Étape 3 : couleurs des badges selon le statut.
// Exemple : si status vaut "En retard", le badge devient rouge.
const paymentStatusStyles = {
  "En attente": "bg-orange-100 text-orange-600",
  "En retard": "bg-red-100 text-red-600",
  "Payé": "bg-green-100 text-green-600",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Étape 4 : afficher les cartes KPI du dashboard */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {card.value}
                </p>

                <p className="mt-2 text-xs font-medium text-gray-500">
                  {card.detail}
                </p>
              </div>

              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.bg}`}>
                <Icon className={card.color} size={24} />
              </div>
            </article>
          );
        })}
      </section>

      {/* Étape 5 : créer la carte blanche qui contient le tableau */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">
          Paiements du mois
        </h2>

        {/* Étape 6 : ajouter un scroll horizontal sur mobile si le tableau est trop large */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              {/* Étape 7 : afficher les titres des colonnes */}
              <tr className="text-xs font-semibold text-gray-400">
                <th className="pb-4">Bien</th>
                <th className="pb-4">Locataire</th>
                <th className="pb-4">Montant</th>
                <th className="pb-4">Statut</th>
                <th className="pb-4">Échéance</th>
                <th className="pb-4" aria-label="Actions" />
              </tr>
            </thead>

            <tbody>
              {/* Étape 8 : parcourir les paiements et créer une ligne par paiement */}
              {monthlyPayments.map((payment) => (
                <tr
                  key={`${payment.property}-${payment.tenant}`}
                  className="text-sm font-semibold text-gray-800"
                >
                  {/* Étape 9 : remplir chaque cellule avec les données du paiement */}
                  <td className="py-3 pr-6">{payment.property}</td>
                  <td className="py-3 pr-6 text-gray-700">{payment.tenant}</td>
                  <td className="py-3 pr-6">{payment.amount}</td>
                  <td className="py-3 pr-6">
                    {/* Étape 10 : appliquer automatiquement la bonne couleur au statut */}
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${
                        paymentStatusStyles[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-700">{payment.dueDate}</td>
                  <td className="py-3 text-right">
                    {/* Étape 11 : bouton prévu pour ouvrir le détail du paiement plus tard */}
               
                    <Link
                        to={`/biens/${payment.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-orange-500"
                        aria-label={`Voir les détails de ${payment.name}`}
                    >
                        <ChevronRight size={18} />
                      </Link>
           
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Étape 12 : lien vers la page qui affichera tous les paiements */}
        <div className="mt-6 flex justify-end">
          <Link
            to="/paiements"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 transition hover:text-orange-600"
          >
            Voir tous les paiements
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
