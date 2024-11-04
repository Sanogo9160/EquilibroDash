import {Utilisateur} from "./Utilisateur";
import {PreferenceAlimentaire} from "./preference-alimentaire";
import {Maladie} from "./maladie";
import {ObjectifSante} from "./objectif-sante";
import {Allergie} from "./allergie";

//import {Allergie} from "./ allergie";

export interface ProfilDeSante {
  id?: number;
  maladies: Maladie[];
  objectifs: ObjectifSante[];
  allergies: Allergie[];
  preferencesAlimentaires: PreferenceAlimentaire[];
  utilisateur: Utilisateur;

}


