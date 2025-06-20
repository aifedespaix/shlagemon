import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchlagedexService } from '../schlagedex.service';
import { Observable, map } from 'rxjs';
import { DexShlagemon } from '../dex-shlagemon';

@Component({
  selector: 'app-selected-shlagemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-shlagemon.html',
  styleUrl: './selected-shlagemon.scss'
})
export class SelectedShlagemon {
  mon$!: Observable<DexShlagemon | undefined>;

  constructor(private dex: SchlagedexService) {
    this.mon$ = this.dex.shlagemons$.pipe(map(mons => mons[0]));
  }

  imageUrl(id: string) {
    return `/shlagemons/${id}/${id}.png`;
  }
}
