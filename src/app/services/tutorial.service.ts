import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

// endpoint to tutorial service
const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  // retorna todos os registros de tutorial
  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  // retorna o Id solicitado.
  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // posta um tutorial
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // atualiza um tutorial
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // deleta tutorial por id
  delete(id: any): Observable<Tutorial> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // deletar todos.
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  // procurar por título
  findByTitle(title: any): Observable<Tutorial[]> {
    if (title) {
      return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
    }
    return this.http.get<Tutorial[]>(baseUrl);
  }
}
