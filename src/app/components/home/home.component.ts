import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { NavbarComponent } from '../bars/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, FormsModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // animations: [translateY]
})
export class HomeComponent {

}