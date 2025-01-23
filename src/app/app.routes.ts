import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { CartComponent } from './Components/cart/cart.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},

    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component: RegisterComponent, title: 'Register'},

    {path: 'about-us', component: AboutUsComponent, title: 'About Us'},

    {path: 'products/product-details/:id', component: ProductDetailComponent, title: 'Product Details'},

    {path: 'cart', component: CartComponent, title: 'Cart'}
];
