import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-media',
  standalone: false,
  templateUrl: './view-media.component.html',
  styleUrl: './view-media.component.scss'
})
export class ViewMediaComponent {
  @Input() show:any;
  @Input() selectedMedia:any;
  @Output() closeMedia: EventEmitter<any> = new EventEmitter();
  slideConfig = { slidesToShow: 1, slidesToScroll: 1, dots: true };

  close() {
    this.closeMedia.emit();
  }

  isImageFile(filePath: string) {
    var extension = filePath?.split('.')?.pop()?.toLowerCase();
    var imageExtensions: any = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    return imageExtensions.includes(extension);
  }
  isPdfFile(filePath: string) {
    var extension = filePath?.split('.')?.pop()?.toLowerCase();
    var imageExtensions: any = ['pdf', 'docx'];
    return imageExtensions.includes(extension);
  }
}
