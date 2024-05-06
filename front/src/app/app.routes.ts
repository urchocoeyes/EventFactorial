import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BookingComponent } from './booking/booking.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { DeleteSuccessComponent } from './delete-success/delete-success.component';

export const routes: Routes = 
[      
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },   
    { path: 'booking', component: BookingComponent },
    { path: 'success', component:SuccessPageComponent},
    { path: 'delete_success', component: DeleteSuccessComponent },
]
