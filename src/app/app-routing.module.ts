import { CreateCasualtyComponent } from './components/create-casualty/create-casualty.component';
import { CreateCaseV2Component } from './components/create-case-v2/create-case-v2.component';
import { CasesV2Component } from './components/cases-v2/cases-v2.component';
import { InjuryV2Component } from './components/injury-v2/injury-v2.component';
import { CanDeactivateGuardGuard } from './guards/can-deactivate-guard.guard';
import { CreateInjuryV2Component } from './components/create-injury-v2/create-injury-v2.component';
import { TriageComponent } from './components/triage/triage.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InjuriesV2Component } from './components/injuries-v2/injuries-v2.component';
import { CasualtiesComponent } from './components/casualties/casualties.component';
import { CasualtyComponent } from './components/casualty/casualty.component';
import { InjuriesV3Component } from './components/injuries-v3/injuries-v3.component';
import { InjuryV3Component } from './components/injury-v3/injury-v3.component';
import { InjuryFormComponent } from './components/injury-form/injury-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { state: '0' } },
  { path: 'injuries',
    children: [
      { path: '', component: InjuriesV3Component, data: { state: '1' } },
      { path: 'create', component: InjuryFormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } },
      { path: ':id',
        children: [
          { path: '', component: InjuryV3Component, data: { state: '2' } },
          { path: 'edit', component: InjuryFormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } }
        ],
        data: { state: '2' }
      },
    ],
    data: { state: '1' }
  },
  { path: 'cases',
    children: [
      { path: '', component: CasesV2Component, data: { state: '1' } },
      { path: 'create', component: CreateCaseV2Component, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } }
    ]
  },
  {
    path: 'casualties',
    children: [
      { path: '', component: CasualtiesComponent, data: { state: '1' } },
      { path: 'create', component: CreateCasualtyComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } },
      {
        path: ':id',
        children: [
          { path: '', component: CasualtyComponent, data: { state: '2' } },
          { path: 'edit', component: CreateCasualtyComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } }
        ],
        data: { state: '2' }
      },
    ]
  },
  { path: 'create-casualty', component: CreateCasualtyComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '1' } },
  { path: 'triage', component: TriageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
