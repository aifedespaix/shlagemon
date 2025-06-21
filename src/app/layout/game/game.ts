import { Component } from '@angular/core';
import { Card } from '../card/card';
import { GameStateService } from '../../core/game-state.service';
import { ChoiceDialog } from '../../features/panels/panel-starter/panel-starter';
import { MainPanelComponent } from '../../features/battle/main-panel/main-panel.component';
import { ActiveShlagemonPanel } from '../../features/panels/panel-shlagemon-active/panel-shlagemon-active';
import { Schlagedex } from '../../features/shlagemon/schlagedex/schlagedex';
import { SchlagedexService } from '../../features/shlagemon/schlagedex.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [ChoiceDialog, MainPanelComponent, ActiveShlagemonPanel, Schlagedex, CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {

  constructor(public gameState: GameStateService, public dex: SchlagedexService) { }

}
