import { Injectable } from '@angular/core';

interface DialogueStep {
  speaker?: string;
  text: string;
  choices?: DialogueChoice[];
  nextStep?: number; // permet de sauter à une autre étape
}

interface DialogueChoice {
  label: string;
  value: string;
  nextStep: number; // où aller après ce choix
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  private dialogs: DialogueStep[] = [
    { speaker: 'Professeur Merdant', text: "Salut, jeune futur dresseur de Shlagémon !" },
    {
      speaker: 'Professeur Merdant', text: "Voici trois Shlagémons. Choisis-en un.",
      choices: [
        { label: 'BoustifleurRouillé', value: 'br', nextStep: 4 },
        { label: 'Mokasson', value: 'mk', nextStep: 5 },
        { label: 'Crottax', value: 'cr', nextStep: 6 },
      ]
    },
    { speaker: 'Professeur Merdant', text: "Tu l'as choisi ? Bravo !" },
  ];

}
