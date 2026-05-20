import { Component } from '@angular/core';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NftDataService } from '../../services/nft-data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-nft',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, CommonModule, FormsModule],
  templateUrl: './create-nft.component.html',
  styleUrl: './create-nft.component.css'
})
export class CreateNFTComponent {
  imagePreview: string | ArrayBuffer | null = null;

  itemName: string = '';
  itemDescription: string = '';
  artistName: string = '';
  itemPrice: string = '';
  itemSupply: string = '';
  itemExternalLink: string = '';
  itemBlockchain: string = 'ethereum'; 

  constructor (private nftService: NftDataService, private router: Router){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagePreview = URL.createObjectURL(file);
    }

  }

  uploadFile(){
    if(!this.imagePreview || !this.itemName){
      Swal.fire({
        icon: 'error',
        title: '¡UPSS!',
        text: 'Debes subir una imagen y ponerle un nombre.',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: '#d33'
      });
      return;
    }
    const newNFT = {
      name: this.itemName,
      author: this.artistName || 'Anonymous',
      url: this.imagePreview,
      category: 'art',
      price: this.itemPrice || '0.00 ETH',
      blockchain: this.itemBlockchain,
      auctions: this.itemSupply ? Number(this.itemSupply) : 1
    };

    this.nftService.addNft(newNFT);
    Swal.fire({
      icon: 'success',
      title: '¡Creación subida con éxito!',
      text: 'Tu NFT ya está disponible en las colecciones para que sea comprada.',
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: '#6a11cb',
      confirmButtonText: 'Ir a ver'
    }).then((result) => {
      if(result.isConfirmed || result.isDismissed){
        this.router.navigate(['/collections']);
      }
    });
  }

}
