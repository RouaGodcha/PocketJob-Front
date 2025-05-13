import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Permet d'injecter automatiquement ce service partout sans besoin de le déclarer dans un module
})
export class ModulesService {
  // URL de base pour toutes les requêtes vers le backend Laravel
  private apiUrl = `${environment.apiUrl}/backoffice`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste paginée des modules (sujets)
   * @param payload Contient les filtres, la page, le nombre d’éléments par page, etc.
   */
  public getSubjectsList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/module`, payload, { observe: 'response' });
  }

  /**
   * Supprime un module spécifique par son ID
   * @param subjectId ID du module à supprimer
   */
  public deleteModule(subjectId: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/module/${subjectId}`, { observe: 'response' });
  }
  public changeStatus(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/module/change_status/${id}`, payload, { observe: 'response' })
  }
  /**
   * Récupère la liste de tous les diplômes (non paginée ici)
   * @param payload Peut contenir {paginate: 0} pour demander tout sans pagination
   */
  public getDiplomasList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/diplomas`, payload, { observe: 'response' });
  }

  /**
   * Ajoute un nouveau module (offre d’emploi)
   * @param payload Données du module à enregistrer (nom, description, diplôme associé, etc.)
   */
  public addModule(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/module/save`, payload, { observe: 'response' });
  }

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Récupère les détails d’un module par son ID
   * @param subjectId ID du module
   */
  public getModuleById(subjectId: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/module/${subjectId}`, { observe: 'response' });
  }

  /**
   * Met à jour un module existant
   * @param subjectId ID du module à modifier
   * @param payload Nouvelles données à enregistrer
   */
  public updateModule(subjectId: any, payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/module/${subjectId}/update`, payload, { observe: 'response' });
  }

  public getJobTypesList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/job_types`, payload, { observe: 'response' });
  }
  

  /**
   * Récupère les dates officielles (utilisé par exemple pour les emplois liés à un planning)
   * @param data Paramètres éventuels pour filtrer les dates
   */
  public getOfficialDates(data: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/official_date`, { params: data, observe: 'response' });
  }

  /**
   * Ajoute une nouvelle date officielle (planning, événement, etc.)
   * @param payload Données de la date (ex: jour, heure, description)
   */
  public addSchedule(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/official_date`, payload, { observe: 'response' });
  }

  /**
   * Récupère les détails d’une date officielle
   * @param scheduleId ID de la date
   */
  public getScheduleById(scheduleId: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/official_date/${scheduleId}`, { observe: 'response' });
  }

  /**
   * Met à jour une date officielle existante
   * @param scheduleId ID de la date
   * @param payload Nouvelles données (ex: date, heure, description)
   */
  public updateSchedule(scheduleId: any, payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/official_date/${scheduleId}`, payload, { observe: 'response' });
  }

  /**
   * Supprime une date officielle par son ID
   * @param scheduleId ID de la date
   */
  public deleteSchedule(scheduleId: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/official_date/${scheduleId}`, { observe: 'response' });
  }
}
