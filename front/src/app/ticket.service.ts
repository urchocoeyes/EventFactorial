import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITicket } from './models';
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  // private URL = 'http://127.0.0.1:8000/api';
  private URL = 'https://django-deployment-1-a1tggxy7w-nazyms-projects.vercel.app'

  constructor(private http: HttpClient) {}

  getUserTickets(userId: number): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${this.URL}/users/${userId}/tickets/`);
  }

  deleteBooking(userId: number, ticketId: number): Observable<any> {
    return this.http.post<any>(`${this.URL}/users/${userId}/tickets/${ticketId}/delete/`, {});
  }

}
