export interface Commentaire {
  id?: number;
  contenu: string;
  auteur?: {
    id?: number;
    nom?: string;
  };
  dateCreation: string;
  forumId?: number;
}
