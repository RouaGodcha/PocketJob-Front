import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch-button',
  standalone : false, 
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
})
export class SwitchButtonComponent {
  @Input() Id!: number;
  @Input() default!: number;
  @Output() checked: EventEmitter<any> = new EventEmitter();
  @Output() unchecked: EventEmitter<any> = new EventEmitter();

  onToggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.checked.emit();
    } else {
      this.unchecked.emit();
    }
  }
}
