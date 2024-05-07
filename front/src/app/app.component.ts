import { OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {IEvent} from "./models";
import {EventService} from "./event.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Event Factorial';
  logged: boolean = false;
  username: string = "";
  password: string = "";
  private URL = 'http://127.0.0.1:8000/api';
  // private URL = 'https://django-deployment-1-a1tggxy7w-nazyms-projects.vercel.app'

  constructor(private eventService: EventService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
      ) {
      }


  ngOnInit() {
    const access = localStorage.getItem("access");
    if (access) {
      this.logged = true;
    }
  }

  login() {
    this.eventService
      .login(this.username, this.password)
      .subscribe((data) => {
        this.logged = true;
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
      })
  }

  logout() {
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
}