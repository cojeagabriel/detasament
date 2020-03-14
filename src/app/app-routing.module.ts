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
import { CasualtiesV2Component } from './components/casualties-v2/casualties-v2.component';
import { CasualtyFormComponent } from './components/casualty-form/casualty-form.component';
import { CasualtyV2Component } from './components/casualty-v2/casualty-v2.component';
import { CaseFormComponent } from './components/case-form/case-form.component';
import { CasesV3Component } from './components/cases-v3/cases-v3.component';
import { CaseV2Component } from './components/case-v2/case-v2.component';
import { CasualtyNormComponent } from './components/casualty-norm/casualty-norm.component';
import { ChiefNormComponent } from './components/chief-norm/chief-norm.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cases',
      },
      {
        path: 'cases',
        component: CasesV3Component,
        data: { state: '1' }
      },
      {
        path: 'casualties',
        component: CasualtiesV2Component,
        data: { state: '1' }
      },
      {
        path: 'injuries',
        component: InjuriesV3Component,
        data: { state: '1' }
      }
    ],
    data: { state: '1' }
  },
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
  {
    path: 'casualties',
    children: [
      { path: '', component: CasualtiesV2Component, data: { state: '1' } },
      { path: 'create', component: CasualtyFormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } },
      {
        path: ':id',
        children: [
          {
            path: '',
            children: [
              { path: '', component: CasualtyV2Component, data: { state: '2' } },
              { path: 'norm', component: CasualtyNormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } },
            ],
            data: { state: '2' }
          },
          { path: 'edit', component: CasualtyFormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } }
        ],
        data: { state: '2' }
      },
    ]
  },
  { path: 'cases',
    children: [
      { path: '', component: CasesV3Component, data: { state: '1' } },
      { path: 'create', component: CaseFormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } },
      {
        path: ':id',
        children: [
          { path: '', component: CaseV2Component, data: { state: '2' } },
          {
            path: 'casualties/:id',
            children: [
              { path: '', component: CasualtyV2Component, data: { state: '3' } },
              { path: 'norm', component: CasualtyNormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '4' } },
              { path: 'chief-norm', component: ChiefNormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '4' } },
            ],
            data: { state: '3' } },
          { path: 'edit', component: CaseFormComponent, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } }
        ],
        data: { state: '2' }
      },
    ]
  },
  // { path: 'triage', component: TriageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
