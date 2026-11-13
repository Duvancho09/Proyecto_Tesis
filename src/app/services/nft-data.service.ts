import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NftDataService {
    
    private apiUrl = 'http://localhost:3000/nfts';
    private nftsSubject = new BehaviorSubject<any[]>([]);

    constructor(private http: HttpClient){
        this.cargarNftsGlobales();
    }
    
    getNfts(): Observable<any[]> {
        return this.nftsSubject.asObservable();
    }

    cargarNftsGlobales(){
        this.http.get<any[]>(this.apiUrl).subscribe({
            next: (nfts) => {
                this.nftsSubject.next(nfts);
            },
            error: (err) => {
                console.error('Error al cargar la galeria global de Nfts:', err);
            }
        });
    }
    
    addNft(nuevoNft: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, nuevoNft).pipe(
            tap((nftCreado) => {
                const currentNfts = this.nftsSubject.value;
                this.nftsSubject.next([...currentNfts, nftCreado]);
            })
        );
    }
}