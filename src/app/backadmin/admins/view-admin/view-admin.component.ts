import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-admin',
  standalone: false,
  templateUrl: './view-admin.component.html',
  styleUrl: './view-admin.component.scss'
})
export class ViewAdminComponent {
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  
}
