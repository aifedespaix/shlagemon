import { BaseShlagemon } from '../../Shlagemon/shlagemons';
import { ShlagemonType } from '../../Shlagemon/shlagemons-type';

export class DexShlagemon implements BaseShlagemon {
  constructor(
    public id: string,
    public name: string,
    public color: string,
    public description: string,
    public type: ShlagemonType,
    public lvl: number,
    public rarity: number,
    public hp: number,
    public attack: number,
    public defense: number,
    public smelling: number,
  ) { }
}
