import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injury } from 'src/app/types/injury';

@Component({
  selector: 'app-barem-injury',
  templateUrl: './barem-injury.component.html',
  styleUrls: ['./barem-injury.component.scss']
})
export class BaremInjuryComponent implements OnInit {

  @Input() injury: Injury;
  @Output() scoreEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  emittScore(score: number): void {
    this.scoreEmitter.emit(score);
  }

}
