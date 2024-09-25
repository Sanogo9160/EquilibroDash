export interface ProfilDeSante {
  id?: number;
  conditionsMedicales: string;
  allergies: string;
  objectifsSante: string;
  utilisateurId?: number; // Référence vers l'utilisateur
}
