import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SchlagedexService } from '../../shlagemon/schlagedex.service';
import { DexShlagemon } from '../../shlagemon/dex-shlagemon';
import { ShlagemonType } from '../../shlagemon/shlagemon-type/shlagemon-type';

@Component({
  selector: 'app-panel-shlagemon-active',
  standalone: true,
  imports: [CommonModule, ShlagemonType],
  templateUrl: './panel-shlagemon-active.html',
  styleUrl: './panel-shlagemon-active.scss'
})
export class ActiveShlagemonPanel {
  mon$!: Observable<DexShlagemon | null>;

  constructor(private dex: SchlagedexService) {
    this.mon$ = this.dex.activeShlagemon$;
  }

  imageUrl(mon: DexShlagemon) {
    return `/shlagemons/${mon.id}/${mon.id}.png`;
  }
}
