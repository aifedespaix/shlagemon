import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { Header } from './layout/header/header';
import { ThemeService } from './layout/theme/theme.service';
import { StorageService } from './core/storage.service';
import { MatButtonModule } from '@angular/material/button';
import { Game } from './layout/game/game';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, MatButtonModule, LayoutModule, Header, Game],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Shlagémon';
  constructor(public theme: ThemeService, _storage: StorageService) { }
}
