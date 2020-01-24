import { CaseV2 } from './../../types/case-v2.d';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-case-card-v2',
  templateUrl: './case-card-v2.component.html',
  styleUrls: ['./case-card-v2.component.scss']
})
export class CaseCardV2Component implements OnInit {

  @Input() case: CaseV2;

  constructor() { }

  ngOnInit() {
    // console.log(this.case);
  }

}
