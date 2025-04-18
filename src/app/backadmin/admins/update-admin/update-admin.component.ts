import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-update-admin',
  standalone: false,
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.scss'
})
export class UpdateAdminComponent {
  @Input() show = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  
}
