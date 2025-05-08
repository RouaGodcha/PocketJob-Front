import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCandidatService {

  constructor() { }
  setCandidatToken(token: string) {
    localStorage.setItem('CandidatToken', token);
  }

  getCandidatToken() {
    return localStorage.getItem('CandidatToken');
  }

  setCandidatRole(role: string) {
    localStorage.setItem('CandidatRole', role);
  }

  getCandidatRole() {
    return localStorage.getItem('CandidatRole');
  }

  setCandidatId(id: string) {
    localStorage.setItem('CandidatId', id);
  }

  getCandidatId() {
    return localStorage.getItem('CandidatId');
  }

  clear(): void {
    localStorage.removeItem('CandidatToken');
    localStorage.removeItem('CandidatRole');
    localStorage.removeItem('CandidatId');
  }
  
}
