import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

const enterTransition = transition(':enter', [
  query('.animacion-entrada', [
  style({ transform: 'translateY(100%)',
  opacity: 0 }),
  stagger(100, [
    animate('0.5s ease-in', style({ transform: 'translateY(0)', opacity: 1}))
  ])
])
]);

const translateY = trigger('translateY', [enterTransition])

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [translateY]
})
export class NavbarComponent {
  searchText: string = '';
  dropdownOpen: boolean = false;

  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router){}

  onSearch(){
    this.searchEvent.emit(this.searchText);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterByCategory(category: string) {
    console.log(`Filtrando por categoría: ${category}`);
  }

  filterImages() {
    console.log(`Filtrando imágenes por: ${this.searchText}`);
  }

}
