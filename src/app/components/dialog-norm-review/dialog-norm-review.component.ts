import { CasualtyRecord } from './../../types/casualty-record.d';
import { ScreenService } from './../../services/screen.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-norm-review',
  templateUrl: './dialog-norm-review.component.html',
  styleUrls: ['./dialog-norm-review.component.scss']
})
export class DialogNormReviewComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogNormReviewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { record: CasualtyRecord },
    private screenService: ScreenService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.screenService.close();
  }

}
