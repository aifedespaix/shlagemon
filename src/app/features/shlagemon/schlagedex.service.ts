import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shlagemon } from './shlagemon.model';

@Injectable({ providedIn: 'root' })
export class SchlagedexService {
  private monsSubject = new BehaviorSubject<Shlagemon[]>([]);
  shlagemons$ = this.monsSubject.asObservable();

  createShlagemon(name: string): Shlagemon {
    const mon: Shlagemon = { id: name.toLowerCase(), name };
    this.addShlagemon(mon);
    return mon;
  }

  addShlagemon(mon: Shlagemon) {
    this.monsSubject.next([...this.monsSubject.value, mon]);
  }

  getShlagemons(): Shlagemon[] {
    return this.monsSubject.value;
  }
}
