import { InjuryV2 } from './../../types/injury-v2.d';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-injury-list-item',
  templateUrl: './injury-list-item.component.html',
  styleUrls: ['./injury-list-item.component.scss']
})
export class InjuryListItemComponent implements OnInit {

  @Input() injury!: InjuryV2;
  @Input() selectable?: boolean;

  @Output() select: EventEmitter<InjuryV2>;
  @Output() remove: EventEmitter<InjuryV2>;

  constructor() { }

  ngOnInit() {
  }

}
