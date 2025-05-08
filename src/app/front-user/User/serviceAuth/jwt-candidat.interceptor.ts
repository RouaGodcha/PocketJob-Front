import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LocalStorageCandidatService } from './local-storage-candidat.service';
import { Observable } from 'rxjs';

export class jwtCandidatInterceptor implements HttpInterceptor{
  constructor(
    private LocalStorageCandidatService: LocalStorageCandidatService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.LocalStorageCandidatService.getCandidatToken();
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
