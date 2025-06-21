import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MainPanelComponent } from './main-panel/main-panel.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatProgressBarModule, MainPanelComponent],
  exports: [MainPanelComponent]
})
export class BattleModule {}
