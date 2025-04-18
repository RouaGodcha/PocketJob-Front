export interface Candidat {
  firstname: string;
  lastname: string;
  email?: string;
  status?: string | undefined;
  diploma?: {
    name: string;
  };
  networks?: {
    facebook?: string | undefined;
    linkedIn?: string | undefined;
    instagram?: string | undefined;
    site_web?: string | undefined;
  };
  post?: string;
  points?: string[];
  created_at?: Date;
  updated_at?: Date;
  }

  