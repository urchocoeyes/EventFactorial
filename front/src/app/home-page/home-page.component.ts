import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IEvent } from '../models';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  events: IEvent[] = [];
  private URL = 'http://127.0.0.1:8000/api';
  showSuccessMessage=false;
  constructor(private route: ActivatedRoute,private eventService: EventService,
    private http: HttpClient
  ) {}
  displaySuccessMessage() {
    this.showSuccessMessage = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventService.getEvents().subscribe((data: IEvent[]) => {
        this.events = data;
      });
    });
  }
  
  onRegister(eventId: number, userId: number) {
    this.http.post<any>(`${this.URL}/events/${eventId}/register/${userId}/`, {}).subscribe(response => {
      console.log(response);
      this.displaySuccessMessage();
    }, error => {
      console.error('An error occurred:', error);
    });
  }
}
