import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../enviroment/enviroment';
import { Resposta } from '../api/resposta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async enviarDados(endpoint: string, parameter: any): Promise<Observable<Resposta>> {
    return this.http
      .post<Resposta>(`${API_URL}/${endpoint}`, parameter);
  }

  async receberDados(endpoint: string): Promise<Observable<Resposta>> {
    return this.http
      .get<Resposta>(`${API_URL}/${endpoint}`);
  }
}
