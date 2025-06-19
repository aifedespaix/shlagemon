import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DexShlagemon } from '../dex-shlagemon';

@Component({
  selector: 'app-shlagemon-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './shlagemon-detail-dialog.html',
  styleUrl: './shlagemon-detail-dialog.scss',
})
export class ShlagemonDetailDialog {
  constructor(
    public dialogRef: MatDialogRef<ShlagemonDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public mon: DexShlagemon,
  ) { }

  imageUrl(mon: DexShlagemon) {
    return `/shlagemons/${mon.id}/${mon.id}.png`;
  }
}
