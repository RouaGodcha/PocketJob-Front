import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageEmployerService {

  constructor() { }

  // Token
setEmployerToken(token: string) {
  localStorage.setItem('employerToken', token);
}
getEmployerToken() {
  return localStorage.getItem('employerToken');
}

// Role
setEmployerRole(role: string) {
  localStorage.setItem('employerRole', role);
}
getEmployerRole() {
  return localStorage.getItem('employerRole');
}

// ID
setEmployerId(id: string) {
  localStorage.setItem('employerId', id);
}
getEmployerId() {
  return localStorage.getItem('employerId');
}

// Clear employer only
clearEmployer() {
  localStorage.removeItem('employerToken');
  localStorage.removeItem('employerRole');
  localStorage.removeItem('employerId');
}

}
