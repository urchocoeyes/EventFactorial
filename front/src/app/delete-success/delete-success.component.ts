import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delete-success',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './delete-success.component.html',
  styleUrl: './delete-success.component.css'
})
export class DeleteSuccessComponent {
  constructor(private route: ActivatedRoute){}

}
