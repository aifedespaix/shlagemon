// game-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private hasPokemonSubject = new BehaviorSubject<boolean>(false);
  hasPokemon$ = this.hasPokemonSubject.asObservable();

  private dialogStepSubject = new BehaviorSubject<number>(0);
  dialogStep$ = this.dialogStepSubject.asObservable();

  // Pour mettre à jour l'état
  setHasPokemon(has: boolean) {
    this.hasPokemonSubject.next(has);
  }

  setDialogStep(step: number) {
    this.dialogStepSubject.next(step);
  }

  reset() {
    this.hasPokemonSubject.next(false);
    this.dialogStepSubject.next(0);
  }
}
