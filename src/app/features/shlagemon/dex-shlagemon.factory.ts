import { Injectable } from '@angular/core';
import { BaseShlagemon } from '../../Shlagemon/shlagemons';
import { DexShlagemon } from './dex-shlagemon';

@Injectable({ providedIn: 'root' })
export class DexShlagemonFactory {
  create(base: BaseShlagemon): DexShlagemon {
    // Simple default stats for now
    return new DexShlagemon(
      base.id,
      base.name,
      base.color,
      base.description,
      base.type,
      1,
      1, // rarity
      50, // hp
      10, // attack
      10, // defense
      1, // smeell
    );
  }
}
