import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageEmployerService {
  setEmployerToken(adminToken: string) {
    localStorage.setItem('EmployerToken', adminToken);
}
getEmployerToken() {
    return localStorage.getItem('EmployerToken');
}
setEmployerRole(adminRole: string) {
    localStorage.setItem('EmployerRole', adminRole);
}
getEmployerRole() {
    return localStorage.getItem('EmployerRole');
}
setEmployerId(adminId: string) {
    localStorage.setItem('EmployerId', adminId);
}
getEmployerId() {
    return localStorage.getItem('EmployerId');
}
clear(): void {
    localStorage.removeItem('EmployerToken');
    localStorage.removeItem('EmployerRole');
    localStorage.removeItem('EmployerId');
  }
}
