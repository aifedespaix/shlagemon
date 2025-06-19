import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShlagemonDetailDialog } from './shlagemon-detail-dialog';
import { SchlagedexService } from '../schlagedex.service';
import { DexShlagemon } from '../dex-shlagemon';

@Component({
  selector: 'app-schlagedex',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDialogModule, ShlagemonDetailDialog],
  templateUrl: './schlagedex.html',
  styleUrl: './schlagedex.scss'
})
export class Schlagedex {
  constructor(public dex: SchlagedexService, private dialog: MatDialog) {}

  openDialog(mon: DexShlagemon) {
    this.dialog.open(ShlagemonDetailDialog, { data: mon });
  }

  imageUrl(mon: DexShlagemon) {
    return `/shlagemons/${mon.id}/${mon.id}.png`;
  }
}
