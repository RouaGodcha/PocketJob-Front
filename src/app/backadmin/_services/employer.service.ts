import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http : HttpClient
  ) { }
   // ✅ Changer le statut d’un employeur
  public changeStatus(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/employer/change_status/${id}`, payload, { observe: 'response' })
  }


 // ✅ Liste des employeurs avec pagination et filtre
 public getEmployerList(params: { page: number; per_page: number; filter?: string }): Observable<any> {
  let httpParams = new HttpParams()
    .set('page', params.page.toString())
    .set('per_page', params.per_page.toString());
  if (params.filter) {
    httpParams = httpParams.set('filter', params.filter);
  }

  return this.http.get(`${this.apiUrl}/employers`, { params: httpParams });
}

// ✅ Ajouter un employeur
public addEmployer(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/employers`, payload);
}

getEmployerById(id: string) : Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/employers/${id}`);
}


// ✅ Mettre à jour un employeur
public updateEmployer(id: number, payload: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/employers/${id}`, payload);
}

 // ✅ Supprimer définitivement un employeur
 public permanentDeleteEmployer(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/employers/${id}`);
}

// ✅ Restaurer un employeur supprimé
public restoreEmployer(id: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/employers/restore/${id}`, {});
}

public deletEmployer(id: any): Observable<HttpResponse<any>> | any {
  return this.http.delete(`${this.apiUrl}/employers/delete/${id}`, { observe: 'response' });
}
  
}
