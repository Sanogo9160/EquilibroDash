export interface Forum {
  id?: number;
  nom: string;
  description: string;
  auteur?: any;  // Utilisateur peut être typé si besoin
  dateCreation?: string;  // Utilisé pour OffsetDateTime
  commentaires?: any[];
}
