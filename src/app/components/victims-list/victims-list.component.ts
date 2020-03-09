import { CasualtyService } from './../../services/casualty.service';
import { switchMap, map, shareReplay, startWith, withLatestFrom, scan, reduce, mergeScan, take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { CaseService } from 'src/app/services/case.service';
import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/types/case';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Subject } from 'rxjs';
import { Casualty } from 'src/app/types/casualty';

@Component({
  selector: 'app-victims-list',
  templateUrl: './victims-list.component.html',
  styleUrls: ['./victims-list.component.scss']
})
export class VictimsListComponent implements OnInit {
  case$: Observable<Case>;
  pick$: Subject<string> = new Subject<null>();
  pickedVictims$: Observable<Casualty[]>;
  caseCode = '';

  constructor(
    private caseService: CaseService,
    private casualtyService: CasualtyService
  ) {}

  ngOnInit() {

    // this.case$ = this.caseService.getCase().pipe(shareReplay(1));

    // this.pickedVictims$ = this.pick$.pipe(
    //   // tslint:disable-next-line: deprecation
    //   startWith(null),
    //   withLatestFrom(this.case$),
    //   mergeScan(
    //     (prev, [victimId, cs]) => {
    //       if (victimId) { return this.replaceVictimsByIds(prev, cs, [victimId]); }

    //       if (prev.length) {
    //         return this.replaceVictimsByIds(prev, cs, this.getVictimsIds(prev));
    //       }

    //       return this.casualtyService.getCasualties({
    //         context: cs.context,
    //         count: cs.count
    //       });
    //     },
    //     [] as Casualty[]
    //   )
    // );

  }

  // replaceVictimsByIds(
  //   prevVictims: Casualty[],
  //   cs: Case,
  //   replaceIds: string[]
  // ): Observable<Casualty[]> {
  //   return this.casualtyService
  //     .getCasualties({
  //       context: cs.context,
  //       count: replaceIds.length,
  //       excludeIds: this.getVictimsIds(prevVictims)
  //     })
  //     .pipe(
  //       map(victims => {
  //         return prevVictims.map(victim => {
  //           if (replaceIds.includes(victim._id)) {
  //             return victims.pop();
  //           }
  //           return victim;
  //         });
  //       })
  //     );
  // }

  // getVictimsIds(victims: Casualty[]): string[] {
  //   return victims.map(victim => victim._id);
  // }

  // refreshPicks() {
  //   this.pick$.next(null);
  // }

  // refreshPick(id: string) {
  //   this.pick$.next(id);
  // }

  // createCase() {
  //   this.pickedVictims$
  //     .pipe(
  //       take(1),
  //       untilDestroyed(this),
  //       switchMap(victims =>
  //         this.caseService
  //           .patchCase({
  //             victims: this.getVictimsIds(victims)
  //           })
  //           .pipe(
  //             switchMap(cs => {
  //               console.log(cs);
  //               return this.caseService.postCase(cs);
  //             })
  //           )
  //       )
  //     )
  //     .subscribe(cs => {
  //       this.caseCode = cs.caseCode;
  //     });
  // }

  // ngOnDestroy() {}
}
