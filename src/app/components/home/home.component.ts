// import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { NavbarComponent } from '../bars/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  searchText: string = '';
  selectedCategory: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 6;


  // collections = [
  //   { img: 'assets/imgs/aro.jpg', title: 'Yellow Painting', price: '0.002 ETH', tag: 'Arte' },
  //   { img: 'assets/imgs/circulo.jpg', title: 'Yellow Painting', price: '0.004 ETH', tag: 'Deportes' },
  //   { img: 'assets/imgs/cilindros.jpg', title: 'Yellow Painting', price: '0.003 ETH', tag: 'Fotografia' },
  //   { img: 'assets/imgs/figuras.jpg', title: 'Yellow Painting', price: '0.005 ETH', tag: 'Animales' },
  //   { img: 'assets/imgs/aro.jpg', title: 'Yellow Painting', price: '0.002 ETH', tag: 'Arte' },
  //   { img: 'assets/imgs/circulo.jpg', title: 'Yellow Painting', price: '0.004 ETH', tag: 'Deportes' },
  //   { img: 'assets/imgs/cilindros.jpg', title: 'Yellow Painting', price: '0.003 ETH', tag: 'Fotografia' },
  //   { img: 'assets/imgs/figuras.jpg', title: 'Yellow Painting', price: '0.005 ETH', tag: 'Animales' },
  // ];

  images = [
    { name: 'Yellow Painting', category: 'art', author: 'Artist1', url: 'assets/imgs/aro.jpg' },
    { name: 'Blue Artwork', category: 'art', author: 'Artist2', url: 'assets/imgs/cilindros.jpg' },
    { name: 'Music Beats', category: 'music', author: 'Artist3', url: 'assets/imgs/circulo.jpg' },
    { name: 'Abstract Colors', category: 'art', author: 'Artist4', url: 'assets/imgs/figuras.jpg' },
    { name: 'Digital Sound', category: 'music', author: 'Artist5', url: 'assets/imgs/metal.jpg' },
    { name: 'Sculpture Design', category: 'sculpture', author: 'Artist6', url: 'assets/imgs/moneda.png' },
    { name: 'Nature Photo', category: 'photography', author: 'Artist7', url: 'assets/imgs/muñeca.png' },
    { name: 'Modern Art', category: 'art', author: 'Artist8', url: 'assets/imgs/torre.jpg' },
    { name: 'City Landscape', category: 'photography', author: 'Artist9', url: 'assets/imgs/tubo.jpg' },
    { name: 'City Landscape', category: 'photography', author: 'Artist9', url: 'assets/imgs/tubo.jpg' },
  ];

  filteredImages = [...this.images];

  get totalPages() {
    return Math.ceil(this.filteredImages.length / this.itemsPerPage);
  }

  // filterImages1(searchText: string) {
  //   this.filteredImages = this.images.filter(img =>
  //     img.name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // }

  filterImages() {
    this.filteredImages = this.images.filter(image =>
      image.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategory === 'all' || image.category === this.selectedCategory)
    );
    this.currentPage = 1; // Reset to first page
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterImages();
  }

  paginatedImages() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredImages.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
