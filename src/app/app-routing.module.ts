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

const routes: Routes = [
  { path: '', component: HomeComponent, data: { state: '0' } },
  { path: 'injuries',
    children: [
      { path: '', component: InjuriesV2Component, data: { state: '1' } },
      { path: 'create', component: CreateInjuryV2Component, canDeactivate: [CanDeactivateGuardGuard], data: { state: '2' } },
      { path: ':id',
        children: [
          { path: '', component: InjuryV2Component, data: { state: '2' } },
          { path: 'edit', component: CreateInjuryV2Component, canDeactivate: [CanDeactivateGuardGuard], data: { state: '3' } }
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
