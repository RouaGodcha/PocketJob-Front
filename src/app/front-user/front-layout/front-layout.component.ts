import { Component } from '@angular/core';

@Component({
  selector: 'app-front-layout',
  standalone: false,
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.scss'
})
export class FrontLayoutComponent {
  showLoginModal = false;
  showRegisterModal = false;

  openLogin() {
    this.showLoginModal = true;
    this.showRegisterModal = false;
  }

  openRegister() {
    this.showLoginModal = false;
    this.showRegisterModal = true;
  }

  closeModal() {
    this.showLoginModal = false;
    this.showRegisterModal = false;
  }

}
