import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }
  
  public getAllConfig(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/settings/all`, { observe: 'response' });
  }
  public getSmsConfig(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/settings`, { observe: 'response' });
  }
  public updateSmsConfig(payload:{sms:number}): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/settings/update`,payload, { observe: 'response' });
  }
  public updateIosVersion(payload:{ios:string}): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/settings/ios/update`,payload, { observe: 'response' });
  }
  public updateAndroidVersion(payload:{android:string}): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/settings/andoid/update`,payload, { observe: 'response' });
  }
  public updateIosVersionRequired(payload:{ios_required:boolean}): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/settings/ios-required/update`,payload, { observe: 'response' });
  }
  public updateAndroidVersionRequired(payload:{android_required:boolean}): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/settings/andoid-required/update`,payload, { observe: 'response' });
  }
  public updateIAConfig(payload:{ia:number}): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/settings/update-ia`,payload, { observe: 'response' });
  }
}
