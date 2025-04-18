export interface Candidature {
    id: number;
    candidatNom: string;
    offreReference: string;
    entrepriseNom: string;
    domaine: string;
    statut: 'en attente' | 'acceptée' | 'annulée';
    datePostulation: string;
  }
  