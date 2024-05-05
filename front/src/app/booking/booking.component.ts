import { Component } from '@angular/core';
import { ITicket } from '../models';
import { TicketService } from '../ticket.service';
import { CommonModule } from '@angular/common';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  tickets: ITicket[] = [];
  loading = false;

  constructor(private ticketService: TicketService,
    private ngForOf: NgForOf<any>
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.ticketService.getUserTickets(1).subscribe((data) => {
      this.loading = false;
      this.tickets = data;
    });
  }

}
