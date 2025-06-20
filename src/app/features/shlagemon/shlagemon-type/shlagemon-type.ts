import { Component, Input } from '@angular/core';
import { ShlagemonType as TShlagemonType } from '../../../Shlagemon/shlagemons-type';

@Component({
  selector: 'shlagemon-type',
  imports: [],
  templateUrl: './shlagemon-type.html',
  styleUrl: './shlagemon-type.scss',
  standalone: true
})
export class ShlagemonType {
  @Input() value!: TShlagemonType;

  style() {
    return `background-color: ${this.value.color}; color: ${this.getAdjustedTextColor()}`
  }

  getAdjustedTextColor(amount = 60): string {
    const hex = this.value.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calcul de la luminosité perçue (standard WCAG)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Si trop clair, on assombrit ; sinon, on éclaircit
    const isBright = brightness > 160; // tu peux ajuster ce seuil

    const adjust = (c: number) =>
      Math.min(255, Math.max(0, c + (isBright ? -amount : amount)));

    const newR = adjust(r);
    const newG = adjust(g);
    const newB = adjust(b);

    return `#${[newR, newG, newB]
      .map((c) => c.toString(16).padStart(2, '0'))
      .join('')}`;
  }
}
