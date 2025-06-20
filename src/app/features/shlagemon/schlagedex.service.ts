import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DexShlagemon } from './dex-shlagemon';
import { DexShlagemonFactory } from './dex-shlagemon.factory';
import { BaseShlagemon } from '../../Shlagemon/shlagemons';

@Injectable({ providedIn: 'root' })
export class SchlagedexService {
  private monsSubject = new BehaviorSubject<DexShlagemon[]>([]);
  shlagemons$ = this.monsSubject.asObservable();

  constructor(private factory: DexShlagemonFactory) { }

  createShlagemon(base: BaseShlagemon): DexShlagemon {
    const mon = this.factory.create(base);
    this.addShlagemon(mon);
    return mon;
  }

  addShlagemon(mon: DexShlagemon) {
    this.monsSubject.next([...this.monsSubject.value, mon]);
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
