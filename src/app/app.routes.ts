import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecopassComponent } from './components/recopass/recopass.component';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { BuyNFTComponent } from './components/buy-nft/buy-nft.component';
import { CreateNFTComponent } from './components/create-nft/create-nft.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "recoverpassword", component: RecopassComponent, canActivate: [authGuard] },
    { path: "home", component: HomeComponent, canActivate: [authGuard] },
    { path: "editProfile", component: EditProfileComponent, canActivate: [authGuard] },
    { path: "collections", component: CollectionsComponent, canActivate: [authGuard] },
    { path: "buyNFT/:name", component: BuyNFTComponent, canActivate: [authGuard] },
    { path: "createNFT", component: CreateNFTComponent, canActivate: [authGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
    { path: "cart", component: CartComponent, canActivate: [authGuard] }
];
