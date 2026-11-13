import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NftDataService } from '../../services/nft-data.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ethers } from 'ethers';
import { Web3Service } from '../../services/web3.service';
import { NFT_MARKETPLACE_ABI } from '../../services/contract-abi';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


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
  isProcessing: boolean = false;

  constructor(private route: ActivatedRoute, 
    private nftService: NftDataService, 
    private cartService: CartService,
    private http: HttpClient,
    private router: Router,
    private web3Service: Web3Service,){}

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

  get precioUnitarioNumerico(): number {
    if(!this.nft?.price) return 0;
    const limpio = String(this.nft.price).replace(/[^0-9.]/g, '');
    return Number(limpio) || 0;
  }

  get precioTotalCalculado(): number {
    const cantidad = this.cantidadElegida < 1 ? 1 : this.cantidadElegida;
    return this.precioUnitarioNumerico * cantidad;
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

  async ejecutarCompraBlockchain(){
    console.log('¡Botón presionado, intentando conectar con blockchain!')
    if(!this.web3Service.isConnected()){
      alert('Por favor conecta tu wallet primero.');
      await this.web3Service.connectWallet();
      return;
    }

    this.isProcessing = true;
    try {
      const contractAddress = "0xc882D518356375670B3106F1bc4352E58E35dE95";
      const tokenIdUnico = Number(this.nft.tokenId) || 1;

      const resultado = await this.web3Service.buyNftOnChain(
        contractAddress,
        NFT_MARKETPLACE_ABI,
        tokenIdUnico,
        this.precioTotalCalculado.toString()
      );

      if(resultado.success){
        alert(`¡Compra exitosa!\nHash: ${resultado.txHash}\nToken ID: ${resultado.tokenId}`);

        const usuarioGuardado = JSON.parse(localStorage.getItem('user') || 'null');
        
        if(!usuarioGuardado || !usuarioGuardado.id){
          console.error('No se encontró un usuario activo en la sesión.');
          alert('Error: Debes iniciar sesión para registrar la compra en tu cuenta.');
          return;
        }

        this.http.post('http://localhost:3000/transactions/register', {
          buyerId: usuarioGuardado.id,
          nftId: this.nft.id || tokenIdUnico,
          txHash: resultado.txHash,
          price: this.precioTotalCalculado
        }).subscribe({
          next: (response) => {
            console.log('¡Base de datos actualizada con éxito en Postgres!', response);

            Swal.fire({
              icon: 'success',
              title: '¡Compra Exitosa!',
              text: 'Tu obra ha sido adquirida y el stock se ha actualizado',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/collections']);
            });
            
          },
          error: (err) => {
            console.error('Error al guardar en el backend:', err);
          }
        });
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert('La transacción falló o fue cancelada.');
    } finally {
      this.isProcessing = false;
    }
  }
}
