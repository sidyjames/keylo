import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CircleDollarSign } from "lucide-react";
import { statusStyles } from "../data/properties";

// Historique temporaire affiché tant qu'il n'y a pas encore de vraie table de paiements.
// Chaque entrée est calculée depuis le bien pour garder une page utile sans backend.
const buildPaymentHistory = (property) => [
  {
    period: "Juin 2024",
    dueDate: property.nextPayment,
    paidDate: property.status === "Payé" ? property.nextPayment : "-",
    amount: property.rent,
    status: property.status,
  },
  {
    period: "Mai 2024",
    dueDate: "05/05/2024",
    paidDate: "05/05/2024",
    amount: property.rent,
    status: "Payé",
  },
  {
    period: "Avril 2024",
    dueDate: "05/04/2024",
    paidDate: "06/04/2024",
    amount: property.rent,
    status: "Payé",
  },
];

export default function PaiementHistory({ properties }) {
  // Récupère l'id du bien depuis l'URL /biens/:bienId/paiements.
  const { bienId } = useParams();

  // Retrouve le bien concerné dans l'état partagé de App.jsx.
  // Cela permet à l'historique de refléter le statut modifié depuis la fiche du bien.
  const selectedProperty = properties.find((property) => property.id === Number(bienId));

  // Si le bien n'existe plus ou que l'id est invalide, on renvoie vers la liste des biens.
  if (!selectedProperty) {
    return <Navigate to="/biens" replace />;
  }

  // Les lignes de l'historique sont construites au rendu depuis le bien courant.
  // Plus tard, cette fonction pourra être remplacée par les paiements renvoyés par l'API.
  const paymentHistory = buildPaymentHistory(selectedProperty);

  return (
    <div className="space-y-5">
      {/* Lien de retour vers la fiche du bien. */}
      <Link
        to={`/biens/${selectedProperty.id}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-orange-500"
      >
        <ArrowLeft size={17} />
        Retour au bien
      </Link>

      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        {/* En-tête de la page d'historique. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400">
              Biens / {selectedProperty.name} / Paiements
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-gray-950">
              Historique des paiements
            </h2>
            <p className="mt-2 text-sm font-medium text-gray-500">
              {selectedProperty.tenant} · {selectedProperty.rent} par mois
            </p>
          </div>

          {/* Rappel rapide du statut du paiement courant. */}
          <div className="rounded-xl border border-stone-200 p-4">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="text-orange-500" size={18} />
              <p className="text-sm font-extrabold text-gray-950">Paiement courant</p>
            </div>
            <span
              className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-xs font-extrabold ${
                statusStyles[selectedProperty.status]
              }`}
            >
              {selectedProperty.status}
            </span>
          </div>
        </div>

        {/* Tableau simple des paiements du bien. */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="border-b border-stone-100 text-xs font-bold text-gray-400">
              <tr>
                <th className="pb-4">Période</th>
                <th className="pb-4">Échéance</th>
                <th className="pb-4">Date de paiement</th>
                <th className="pb-4">Montant</th>
                <th className="pb-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.period} className="border-b border-stone-100 text-sm">
                  <td className="py-4 pr-6 font-extrabold text-gray-950">{payment.period}</td>
                  <td className="py-4 pr-6 font-medium text-gray-600">{payment.dueDate}</td>
                  <td className="py-4 pr-6 font-medium text-gray-600">{payment.paidDate}</td>
                  <td className="py-4 pr-6 font-extrabold text-gray-950">{payment.amount}</td>
                  <td className="py-4 pr-6">
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-extrabold ${
                        statusStyles[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
