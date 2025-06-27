import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameStateService } from '../../core/game-state.service';
import { DexShlagemon } from './dex-shlagemon';
import { DexShlagemonFactory } from './dex-shlagemon.factory';
import { BaseShlagemon } from '../../Shlagemon/shlagemons';

@Injectable({ providedIn: 'root' })
export class SchlagedexService {
  private monsSubject = new BehaviorSubject<DexShlagemon[]>([]);
  shlagemons$ = this.monsSubject.asObservable();

  private activeMonSubject = new BehaviorSubject<DexShlagemon | null>(null);
  activeShlagemon$ = this.activeMonSubject.asObservable();

  constructor(private factory: DexShlagemonFactory, private game: GameStateService) { }

  createShlagemon(base: BaseShlagemon): DexShlagemon {
    const mon = this.factory.create(base);
    this.addShlagemon(mon);
    if (!this.activeMonSubject.value) {
      this.setActiveShlagemon(mon);
    }
    return mon;
  }

  addShlagemon(mon: DexShlagemon) {
    this.monsSubject.next([...this.monsSubject.value, mon]);
  }

  setActiveShlagemon(mon: DexShlagemon) {
    this.activeMonSubject.next(mon);
    this.game.setActiveShlagemonId(mon.id);
  }

  getActiveShlagemon(): DexShlagemon | null {
    return this.activeMonSubject.value;
  }

  setShlagemons(mons: DexShlagemon[]) {
    this.monsSubject.next([...mons]);
  }

  clear() {
    this.monsSubject.next([]);
  }

  getShlagemons(): DexShlagemon[] {
    return this.monsSubject.value;
  }
}
