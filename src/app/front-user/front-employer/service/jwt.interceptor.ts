import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageEmployerService } from './local-storage-employer.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private localstorageService: LocalStorageEmployerService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localstorageService.getEmployerToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
  
    return next.handle(request);
  }
  
}
