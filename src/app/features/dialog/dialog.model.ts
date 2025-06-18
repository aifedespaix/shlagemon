export interface DialogNode {
    id: string; // identifiant unique de la question
    text: string; // texte de la question
    responses: DialogResponse[];
}

export interface DialogResponse {
    label: string; // texte de la réponse
    nextId?: string; // id de la prochaine question (si suite)
    action?: () => void; // ou action à exécuter (si fin de branche)
}
