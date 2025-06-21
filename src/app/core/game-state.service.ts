// game-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private hasPokemonSubject = new BehaviorSubject<boolean>(false);
  hasPokemon$ = this.hasPokemonSubject.asObservable();

  private dialogStepSubject = new BehaviorSubject<number>(0);
  dialogStep$ = this.dialogStepSubject.asObservable();

  private activeShlagemonIdSubject = new BehaviorSubject<string | null>(null);
  activeShlagemonId$ = this.activeShlagemonIdSubject.asObservable();

  // Pour mettre à jour l'état
  setHasPokemon(has: boolean) {
    this.hasPokemonSubject.next(has);
  }

  setDialogStep(step: number) {
    this.dialogStepSubject.next(step);
  }

  setActiveShlagemonId(id: string | null) {
    this.activeShlagemonIdSubject.next(id);
  }

  getActiveShlagemonId(): string | null {
    return this.activeShlagemonIdSubject.value;
  }

  reset() {
    this.hasPokemonSubject.next(false);
    this.dialogStepSubject.next(0);
    this.activeShlagemonIdSubject.next(null);
  }
}
