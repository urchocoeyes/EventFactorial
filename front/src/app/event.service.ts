import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IEvent, Token} from "./models";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root',
})

export class EventService {
  // BASE_URL = 'http://localhost:8000';
  private URL = 'https://django-deployment-1-a1tggxy7w-nazyms-projects.vercel.app'

  constructor(private http: HttpClient,  ) {
  }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(
      `${this.URL}/api/login/`,
      {username, password}
    )
  }

  // onRegister(eventId: number, userId: number) {
  //   this.registerComponent.registerUserForEvent(eventId, userId);
  //   }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(
      `${this.URL}/api/events/`
    )
  }
}
