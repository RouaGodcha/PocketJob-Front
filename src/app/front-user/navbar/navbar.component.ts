import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() loginClicked = new EventEmitter<void>();
  @Output() registerClick = new EventEmitter<void>();
  menuOpen = false;
openLogin() {
  this.loginClicked.emit();
}

openRegister() {
  this.registerClick.emit();
}


   toggleMenu(){
    this.menuOpen =!this.menuOpen;
   }

   

  
}
