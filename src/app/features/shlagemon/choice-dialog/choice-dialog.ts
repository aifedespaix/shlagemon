import { Component } from '@angular/core';
import { DialogBox } from '../../dialog/dialog-box/dialog-box';
import { DialogNode } from '../../dialog/dialog.model';
import { GameStateService } from '../../../core/game-state.service';
import { SchlagedexService } from '../schlagedex.service';

@Component({
  selector: 'app-choice-dialog',
  imports: [DialogBox],
  templateUrl: './choice-dialog.html',
  styleUrl: './choice-dialog.scss'
})
export class ChoiceDialog {

  constructor(private gameState: GameStateService, private dex: SchlagedexService) { }

  dialogTree: DialogNode[] = [
    {
      id: 'start',
      text: 'Salut, tu veux quel Shlagémon ?',
      responses: [
        {
          label: 'Schlartichaut',
          nextId: 'confirmSchlartichaut',
          imageUrl: '/items/shlagéball/shlagéball.png'
        },
        {
          label: 'Draschlakofeu',
          nextId: 'confirmDraschlakofeu',
          imageUrl: '/items/shlagéball/shlagéball.png'
        }
      ]
    },
    {
      id: 'confirmSchlartichaut',
      text: 'Très bon choix ! Tu vas adorer son haleine.',
      responses: [
        {
          label: 'Merci professeur Merdant',
          action: () => {
            this.dex.createShlagemon('Schlartichaut');
            this.gameState.setHasPokemon(true);
          }
        }
      ]
    },
    {
      id: 'confirmDraschlakofeu',
      text: 'Attention, il rote du feu.',
      responses: [
        {
          label: 'Génial !',
          action: () => {
            this.dex.createShlagemon('Draschlakofeu');
            this.gameState.setHasPokemon(true);
          }
        }
      ]
    }
  ];
}
