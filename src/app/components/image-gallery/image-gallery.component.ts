import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
    window.addEventListener('storage', () => this.loadImages());
    console.log(this.images);
  }

  loadImages() {
    const images = localStorage.getItem('images');
    this.images = images ? JSON.parse(images) : [];
  }
}
