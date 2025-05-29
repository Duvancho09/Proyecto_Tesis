import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecopassComponent } from './components/recopass/recopass.component';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { BuyNFTComponent } from './components/buy-nft/buy-nft.component';
import { CreateNFTComponent } from './components/create-nft/create-nft.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "recoverpassword", component: RecopassComponent },
    { path: "home", component: HomeComponent },
    { path: "editProfile", component: EditProfileComponent },
    { path: "collections", component: CollectionsComponent },
    { path: "buyNFT", component: BuyNFTComponent },
    { path: "createNFT", component: CreateNFTComponent }
];
