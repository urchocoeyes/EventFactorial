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
      console.log("lol");
    });
  }

//users/<int:pk>/tickets/<int:ticket_id>/delete/
  delete_booking(userId: number, ticketId: number) {
    return this.http.post<any>(`${this.URL}/users/${userId}/tickets/${ticketId}/delete`, {}).subscribe(response => {
      console.log(response);
      this.displaySuccessMessage();
    }, error => {
      console.error('An error occurred:', error);
    });
  }
  goBack() {
    this.router.navigate(['/']); 
  }

}
