import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'image-gallery',
  standalone: true,
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
  imports: [CommonModule],
})
export class ImageGalleryComponent implements OnInit {
  images: string[] = [];

  ngOnInit() {
    this.loadImages();
    this.filterImages();
    window.addEventListener('storage', () => this.loadImages());
  }

  loadImages() {
    const images = localStorage.getItem('images');
    this.images = images ? JSON.parse(images) : [];
  }

  filterImages() {
    this.images = this.images.filter((image, index) => {
      return image !== this.images[index + 1];
    });
  }
}
