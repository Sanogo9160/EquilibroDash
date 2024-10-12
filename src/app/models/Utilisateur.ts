import {Role} from "./Role";
import {ProfilDeSante} from "./ProfilDeSante";

export interface Utilisateur {
  id?: number;
  nom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  poids?: number;
  taille?: number;
  age?: number;
  sexe: string;
  role: Role;
  specialite?: string; // Optionnel, uniquement pour diététicien
  //profilDeSante: ProfilDeSante;
}





