import { Component } from '@angular/core';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NftDataService } from '../../services/nft-data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Web3Service } from '../../services/web3.service';
import { IpfsService } from '../../services/ipfs.service';
import { ethers } from 'ethers';

const NFTMarketplaceABI = require ('../../../assets/contracts/NFTMarketplace.json');

@Component({
  selector: 'app-create-nft',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, CommonModule, FormsModule],
  templateUrl: './create-nft.component.html',
  styleUrl: './create-nft.component.css'
})
export class CreateNFTComponent {
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  loading: boolean = false;

  private contractAddress = '0x415551658debABB96610dD70C7C7bEd216A21443';

  itemName: string = '';
  itemDescription: string = '';
  artistName: string = '';
  itemPrice: string = '';
  itemSupply: string = '';
  itemExternalLink: string = '';
  itemBlockchain: string = 'ethereum'; 

  constructor (private nftService: NftDataService, private web3Service: Web3Service, private ipfsService: IpfsService, private router: Router){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imagePreview = URL.createObjectURL(file);
    }

  }

  async uploadFile(){
    if(!this.selectedFile || !this.itemName){
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

    try{
      this.loading = true;

      Swal.fire({
        title: 'Minando NFT en Ethereum...',
        text: 'Subiendo archivos a IPFS y solicitando confirmación en MetaMask.',
        background: '#1a1a2e',
        color: '#fff',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const imageUrl = await this.ipfsService.uploadImageToIPFS(this.selectedFile);

      const tokenURI = await this.ipfsService.uploadMetadataToIPFS(
        this.itemName,
        this.itemDescription,
        imageUrl,
        this.itemPrice || '0.00'
      );

      const signer = await this.web3Service.getSigner();
      const contract = new ethers.Contract(this.contractAddress, NFTMarketplaceABI.abi, signer);

      const supply = this.itemSupply ? Number(this.itemSupply) : 1;

      for (let i = 0; i < supply; i++){
        const transaction = await contract['createToken'](tokenURI);
        await transaction.wait();
      }

      const newNFT = {
        name: this.itemName,
        author: this.artistName || 'Anonymous',
        url: imageUrl,
        category: 'art',
        price: this.itemPrice || '0.00 ETH',
        blockchain: this.itemBlockchain,
        auctions: this.itemSupply ? Number(this.itemSupply) : 1
      };

      this.nftService.addNft(newNFT);
      this.loading = false;

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
    } catch (error){
      console.error('Error al crear el NFT', error);
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error al minar',
        text: 'Ocurrio un problema al procesar la transacción en la Blockchain.',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: '#d33'
      });
    }
  }
}
