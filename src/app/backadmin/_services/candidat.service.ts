import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Candidat } from '../candidat/candidat.model';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private apiUrl = `${environment.apiUrl}/backoffice`;

  constructor(private http: HttpClient) {}

  // Get the list of candidates
  public getCandidatsList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/candidates`, payload, {
      observe: 'response',
    });
  }
  
  // Get candidate details by ID
  getCandidateById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/candidates/${id}`);
  }

  // Add a new candidate
  public addCandidat(payload: any): Observable<any> {
   // ✅ Correct
return this.http.post(`${this.apiUrl}/candidates`, payload, {
  observe: 'response',
});

    }


    public showCandidat(id: any): Observable<HttpResponse<any>> {
      return this.http.get(`${this.apiUrl}/candidates/${id}`, {
        observe: 'response',
      });
    }
  // Update candidate data
  public updateCandidat(id: any, data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/candidates/${id}/update`, data, {
      observe: 'response',
    });
  }


  // Delete a candidate
  public deletCandidat(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/candidates/delete/${id}`, {
       observe: 'response',
       });
  }

  public getCandidatMembers(group: any, data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/candidates/${group}/members`, data, {
      observe: 'response',
    });
  }
  public deleteCandidatMember(
    group: any,
    user: any
  ): Observable<HttpResponse<any>> {
    return this.http.delete(
      `${this.apiUrl}/candidates/${group}/members/delete?user_id=${user}`,
      { observe: 'response' }
    );
  }


  public joinGroupMember(id: any, payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/candidates/${id}/join/status`, payload, {
      observe: 'response',
    });
  }

  getUsersToJoinCandidat(group: any) {
    return this.http.post(`${this.apiUrl}/candidates/${group}/members/list`, {
      observe: 'response',
    });
  }
  // Change candidate status
  public updateStatus(id: number, is_private: boolean) {
    const body = {
      is_private: is_private,
    };
    return this.http.post(`${this.apiUrl}/candidates/${id}/is_private`, body, {
      observe: 'response',
    });
  }
  // Get the list of diplomas
  public getDiplomasList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/diplomas`);
  }

  

  public restoreCandidat(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/candidates/restore/${id}`, {});
  }
  
}
