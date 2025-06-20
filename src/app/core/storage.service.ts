import { Injectable } from '@angular/core';
import { SchlagedexService } from '../features/shlagemon/schlagedex.service';
import { GameStateService } from './game-state.service';
import { DexShlagemon } from '../features/shlagemon/dex-shlagemon';

interface SaveData {
  shlagemons: DexShlagemon[];
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly key = 'save';

  constructor(private dex: SchlagedexService, private game: GameStateService) {
    this.load();
    this.dex.shlagemons$.subscribe(() => this.save());
  }

  private load() {
    if (typeof localStorage === 'undefined') return;
    const raw = localStorage.getItem(this.key);
    if (!raw) return;
    try {
      const data: SaveData = JSON.parse(raw);
      if (data.shlagemons) {
        this.dex.setShlagemons(data.shlagemons);
        if (data.shlagemons.length > 0) {
          this.game.setHasPokemon(true);
        }
      }
    } catch (e) {
      console.error('Failed to parse save data', e);
    }
  }

  private save() {
    if (typeof localStorage === 'undefined') return;
    const data: SaveData = {
      shlagemons: this.dex.getShlagemons(),
    };
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  reset() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.key);
    }
    this.dex.clear();
    this.game.reset();
  }
}
