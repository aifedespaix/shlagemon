export interface DialogNode {
    id: string; // identifiant unique de la question
    text: string; // texte de la question
    responses: DialogResponse[];
    imageUrl?: string; // image optionnelle à afficher dans le bouton
}

export interface DialogResponse {
    label: string; // texte de la réponse
    imageUrl?: string; // image optionnelle à afficher dans le bouton
    nextId?: string; // id de la prochaine question (si suite)
    action?: () => void; // ou action à exécuter (si fin de branche)
    color?: string; // couleur optionnelle à appliquer au bouton
}
