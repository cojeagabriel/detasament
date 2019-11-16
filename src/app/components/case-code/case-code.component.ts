import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-case-code',
  templateUrl: './case-code.component.html',
  styleUrls: ['./case-code.component.scss']
})
export class CaseCodeComponent implements OnInit {

  @Input() caseCode: string;

  constructor() { }

  ngOnInit() {
  }

}
