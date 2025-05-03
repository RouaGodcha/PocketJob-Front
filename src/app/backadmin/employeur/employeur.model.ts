export interface Employer {
    id: number;
    name: string;
    email: string;
    phone: string;
    domaine?: string;                // Domaine
    typeProfessionnel?: string;      // Type Professionnel
    description?: string;            // Description (Ajoutée)
    document?: { name: string };     // Diplôme (ou autre document)
    adresse?: string;                // Adresse
    qualification?: { name: string }; // Qualification
    creator?: { firstname: string; lastname: string }; // Créé par
    status?: string;                 // Statut
    created_at?: string;             // Date de création
    image?: string;                  // Image
  }
  