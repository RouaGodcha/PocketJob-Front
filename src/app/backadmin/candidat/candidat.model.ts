export interface Candidat {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
  careers?: Array<{
    title: string;
    from: string;
    to: string;
  }>; // Ajout de la propriété careers
  niveau?: Array<{
    level: string;
    university: string;
    date: string;
    name: string;
  }>; // Ajout de la propriété niveau
  points?: string[];
  post?: string;
  diploma?: {
    name: string;
  };
  networks?: {
    facebook?: string;
    linkedIn?: string;
    instagram?: string;
    site_web?: string;
  };
}
