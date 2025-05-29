import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AskService } from '../../services/ask.service';
import { SidenavComponent } from '../bars/sidenav/sidenav.component';

// const enterTransition = transition(':enter', [
//   query('.animacion-entrada', [
//   style({ transform: 'translateY(100%)',
//   opacity: 0 }),
//   stagger(100, [
//     animate('0.5s ease-in', style({ transform: 'translateY(0)', opacity: 1}))
//   ])
// ])
// ]);

// const translateY = trigger('translateY', [enterTransition])

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, FormsModule, NavbarComponent, SidenavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // animations: [translateY]
})
export class HomeComponent {

  images = [
    { name: 'Yellow Painting', category: 'art', author: 'Artist1', url: 'assets/imgs/aro.jpg' },
    { name: 'Blue Artwork', category: 'art', author: 'Artist2', url: 'assets/imgs/cilindros.jpg' },
    { name: 'Music Beats', category: 'music', author: 'Artist3', url: 'assets/imgs/circulo.jpg' },
    { name: 'Abstract Colors', category: 'art', author: 'Artist4', url: 'assets/imgs/figuras.jpg' },
    { name: 'Digital Sound', category: 'music', author: 'Artist5', url: 'assets/imgs/blanco.png' },
    { name: 'Sculpture Design', category: 'sculpture', author: 'Artist6', url: 'assets/imgs/moneda.png' },
    { name: 'Nature Photo', category: 'photography', author: 'Artist7', url: 'assets/imgs/muñeca.png' },
    { name: 'Modern Art', category: 'art', author: 'Artist8', url: 'assets/imgs/torre.jpg' },
    { name: 'City Landscape', category: 'photography', author: 'Artist9', url: 'assets/imgs/caballo.png' },
  ];

  images1 = [
    { name: 'Yellow Painting', category: 'art', author: 'Artist1', url: 'assets/imgs/mono.png' },
    { name: 'Blue Artwork', category: 'art', author: 'Artist2', url: 'assets/imgs/monoCorona.png' },
    { name: 'Music Beats', category: 'music', author: 'Artist3', url: 'assets/imgs/circulo.jpg' },
  ];

  images2 = [
    { name: 'Tony Stark', description: 'Top #1 de los creadores de artes',cover: 'assets/imgs/perfil1.jpg', avatar: 'assets/imgs/perfil.png' },
    { name: 'Salma Hayek', description: 'Top #2 de los creadores de artes',cover: 'assets/imgs/perfil2.jpg', avatar: 'assets/imgs/perfil.png' },
    { name: 'Tony Montana', description: 'Top #3 de los creadores de artes',cover: 'assets/imgs/perfil3.jpg', avatar: 'assets/imgs/perfilmujer.png' },
  ];

  asks: any[]=[];
  openedIndex: number | null = null;

  constructor(private askService: AskService){}

  ngOnInit(){
    this.asks = this.askService.getAsk();
  }

  toggle(index:number): void {
    this.openedIndex = this.openedIndex === index ? null : index;
  }

  filteredImages = [...this.images];
  filteredImages1 = [...this.images1];
  filteredImages2 = [...this.images2];

}