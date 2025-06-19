import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SchlagedexService } from '../schlagedex.service';
import { DexShlagemon } from '../dex-shlagemon';

@Component({
  selector: 'app-schlagedex',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './schlagedex.html',
  styleUrl: './schlagedex.scss'
})
export class Schlagedex {
  selected?: DexShlagemon;

  constructor(public dex: SchlagedexService) {}

  select(mon: DexShlagemon) {
    this.selected = mon;
  }

  imageUrl(mon: DexShlagemon) {
    return `/shlagemons/${mon.id}/${mon.id}.png`;
  }
}
