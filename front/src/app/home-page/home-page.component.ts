import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IEvent } from '../models';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  // Локальный массив для хранения информации о регистрации на события
  isUserRegistered: boolean[] = new Array(this.events.length).fill(false);

  constructor(private route: ActivatedRoute,private eventService: EventService,
    private http: HttpClient, private router: Router
  ) {}

  displaySuccessMessage() {
    this.showSuccessMessage = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventService.getEvents().subscribe((data: IEvent[]) => {
        this.events = data;
        // Инициализация массива isUserRegistered при загрузке событий
      });
    });
  }

  onRegister(eventIndex: number, userId: number) {
    const eventId = this.events[eventIndex - 1].id;

    // Проверяем, не зарегистрирован ли уже пользователь на это событие
    if (this.isUserRegistered[eventIndex - 1]) {
      console.log('Вы уже зарегистрированы на это событие.');
      // Здесь можно отобразить сообщение об ошибке или выполнить другие действия
      return; // Прерываем выполнение функции
    }
    
    // Если пользователь не зарегистрирован, отправляем запрос на регистрацию
    this.http.post<any>(`${this.URL}/events/${eventId}/register/${userId}/`, {}).subscribe(response => {
      console.log(response);
      this.displaySuccessMessage();
      this.router.navigate(['/success']); 
      // После успешной регистрации обновляем информацию о регистрации в локальном массиве
      this.isUserRegistered[eventIndex - 1] = true;
    }, error => {
      console.error('An error occurred:', error);
    });
  }
}
