import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  private shlagidolarSubject = new BehaviorSubject<number>(0);
  shlagidolar$ = this.shlagidolarSubject.asObservable();

  addShlagidolar(amount: number) {
    this.shlagidolarSubject.next(this.shlagidolarSubject.value + amount);
  }

  getShlagidolar(): number {
    return this.shlagidolarSubject.value;
  }
}
