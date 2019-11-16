import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-add-score',
  templateUrl: './dialog-add-score.component.html',
  styleUrls: ['./dialog-add-score.component.scss']
})
export class DialogAddScoreComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
