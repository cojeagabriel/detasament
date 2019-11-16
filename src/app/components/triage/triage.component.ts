import { startWith, map, shareReplay } from 'rxjs/operators';
import { TriageCasualty } from './../../types/triage-casualty.d';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

declare var Chance: any;

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss']
})
export class TriageComponent implements OnInit {

  triageCasualty: TriageCasualty;

  childAgeThreshold = 13;
  score = {
    correct: 0,
    wrong: 0
  };
  openAirway = false;
  insufflations = false;
  pristine = true;
  result: boolean = null;

  chance = new Chance();

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.triageCasualty = this.generateTriageCasualty();
  }

  generate(): void {
    this.triageCasualty = this.generateTriageCasualty();
    this.pristine = true;
    this.result = null;
    this.openAirway = false;
    this.insufflations = false;
  }

  generateTriageCasualty(): TriageCasualty {

    let triageCasualty: TriageCasualty = {};

    triageCasualty.name = this.chance.name({ nationality: 'en' });
    triageCasualty.age = this.chance.weighted([this.chance.integer({ min: 2, max: 12 }),this.chance.integer({ min: 12, max: 70 })], [0.33, 1]);
    triageCasualty.breathing = this.chance.weighted([0, this.chance.integer({ min: 0, max: 50 })], [1, 1.5]);

    if (triageCasualty.breathing === 0) {
      let rand = this.chance.bool();
      if (rand) {
        triageCasualty.openAirway = true;
        triageCasualty.insufflations = true;
      } else {
        triageCasualty.openAirway = false;

        if (triageCasualty.age < this.childAgeThreshold){
          let rand = this.chance.bool();
          if (rand) {
            triageCasualty.insufflations = true;
          } else {
            triageCasualty.insufflations = false;
          }
        } else {
          triageCasualty.insufflations = false;
        }
      }

      triageCasualty.TRC = 0;
      triageCasualty.mentalStatus = false;
      triageCasualty.canWalk = false;
    } else {
      triageCasualty.openAirway = true;
      triageCasualty.insufflations = true;

      triageCasualty.TRC = this.chance.floating({ min: 0, max: 3, fixed: 2 });

      let rand = this.chance.bool();
      if (rand) {
        triageCasualty.mentalStatus = true;

        let rand = this.chance.bool();
        if (rand) {
          triageCasualty.canWalk = true;
        } else {
          triageCasualty.canWalk = false;
        }
      } else {
        triageCasualty.mentalStatus = false;
        triageCasualty.canWalk = false;
      }

    }

    triageCasualty.tag = this.calculateTag(triageCasualty);

    // console.log(JSON.parse(JSON.stringify(triageCasualty)));

    return triageCasualty;
  }

  calculateTag(triageCasualty: TriageCasualty): string {
    if (triageCasualty.canWalk) {
      return "green";
    }

    if (triageCasualty.breathing === 0) {
      if (triageCasualty.openAirway === false) {
        if (triageCasualty.age < this.childAgeThreshold) {
          if (triageCasualty.insufflations === false) {
            return "black"
          }

          return "red";
        }

        return "black";
      }

      return "red";
    }

    if (triageCasualty.age < this.childAgeThreshold && (triageCasualty.breathing < 15 || triageCasualty.breathing > 40)) {
      return "red";
    }

    if (triageCasualty.breathing > 30) {
      return "red";
    }

    if (triageCasualty.TRC > 2) {
      return "red";
    }

    if (triageCasualty.mentalStatus === false) {
      return "red";
    }

    return "yellow";
  }

  verify(tag: string) {
    if (this.triageCasualty.tag == tag) {
      this.result = true;
      if (this.pristine == true) {
        this.score.correct++;
      }
    } else {
      this.result = false;
      if (this.pristine == true) {
        this.score.wrong++;
      }
    }
    this.pristine = false;
  }

  snackValue(value) {
    this._snackBar.open(`${value}`, '', {
      verticalPosition: 'top',
      duration: 3000
    });
  }

  showAirway() {
    this.openAirway = true;
  }

  showInsufflations() {
    this.insufflations = true;
  }

}
