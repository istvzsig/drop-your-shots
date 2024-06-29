import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'drop-zone',
  standalone: true,
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
})
export class DropZoneComponent {
  // @HostListener('click', ['$event'])
  // onClick(event: Event) {
  //   (event.target as HTMLElement).querySelector('input')?.click();
  // }

  dragover: string;

  constructor() {
    this.dragover = 'drop-zone';
  }

  ngOnChange() {
    console.log('asdsd');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragover += ' dragover';
  }

  onDragLeave(event: DragEvent) {
    event.stopImmediatePropagation();
    this.dragover = 'drop-zone';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragover = 'drop-zone';

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
      images.push(reader.result as string);
      localStorage.setItem('images', JSON.stringify(images));
      window.dispatchEvent(new Event('storage')); // Notify gallery component
    };
    reader.readAsDataURL(file);
  }

  getImagesFromLocalStorage(): string[] {
    const images = localStorage.getItem('images');
    return images ? JSON.parse(images) : [];
  }
}
