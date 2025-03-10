import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  collections = [
    { img: 'assets/imgs/aro.jpg', title: 'Yellow Painting', price: '0.002 ETH', tag: 'Arte' },
    { img: 'assets/imgs/circulo.jpg', title: 'Yellow Painting', price: '0.004 ETH', tag: 'Deportes' },
    { img: 'assets/imgs/cilindros.jpg', title: 'Yellow Painting', price: '0.003 ETH', tag: 'Fotografia' },
    { img: 'assets/imgs/figuras.jpg', title: 'Yellow Painting', price: '0.005 ETH', tag: 'Animales' },
    { img: 'assets/imgs/aro.jpg', title: 'Yellow Painting', price: '0.002 ETH', tag: 'Arte' },
    { img: 'assets/imgs/circulo.jpg', title: 'Yellow Painting', price: '0.004 ETH', tag: 'Deportes' },
    { img: 'assets/imgs/cilindros.jpg', title: 'Yellow Painting', price: '0.003 ETH', tag: 'Fotografia' },
    { img: 'assets/imgs/figuras.jpg', title: 'Yellow Painting', price: '0.005 ETH', tag: 'Animales' },
  ];

  filterCategory(category: string){
    console.log('Filtrando por:', category);
  }

}
