import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { ActivatedRoute } from '@angular/router';
import { NftDataService } from '../../services/nft-data.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-buy-nft',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidenavComponent, FormsModule],
  templateUrl: './buy-nft.component.html',
  styleUrl: './buy-nft.component.css'
})
export class BuyNFTComponent implements OnInit{
  nft: any;
  showPayment: boolean = false;
  cantidadElegida: number = 1;

  constructor(private route: ActivatedRoute, private nftService: NftDataService, private cartService: CartService){}

  ngOnInit(){
    const nftName = this.route.snapshot.paramMap.get('name');

    if(nftName){
      this.nftService.getNfts().subscribe(nfts => {
        const nombreUrl = nftName.trim().toLowerCase();
        this.nft = nfts.find(n => n.name && n.name.trim().toLowerCase() === nombreUrl);

        if(!this.nft){
          console.error("¡Pilas! No se encontró ningún NFT que coincida con el nombre:", nftName);
        } else {
          console.log("¡NFT Encontrado con éxito!", this.nft);
        }
      });
    }
  }

  get precioTotalCalculado(): number {
    const precioUnitario = Number(this.nft?.price || 0);
    const cantidad = this.cantidadElegida < 1 ? 1 : this.cantidadElegida;
    return precioUnitario * cantidad;
  }

  actualizarCantidad(valor: any){
    const num = Number(valor);
    if(num < 1){
      this.cantidadElegida = 1;
    } else if (this.nft?.auctions && num > this.nft.auctions){
      this.cantidadElegida = this.nft.auctions;
    } else {
      this.cantidadElegida = num;
    }
  }

  cambiarCantidad(delta: number){
    const nuevoValor = this.cantidadElegida + delta;
    const maximoObra = this.nft?.auctions ? Number(this.nft.auctions) : 1;

    if(nuevoValor >=1 && nuevoValor <= maximoObra){
      this.cantidadElegida = nuevoValor;
    } else if (nuevoValor > maximoObra){
      alert (`No puedes agregar más. Solo quedan ${maximoObra} obras disponibles.`);
    }
  }

  agregarAlCarrito(){
    if(this.nft){
      this.cartService.agregarAlCarrito(this.nft, this.cantidadElegida);
      alert(`¡Melo! Añadiste ${this.cantidadElegida} de "${this.nft.name}" al carrito.`);
    }
  }
}
