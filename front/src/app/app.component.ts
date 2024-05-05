import { OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {IEvent} from "./models";
import {EventService} from "./event.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ITicket } from './models';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Connection to Django app!';
  logged: boolean = false;
  username: string = "";
  password: string = "";
  events: IEvent[] = [];
  tickets: ITicket[] = [];

  private URL = 'http://127.0.0.1:8000/api';
  showSuccessMessage = false;
  constructor(private eventService: EventService,
    private http: HttpClient,
    private router: Router,
    private ticketService: TicketService
      ) {
      }
  displaySuccessMessage() {
    this.showSuccessMessage = true;
  }

  ngOnInit() {
      const access = localStorage.getItem("access");
      if (access) {
        this.logged = true;
        this.getEvents();
        this.getTickets();
      }
  }
  

  login() {
    this.eventService
      .login(this.username, this.password)
      .subscribe((data) => {
        this.logged = true;
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        this.getEvents();
        this.getTickets();
      })
  }

  logout() {
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  getTickets() {
    this.ticketService
      .getUserTickets(1)
      .subscribe((data) => {
        this.tickets = data;
        // console.log('Nazaaaaaaaaaaaaaaaa');
      });
  }

  getEvents() {
    this.eventService
      .getEvents()
      .subscribe((data) => {
        this.events = data;
      });
  }

  onRegister(eventId: number, userId: number) {
    this.http.post<any>(`${this.URL}/events/${eventId}/register/${userId}/`, {}).subscribe(response => {
      console.log(response);
      this.displaySuccessMessage();
      setTimeout(() => {
        this.showSuccessMessage = false; // Reset success flag to false after a certain time (optional)
      }, 5000); // Reset success message after 5 seconds (adjust time as needed)
  
    }, error => {
      console.error('An error occurred:', error);
    });

  }
  // UserTickets(): ITicket[] {
  //   let tickets: ITicket[] = [];
    
  //   this.ticketService.getUserTickets(1).subscribe((data: ITicket[]) => {
  //     tickets = data;
  //   });
  
  //   return tickets;
  // }
  
  navigateToBooking() {
    this.router.navigate(['/booking/']);
  }
}