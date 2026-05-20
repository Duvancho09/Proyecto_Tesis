import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

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
  isMobileMenuOpen = false;
  dropdownOpen1 = false;
  cantidadCarrito: number = 0;
  tieneNotificacion: boolean = false;
  
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router, private cartService: CartService){}

  ngOnInit(){
    this.cartService.cartCount$.subscribe(valor => {
      this.cantidadCarrito = valor;
      this.tieneNotificacion = valor > 0;
    });
  }

  onSearch(){
    this.searchEvent.emit(this.searchText);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterImages() {
    console.log(`Filtrando imágenes por: ${this.searchText}`);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  toggleDropdown1() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  simularAñadir(){
    this.cantidadCarrito++;
    this.tieneNotificacion = true;
  }
}
