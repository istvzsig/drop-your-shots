import { Component } from '@angular/core';
import { DropZoneComponent } from './components/drop-zone/drop-zone.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DropZoneComponent, ImageGalleryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'drop-your-shots';

  constructor() {}
}
