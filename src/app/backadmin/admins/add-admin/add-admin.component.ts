import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  standalone: false,
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent {
  @Input() show: boolean = false; // 👈 nécessaire
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
}
