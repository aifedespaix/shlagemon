import { Component } from '@angular/core';
import { Card } from '../card/card';
import { GameStateService } from '../../core/game-state.service';
import { ChoiceDialog } from '../../features/shlagemon/choice-dialog/choice-dialog';

@Component({
  selector: 'app-game',
  imports: [ChoiceDialog],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {

  constructor(private gameState: GameStateService) { }

}
