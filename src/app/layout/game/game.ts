import { Component } from '@angular/core';
import { Card } from '../card/card';
import { GameStateService } from '../../core/game-state.service';
import { ChoiceDialog } from '../../features/shlagemon/choice-dialog/choice-dialog';
import { SelectedShlagemon } from '../../features/panels/main/main';
import { Schlagedex } from '../../features/shlagemon/schlagedex/schlagedex';
import { SchlagedexService } from '../../features/shlagemon/schlagedex.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [ChoiceDialog, SelectedShlagemon, Schlagedex, CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {

  constructor(public gameState: GameStateService, public dex: SchlagedexService) { }

}
