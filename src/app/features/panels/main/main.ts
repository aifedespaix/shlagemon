import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchlagedexService } from '../../shlagemon/schlagedex.service';
import { Observable, map } from 'rxjs';
import { DexShlagemon } from '../../shlagemon/dex-shlagemon';

@Component({
  selector: 'app-panel-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss'
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
