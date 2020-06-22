import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AttemptHistoryComponent } from './attempt-history/attempt-history.component';
import { GrePredictorComponent } from './gre-predictor/gre-predictor.component';
import { GreComponent } from './gre/gre.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', redirectTo: '' },
  { path: 'attemptHistory', component: AttemptHistoryComponent },
  { path: '***', redirectTo: '' },
  { path: 'gre-predictor', component: GrePredictorComponent },
  { path: 'gre', component: GreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
