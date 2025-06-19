import { Component } from '@angular/core';
import { DialogBox } from '../../dialog/dialog-box/dialog-box';
import { DialogNode } from '../../dialog/dialog.model';
import { GameStateService } from '../../../core/game-state.service';
import { SchlagedexService } from '../schlagedex.service';
import { bulgrosboule, carapouffe, salamiches, BaseShlagemon } from '../../../shlagemons';

@Component({
  selector: 'app-choice-dialog',
  imports: [DialogBox],
  templateUrl: './choice-dialog.html',
  styleUrl: './choice-dialog.scss'
})
export class ChoiceDialog {

  constructor(private gameState: GameStateService, private dex: SchlagedexService) { }

  private shlagemonNextId(shlagemon: BaseShlagemon) {
    return 'confirm' + shlagemon.name;
  }

  private shlagemonImageUrl(shlagemon: BaseShlagemon) {
    return `/shlagemons/${shlagemon.id}/${shlagemon.id}.png`;
  }

  private generateResponse(shlagemon: BaseShlagemon) {
    return {
      label: shlagemon.name,
      nextId: this.shlagemonNextId(shlagemon),
      imageUrl: `/items/shlagéball/shlagéball.png`,
      color: shlagemon.color
    }
  }

  dialogTree: DialogNode[] = [
    {
      id: 'start',
      text: 'Salut, je suis le Professeur Merdant, mes amis disent que je sent bon.',
      responses: [
        {
          label: "Tu n'as pas l'air très intelligent.",
          nextId: "2"
        }
      ]
    },
    {
      id: '2',
      text: "Je t'emmerde mon petit, pour la peine, je vais te forcer à adopter un de mes Shlagémons.",
      responses: [
        {
          label: "Ho nooon, pas un Shlagémon, ils sentent trop mauvais !",
          nextId: "choice"
        }
      ]
    },
    {
      id: 'choice',
      text: 'Je te laisse choisir le moins pire, tu veux quel Shlagémon ?',
      responses: [
        this.generateResponse(carapouffe),
        this.generateResponse(salamiches),
        this.generateResponse(bulgrosboule)
      ]
    },
    {
      id: this.shlagemonNextId(carapouffe),
      text: 'Attention, il ne sait pas nager.',
      imageUrl: this.shlagemonImageUrl(carapouffe),
      responses: [
        {
          label: "T'as pas mieux que cette merde ?",
          nextId: "choice"
        },
        {
          label: 'Merci professeur Merdant',
          action: () => {
            this.dex.createShlagemon(carapouffe);
            this.gameState.setHasPokemon(true);
          }
        }
      ]
    },
    {
      id: this.shlagemonNextId(salamiches),
      text: 'Attention, il rote du feu quand il mange du pain.',
      imageUrl: this.shlagemonImageUrl(salamiches),
      responses: [
        {
          label: "T'as pas mieux que cette merde ?",
          nextId: "choice"
        },
        {
          label: 'Génial !',
          action: () => {
            this.dex.createShlagemon(salamiches);
            this.gameState.setHasPokemon(true);
          }
        }
      ]
    },
    {
      id: this.shlagemonNextId(bulgrosboule),
      text: 'Je te déconseille de choisir celui là, il est horriblement mauvais.',
      imageUrl: this.shlagemonImageUrl(bulgrosboule),
      responses: [

        {
          label: "T'as pas mieux que cette merde ?",
          nextId: "choice"
        },
        {
          label: 'Je l\'aime pas trop mais ok',
          action: () => {
            this.dex.createShlagemon(bulgrosboule);
            this.gameState.setHasPokemon(true);
          }
        }
      ]
    }
  ];
}
