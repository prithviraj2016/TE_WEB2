import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http:HttpClient) { }

  create(data:any): Observable<[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return this.http.post<[]>(environment.apiUrl + 'services/unauthenticated/enquiry',data,httpOptions);

   }
}

