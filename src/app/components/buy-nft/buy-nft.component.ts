import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';
import { ActivatedRoute } from '@angular/router';
import { NftDataService } from '../../services/nft-data.service';
import { FormsModule } from '@angular/forms';


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

  constructor(private route: ActivatedRoute, private nftService: NftDataService){}

  ngOnInit(){
    const nftName = this.route.snapshot.paramMap.get('name');

    if(nftName){
      this.nftService.getNfts().subscribe(nfts => {
        this.nft = nfts.find(n => n.name === nftName);

        if(!this.nft){}
      });
    }
  }

}
