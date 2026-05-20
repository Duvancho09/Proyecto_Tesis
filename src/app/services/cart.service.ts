import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() { 
    const savedCart = localStorage.getItem('carrito_nft');
    if(savedCart){
      this.items = JSON.parse(savedCart);
      this.notificarCambios();
    }
  }

  obtenerItems(){
    return this.items;
  }

  agregarAlCarrito(nft: any, cantidad: number){
    const indice = this.items.findIndex(i => i.name === nft.name);

    if(indice > -1){
      this.items[indice].cantidad += cantidad;
    } else {
      this.items.push({ ...nft, cantidad });
    }
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(){
    localStorage.setItem('carrito_nft', JSON.stringify(this.items));
    this.notificarCambios();
  }

  private notificarCambios(){
    const total = this.items.reduce((acc, item) => acc + item.cantidad, 0);
    this.cartCount.next(total);
  }

  eliminarDelCarrito(nombreNFT: string){
    this.items = this.items.filter(item => item.name !==nombreNFT);
    this.guardarEnLocalStorage();
  }

  actualizarCantidad(nombreNFT: string, nuevaCantidad: number){
    const item = this.items.find(i => i.name === nombreNFT);
    if(item){
      item.cantidad = nuevaCantidad;
      this.guardarEnLocalStorage();
    }
  }
}
