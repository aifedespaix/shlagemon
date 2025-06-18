import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SchlagedexService } from '../schlagedex.service';

@Component({
  selector: 'app-schlagedex',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './schlagedex.html',
  styleUrl: './schlagedex.scss'
})
export class Schlagedex {
  constructor(public dex: SchlagedexService) {}
}
