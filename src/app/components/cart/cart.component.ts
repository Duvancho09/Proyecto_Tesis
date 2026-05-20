import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { CartService } from '../../services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidenavComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  items: any [] = [];

  constructor(private cartService: CartService){}

  ngOnInit(){
    this.items = this.cartService.obtenerItems();
  }

  get totalCompra(): number{
    return this.items.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
  }
  
  eliminar(nft: any){
    this.cartService.eliminarDelCarrito(nft.name);
    this.items = this.cartService.obtenerItems();
    console.log(`${nft.name} elimanado del carrito`);
  }

  cambiarCantidad(item: any, delta: number){
    const nuevaCantidad = item.cantidad + delta;
    const maximoDisponible = item.auctions || 20;
    if(nuevaCantidad < 1){
      this.eliminar(item);
      return;
    }

    if(nuevaCantidad > maximoDisponible){
      alert(`Solo hay ${maximoDisponible} unidades disponibles de esta obra.`);
      return;
    }

    this.cartService.actualizarCantidad(item.name, nuevaCantidad);
    item.cantidad = nuevaCantidad;
  }
}
