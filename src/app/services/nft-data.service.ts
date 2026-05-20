import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NftDataService {
    
    private nfts: any[] = [];
    private nftsSubject = new BehaviorSubject<any[]>([]);

    constructor(){
        const savedNfts = localStorage.getItem('mis_nfts_creados');
        if(savedNfts){
            try{
                this.nfts = JSON.parse(savedNfts);
                this.nftsSubject.next(this.nfts);
            } catch (e){
                console.error("Error al parsear los NFTS guardados", e);
                this.nfts = [];
            }
        }
    }
    
    getNfts() {
        return this.nftsSubject.asObservable();
    }
    
    addNft(nuevoNft: any) {
        this.nfts.push(nuevoNft);
        this.nftsSubject.next(this.nfts);
        localStorage.setItem('mis_nfts_creados', JSON.stringify(this.nfts));
    }
}