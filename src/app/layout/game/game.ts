import { Component } from '@angular/core';
import { Card } from '../card/card';
import { GameStateService } from '../../core/game-state.service';
import { ChoiceDialog } from '../../features/shlagemon/choice-dialog/choice-dialog';
import { SelectedShlagemon } from '../../features/shlagemon/selected-shlagemon/selected-shlagemon';
import { Schlagedex } from '../../features/shlagemon/schlagedex/schlagedex';
import { SchlagedexService } from '../../features/shlagemon/schlagedex.service';

@Component({
  selector: 'app-game',
  imports: [ChoiceDialog, SelectedShlagemon, Schlagedex],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {

  constructor(public gameState: GameStateService, public dex: SchlagedexService) { }

}
