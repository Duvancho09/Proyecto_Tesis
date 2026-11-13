import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';
import { Web3Service } from '../../../services/web3.service';
import { UserService } from '../../../services/user.service';

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

  public web3Service = inject(Web3Service);
  
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router, private cartService: CartService, public userService: UserService){}

  public cerrarSesionGeneral(): void {
    localStorage.clear();
    sessionStorage.clear();

    this.web3Service.logout();

    this.router.navigate(['/'], { replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }

  async ngOnInit(){
    this.cartService.cartCount$.subscribe(valor => {
      this.cantidadCarrito = valor;
      this.tieneNotificacion = valor > 0;
    });
  }

  async conectarWallet(){
    const rawAccount = await this.web3Service.connectWallet();
    const account: string | null = rawAccount ? String(rawAccount): null;
    if (account){
      Swal.fire({
        icon: 'success',
        title: '¡Wallet Conectada!',
        text: `Conectado: ${account.substring(0, 6)}...${account.substring(38)}`,
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: '#6a11cb',
        timer: 3000,
        showConfirmButton: false
      });
    }
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
    this.dropdownOpen1 = !this.dropdownOpen1;
  }

  simularAñadir(){
    this.cantidadCarrito++;
    this.tieneNotificacion = true;
  }
}
