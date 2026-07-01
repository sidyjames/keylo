import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, PiggyBank, Clock3, CalendarDays, Home } from "lucide-react";
import { statusStyles } from "../data/properties";

// Convertit une chaîne comme "1 200 €" en nombre.
// Cela permet de calculer les KPI avec les données temporaires existantes.
const parseCurrency = (value) => Number(value.replace(/[^\d]/g, ""));

export default function Dashboard({ properties }) {
  // Le tableau du dashboard est maintenant construit depuis les biens partagés dans App.jsx.
  // Quand un paiement passe à "Payé" depuis une fiche bien, cette liste se met à jour automatiquement.
  const monthlyPayments = properties.map((property) => ({
    id: property.id,
    property: property.name,
    tenant: property.tenant,
    amount: property.rent,
    status: property.status,
    dueDate: property.nextPayment,
  }));

  // KPI recalculés depuis les biens pour éviter les chiffres figés.
  // La source est la même que le tableau, donc les cartes restent cohérentes après une action.
  const waitingPaymentsCount = properties.filter(
    (property) => property.status === "En attente"
  ).length;
  const latePaymentsCount = properties.filter((property) => property.status === "En retard").length;
  const monthlyRevenue = properties
    .filter((property) => property.status === "Payé")
    .reduce((total, property) => total + parseCurrency(property.rent), 0);

  // Données des cartes KPI en haut du dashboard.
  // Chaque objet représente une carte : titre, valeur, description, icône et couleur.
  const kpiCards = [
    {
      label: "Revenu mensuel",
      value: `${monthlyRevenue.toLocaleString("fr-FR")} €`,
      detail: "Total des loyers marqués comme payés",
      icon: PiggyBank,
      bg: "bg-orange-100",
    },
    {
      label: "Loyers en attente",
      value: String(waitingPaymentsCount),
      detail: `${waitingPaymentsCount} paiement(s) en attente de traitement`,
      icon: Clock3,
      bg: "bg-orange-100",
    },
    {
      label: "Loyers en retard",
      value: String(latePaymentsCount),
      detail: `${latePaymentsCount} paiement(s) en retard de paiement`,
      icon: CalendarDays,
      bg: "bg-red-100",
    },
    {
      label: "Biens",
      value: String(properties.length),
      detail: "Tous vos biens immobiliers",
      icon: Home,
      bg: "bg-blue-100",
    },
  ];

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
              {/* Étape 8 : parcourir les paiements issus des biens et créer une ligne par paiement */}
              {monthlyPayments.map((payment) => (
                <tr
                  key={payment.id}
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
                        statusStyles[payment.status]
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
                        aria-label={`Voir les détails de ${payment.property}`}
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
