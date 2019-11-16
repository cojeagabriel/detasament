import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CaseService} from '../../services/case.service';

@Component({
  selector: 'app-case-card',
  templateUrl: './case-card.component.html',
  styleUrls: ['./case-card.component.scss']
})
export class CaseCardComponent implements OnInit {
  @Input() case;
  @Output() deleted = new EventEmitter<boolean>();

  constructor(private caseService: CaseService) {
  }

  ngOnInit() {
  }

  deleteCase(casecode) {
    this.caseService.deleteCase(casecode).subscribe(data => {
      this.deleted.emit(casecode);
    });
  }
}
