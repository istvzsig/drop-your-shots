import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'drop-zone',
  standalone: true,
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
  imports: [CommonModule],
})
export class DropZoneComponent {
  isDragOver = false;

  @HostListener('document:dragover', ['$event'])
  onDocumentDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  @HostListener('document:dragleave', ['$event'])
  onDocumentDragLeave(event: DragEvent) {
    if (event.clientX === 0 && event.clientY === 0) {
      this.isDragOver = false;
    }
  }

  @HostListener('document:drop', ['$event'])
  onDocumentDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.saveFile(file);
      }
    }
  }

  saveFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const images = this.getImagesFromLocalStorage();
      const newImage = reader.result as string;
      if (!images.includes(newImage)) {
        images.unshift(newImage);
        localStorage.setItem('images', JSON.stringify(images));
        window.dispatchEvent(new Event('storage'));
      }
    };
    reader.readAsDataURL(file);
  }

  getImagesFromLocalStorage(): string[] {
    const images = localStorage.getItem('images');
    return images ? JSON.parse(images) : [];
  }
}
