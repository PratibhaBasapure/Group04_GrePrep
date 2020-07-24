import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginAndSignupDialogComponent } from './login-and-signup-dialog/login-and-signup-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AttemptHistoryComponent } from './attempt-history/attempt-history.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FooterComponent } from './footer/footer.component';
import { GrePredictorComponent } from './gre-predictor/gre-predictor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { GreComponent } from './gre/gre.component';
import { MastersHomeComponent } from './masters-home/masters-home.component';
import { MatMenuModule } from '@angular/material/menu';
import { SchoolRankingComponent } from './school-ranking/school-ranking.component';
import { MySchoolsComponent } from './my-schools/my-schools.component';
import { VerbalPracticeComponent } from './verbal-practice/verbal-practice.component';
import { QuantitativePracticeComponent } from './quantitative-practice/quantitative-practice.component';
import { WhyMastersComponent } from './why-masters/why-masters.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { QuizComponent } from './quiz/quiz.component';
import { MatRadioModule } from '@angular/material/radio';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { MockTestComponent } from './mock-test/mock-test.component';
import { TakeMockTestComponent } from './take-mock-test/take-mock-test.component';
import { ListOfSchoolsComponent } from './list-of-schools/list-of-schools.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    HomeComponent,
    LoginAndSignupDialogComponent,
    AttemptHistoryComponent,
    FooterComponent,
    GrePredictorComponent,
    GreComponent,
    MastersHomeComponent,
    SchoolRankingComponent,
    MySchoolsComponent,
    VerbalPracticeComponent,
    QuantitativePracticeComponent,
    WhyMastersComponent,
    AboutUsComponent,
    TermsAndConditionComponent,
    SuccessStoriesComponent,
    QuizComponent,
    TakeQuizComponent,
    MockTestComponent,
    TakeMockTestComponent,
    ListOfSchoolsComponent,
    ProfileSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    RouterModule,
    MatMenuModule,
    MatRadioModule,
    MatDatepickerModule,  
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },UserService,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
