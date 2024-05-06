import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BookingComponent } from './booking/booking.component';
export const routes: Routes = 
[      
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },   
    { path: 'booking', component: BookingComponent },
]
