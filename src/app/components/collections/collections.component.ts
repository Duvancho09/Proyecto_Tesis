import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../bars/navbar/navbar.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  query('.animacion-entrada', [
  style({ transform: 'translateY(100%)',
  opacity: 0 }),
  stagger(100, [
    animate('0.5s ease-in', style({ transform: 'translateY(0)', opacity: 1}))
  ])
])
]);

const translateY = trigger('translateY', [enterTransition])

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
  animations: [translateY]
})
export class CollectionsComponent {
  searchText: string = '';
  selectedCategory: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  activeCategory: string = 'all';

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
  ];

  filteredImages = [...this.images];

  get totalPages() {
    return Math.ceil(this.filteredImages.length / this.itemsPerPage);
  }

  filterImages() {
    this.filteredImages = this.images.filter(image =>
      image.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategory === 'all' || image.category === this.selectedCategory)
    );
    this.currentPage = 1;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.activeCategory = category;
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