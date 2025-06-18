import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogNode } from '../dialog.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule],
  templateUrl: './dialog-box.html',
  styleUrls: ['./dialog-box.scss']
})
export class DialogBox {
  @Input() speaker = '';
  @Input() avatarUrl = '';
  @Input() dialogTree: DialogNode[] = [];

  currentNode?: DialogNode;

  ngOnInit() {
    this.currentNode = this.dialogTree[0];
  }

  choose(response: DialogNode['responses'][0]) {
    if (response.nextId) {
      this.currentNode = this.dialogTree.find(d => d.id === response.nextId);
    } else if (response.action) {
      response.action();
    }
  }
}
