import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
     // 'api-version':'TE_Web_1.0',
     // 'Authorization':'AUTH-KEY'
    })
  }
  
  constructor(private http: HttpClient) { }

  
createSeason(userObj:any){
    return this.http.post<[]>(environment.apiUrl + 'services/main/season',userObj, this.httpOptions);
 }
  
searchSeason(qr:any){
  console.log(qr);
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/Event?q='+qr, this.httpOptions);
}

getSeason(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/season/user/'+userId, this.httpOptions);
 }
 
getSeasonID(id:string){
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/season/'+id ,this.httpOptions);
}
}


