import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchlagedexService } from '../../shlagemon/schlagedex.service';
import { Observable } from 'rxjs';
import { DexShlagemon } from '../../shlagemon/dex-shlagemon';

@Component({
  selector: 'app-panel-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-main.html',
  styleUrl: './panel-main.scss'
})
export class SelectedShlagemon {
  mon$!: Observable<DexShlagemon | null>;

  constructor(private dex: SchlagedexService) {
    this.mon$ = this.dex.activeShlagemon$;
  }

  imageUrl(id: string) {
    return `/shlagemons/${id}/${id}.png`;
  }
}
