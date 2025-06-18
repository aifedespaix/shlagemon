import { Component } from '@angular/core';
import { DialogBox } from '../../dialog/dialog-box/dialog-box';
import { DialogNode } from '../../dialog/dialog.model';
import { GameStateService } from '../../../core/game-state.service';

@Component({
  selector: 'app-choice-dialog',
  imports: [DialogBox],
  templateUrl: './choice-dialog.html',
  styleUrl: './choice-dialog.scss'
})
export class ChoiceDialog {

  constructor(private gameState: GameStateService) { }

  dialogTree: DialogNode[] = [
    {
      id: 'start',
      text: 'Salut, tu veux quel Shlagémon ?',
      responses: [
        { label: 'Schlartichaut', nextId: 'confirmSchlartichaut' },
        { label: 'Draschlakofeu', nextId: 'confirmDraschlakofeu' }
      ]
    },
    {
      id: 'confirmSchlartichaut',
      text: 'Très bon choix ! Tu vas adorer son haleine.',
      responses: [
        {
          label: 'Merci professeur Merdant',
          action: () => this.gameState.setHasPokemon(true)
        }
      ]
    },
    {
      id: 'confirmDraschlakofeu',
      text: 'Attention, il rote du feu.',
      responses: [
        {
          label: 'Génial !',
          action: () => this.gameState.setHasPokemon(true)
        }
      ]
    }
  ];
}
