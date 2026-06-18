// Données temporaires des biens.
// Plus tard, ce tableau pourra être remplacé par les données venant de l'API ou de la base de données.
export const properties = [
  {
    id: 1,
    name: "Appartement T2 - Lyon",
    address: "12 Rue de la République, 69001 Lyon",
    tenant: "Marie Martin",
    tenantEmail: "marie.martin@email.com",
    tenantPhone: "06 12 34 56 78",
    leaseStart: "01/03/2023",
    rent: "1 200 €",
    charges: "80 €",
    deposit: "1 300 €",
    surface: "45 m²",
    type: "Appartement",
    status: "En attente",
    nextPayment: "05/06/2024",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=240&q=80",
    documents: [
      { title: "Bail", date: "08/03/2023" },
      { title: "État des lieux", date: "01/03/2023" },
      { title: "Diagnostic DPE", date: "09/03/2023" },
    ],
  },
  {
    id: 2,
    name: "Studio - Paris",
    address: "45 Avenue des Champs-Élysées, 75008 Paris",
    tenant: "Lucas Bernard",
    tenantEmail: "lucas.bernard@email.com",
    tenantPhone: "06 23 45 67 89",
    leaseStart: "15/09/2023",
    rent: "650 €",
    charges: "45 €",
    deposit: "695 €",
    surface: "24 m²",
    type: "Studio",
    status: "En attente",
    nextPayment: "07/06/2024",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=240&q=80",
    documents: [
      { title: "Bail", date: "15/09/2023" },
      { title: "Quittance mai", date: "08/05/2024" },
    ],
  },
  {
    id: 3,
    name: "Maison - Bordeaux",
    address: "8 Rue Sainte-Catherine, 33000 Bordeaux",
    tenant: "Sophie Leroy",
    tenantEmail: "sophie.leroy@email.com",
    tenantPhone: "06 34 56 78 90",
    leaseStart: "01/01/2024",
    rent: "1 000 €",
    charges: "95 €",
    deposit: "1 095 €",
    surface: "82 m²",
    type: "Maison",
    status: "En retard",
    nextPayment: "10/06/2024",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=240&q=80",
    documents: [
      { title: "Bail", date: "01/01/2024" },
      { title: "État des lieux", date: "01/01/2024" },
      { title: "Assurance habitation", date: "04/01/2024" },
    ],
  },
  {
    id: 4,
    name: "Appartement T3 - Lille",
    address: "20 Rue de la Gare, 59000 Lille",
    tenant: "Thomas Petit",
    tenantEmail: "thomas.petit@email.com",
    tenantPhone: "06 45 67 89 01",
    leaseStart: "01/11/2022",
    rent: "950 €",
    charges: "70 €",
    deposit: "1 020 €",
    surface: "62 m²",
    type: "Appartement",
    status: "Payé",
    nextPayment: "01/07/2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=240&q=80",
    documents: [
      { title: "Bail", date: "01/11/2022" },
      { title: "Diagnostic DPE", date: "30/10/2022" },
    ],
  },
];

// Associe chaque statut à une couleur de badge.
// Cela évite de répéter les classes Tailwind dans chaque ligne du tableau et chaque carte de paiement.
export const statusStyles = {
  "En attente": "bg-orange-100 text-orange-600",
  "En retard": "bg-red-100 text-red-600",
  Payé: "bg-green-100 text-green-600",
};
