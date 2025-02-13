import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecopassComponent } from './components/recopass/recopass.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "recoverpassword", component: RecopassComponent },
    { path: "home", component: HomeComponent },
];
