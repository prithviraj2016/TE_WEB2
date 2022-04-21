import { ServerConstant } from './../../common/server-constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http:HttpClient) { }

  create(data:any): Observable<[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return this.http.post<[]>(ServerConstant.apiUrl + 'services/unauthenticated/enquiry',data,httpOptions);

   }
}

