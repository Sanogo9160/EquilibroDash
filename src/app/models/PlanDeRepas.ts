export interface Repas {
  nom: string;
  description: string;
}

export interface PlanDeRepas {
  id?: number;
  date: string;
  repasList: Repas[];
  utilisateurId?: number;
}
