import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { ITicket } from '../models';
import {ActivatedRoute, RouterLink, RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  private URL = 'http://127.0.0.1:8000/api';
  // private URL = 'https://django-deployment-1-a1tggxy7w-nazyms-projects.vercel.app'
  tickets: ITicket[] = [];
  loading = false;
  showSuccessMessage=false;
  constructor(private route: ActivatedRoute,private ticketService: TicketService,
    private http: HttpClient,
    private router: Router
  ) {}
  displaySuccessMessage() {
    this.showSuccessMessage = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.ticketService.getUserTickets(1).subscribe((data: ITicket[]) => {
        this.tickets = data;
      });
      console.log("tickket"+this.tickets);
    });
  }

  deleteBooking(userId: number, ticketId: number) {
    this.ticketService.deleteBooking(userId, ticketId)
      .subscribe(response => {
        console.log(response);
        this.displaySuccessMessage();
        this.router.navigate(['/delete_success']); 
      }, error => {
        console.error('An error occurred:', error);
      });
  }
  
  goBack() {
    this.router.navigate(['/']); 
  }

}
