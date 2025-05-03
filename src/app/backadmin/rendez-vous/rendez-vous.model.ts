export interface RendezVous {
    id: number;
    entreprise: string;
    responsable: string;
    referenceOffre: string;
    candidat: string;
    date: string; // format ISO string
    heure: string; // exemple "14:00"
    statut: 'en attente' | 'validé' | 'en cours' | 'expiré' | 'annulé';
    partieEffectuante: 'employeur' | 'candidat' | 'admin';
  }
  
  export interface RendezVousCreate {
    entreprise: string;
    responsable: string;
    referenceOffre: string;
    candidat: string;
    date: string;
    heure: string;
    partieEffectuante: string;
  }
  
  export interface RendezVousUpdate extends RendezVousCreate {}
  