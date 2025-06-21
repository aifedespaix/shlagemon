import { Component, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription, interval, timer, Observable } from 'rxjs';
import { DexShlagemon } from '../../shlagemon/dex-shlagemon';
import { SchlagedexService } from '../../shlagemon/schlagedex.service';
import { DexShlagemonFactory } from '../../shlagemon/dex-shlagemon.factory';
import { GameService } from '../../../core/game.service';
import { bulgrosboule, carapouffe, salamiches, BaseShlagemon } from '../../../Shlagemon/shlagemons';

import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss'
})
export class MainPanelComponent {
  player$!: Observable<DexShlagemon | null>;
  enemy$ = new BehaviorSubject<DexShlagemon | null>(null);

  playerHp = 0;
  enemyHp = 0;

  private battleSub?: Subscription;
  battleActive = false;

  flashPlayer = false;
  flashEnemy = false;

  shlagidolar$!: Observable<number>;

  private enemies: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule];

  constructor(
    private dex: SchlagedexService,
    private factory: DexShlagemonFactory,
    private game: GameService
  ) {
    this.shlagidolar$ = this.game.shlagidolar$;
    this.player$ = this.dex.activeShlagemon$;
    this.player$.subscribe((mon) => {
      if (mon && !this.battleActive && !this.battleSub) {
        this.startBattle();
      }
    });
  }

  @HostListener('click')
  onClick() {
    if (!this.battleActive) return;
    const enemy = this.enemy$.value;
    const player = this.dex.getActiveShlagemon();
    if (!enemy || !player) return;
    this.attack(enemy, 'enemy');
  }

  private startBattle() {
    const player = this.dex.getActiveShlagemon();
    if (!player) return;

    const base = this.enemies[Math.floor(Math.random() * this.enemies.length)];
    const enemy = this.factory.create(base);
    this.enemy$.next(enemy);

    this.playerHp = player.hp;
    this.enemyHp = enemy.hp;
    this.battleActive = true;

    this.battleSub = interval(1000).subscribe(() => this.tick());
  }

  private tick() {
    const player = this.dex.getActiveShlagemon();
    const enemy = this.enemy$.value;
    if (!player || !enemy) return;

    this.attack(enemy, 'enemy');
    this.attack(player, 'player');

    this.checkEnd(player, enemy);
  }

  private attack(target: DexShlagemon, who: 'player' | 'enemy') {
    if (who === 'enemy') {
      this.enemyHp = Math.max(0, this.enemyHp - (this.dex.getActiveShlagemon()?.attack ?? 0));
      this.flashEnemy = true;
      setTimeout(() => (this.flashEnemy = false), 100);
    } else {
      this.playerHp = Math.max(0, this.playerHp - target.attack);
      this.flashPlayer = true;
      setTimeout(() => (this.flashPlayer = false), 100);
    }
  }

  private checkEnd(player: DexShlagemon, enemy: DexShlagemon) {
    if (this.playerHp <= 0 || this.enemyHp <= 0) {
      this.battleSub?.unsubscribe();
      this.battleSub = undefined;
      this.battleActive = false;

      if (this.enemyHp <= 0 && this.playerHp > 0) {
        this.game.addShlagidolar(1);
      }
      timer(1000).subscribe(() => this.startBattle());
    }
  }

  playerHpPercent(max: number) {
    return (this.playerHp / max) * 100;
  }

  enemyHpPercent(max: number) {
    return (this.enemyHp / max) * 100;
  }

  imageUrl(mon: DexShlagemon) {
    return `/shlagemons/${mon.id}/${mon.id}.png`;
  }
}
