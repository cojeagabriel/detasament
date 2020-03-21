import { ScreenService } from './services/screen.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatListModule,
  MatTreeModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatTabsModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatSidenavModule,
  MatRippleModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InjuriesToStringPipe } from './pipes/injuries-to-string.pipe';
import { TriageComponent } from './components/triage/triage.component';
import { DialogAddScoreComponent } from './components/dialog-add-score/dialog-add-score.component';
import { InjuryListItemComponent } from './components/injury-list-item/injury-list-item.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CasualtyCardV2Component } from './components/casualty-card-v2/casualty-card-v2.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { InjuriesV3Component } from './components/injuries-v3/injuries-v3.component';
import { InjuryV3Component } from './components/injury-v3/injury-v3.component';
import { ManeuverListItemV2Component } from './components/maneuver-list-item-v2/maneuver-list-item-v2.component';
import { InjuryFormComponent } from './components/injury-form/injury-form.component';
import { ManeuverFormComponent } from './components/maneuver-form/maneuver-form.component';
import { CasualtiesV2Component } from './components/casualties-v2/casualties-v2.component';
import { CasualtyFormComponent } from './components/casualty-form/casualty-form.component';
import { AddInjuriesV2Component } from './components/add-injuries-v2/add-injuries-v2.component';
import { CasualtyV2Component } from './components/casualty-v2/casualty-v2.component';
import { CasesV3Component } from './components/cases-v3/cases-v3.component';
import { CaseV2Component } from './components/case-v2/case-v2.component';
import { CaseFormComponent } from './components/case-form/case-form.component';
import { AddCasualtyComponent } from './components/add-casualty/add-casualty.component';
import { CaseCardV2Component } from './components/case-card-v2/case-card-v2.component';
import { CasualtyNormComponent } from './components/casualty-norm/casualty-norm.component';
import { ManeuverNormListItemComponent } from './components/maneuver-norm-list-item/maneuver-norm-list-item.component';
import { DialogNormReviewComponent } from './components/dialog-norm-review/dialog-norm-review.component';
import { NormComponent } from './components/norm/norm.component';
import { ChiefNormComponent } from './components/chief-norm/chief-norm.component';
import { TimePipe } from './pipes/time.pipe';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InjuriesToStringPipe,
    TriageComponent,
    DialogAddScoreComponent,
    InjuryListItemComponent,
    ConfirmationDialogComponent,
    CasualtyCardV2Component,
    InjuriesV3Component,
    InjuryV3Component,
    ManeuverListItemV2Component,
    InjuryFormComponent,
    ManeuverFormComponent,
    CasualtiesV2Component,
    CasualtyFormComponent,
    AddInjuriesV2Component,
    CasualtyV2Component,
    CasesV3Component,
    CaseV2Component,
    CaseFormComponent,
    AddCasualtyComponent,
    CaseCardV2Component,
    CasualtyNormComponent,
    ManeuverNormListItemComponent,
    DialogNormReviewComponent,
    NormComponent,
    ChiefNormComponent,
    TimePipe,
    BottomNavigationComponent
  ],
  entryComponents: [
    DialogAddScoreComponent,
    ConfirmationDialogComponent,
    DialogNormReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatSidenavModule,
    MatRippleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    ScreenService,
    TimePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
