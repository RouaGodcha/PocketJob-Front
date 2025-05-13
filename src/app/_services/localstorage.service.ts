import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {
    }
    setAdminToken(token: string) {
        localStorage.setItem('AdminToken', token);
    }
    getAdminToken() {
        return localStorage.getItem('AdminToken');
    }
    setAdminRole(role: string) {
        localStorage.setItem('AdminRole', role);
    }
    getAdminRole() {
        return localStorage.getItem('AdminRole');
    }
    setAdminId(Id: string) {
        localStorage.setItem('AdminId', Id);
    }
    getAdminId() {
        return localStorage.getItem('AdminId');
    }
    clear(): void {
        localStorage.removeItem('AdminToken');
        localStorage.removeItem('AdminRole');
        localStorage.removeItem('AdminId');
      }
      
}