import { BaseShlagemon, Type } from '../../shlagemons';

export class DexShlagemon implements BaseShlagemon {
  constructor(
    public id: string,
    public name: string,
    public color: string,
    public description: string,
    public type: Type,
    public rarity: number,
    public hp: number,
    public attack: number,
    public defense: number,
  ) {}
}
