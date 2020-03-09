import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injury } from 'src/app/types/injury';

@Component({
  selector: 'app-injury-list-item',
  templateUrl: './injury-list-item.component.html',
  styleUrls: ['./injury-list-item.component.scss']
})
export class InjuryListItemComponent implements OnInit {

  @Input() injury!: Injury;
  @Input() selectable?: boolean;

  @Output() select: EventEmitter<Injury>;
  @Output() remove: EventEmitter<Injury>;

  constructor() { }

  ngOnInit() {
  }

}
