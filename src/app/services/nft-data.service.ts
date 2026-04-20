import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NftDataService {
    
    private nfts: any[] = [];
    private nftsSubject = new BehaviorSubject<any[]>([]);
    
    getNfts() {
        return this.nftsSubject.asObservable();
    }
    
    addNft(nuevoNft: any) {
        this.nfts.push(nuevoNft);
        this.nftsSubject.next(this.nfts);
    }
}