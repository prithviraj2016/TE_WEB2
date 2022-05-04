import { catchError, Observable } from 'rxjs';
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

  createEvent() {
    return this.http.post<[]>(environment.apiUrl + 'services/main/event', this.httpOptions);
  }
  createSeason(userObj:any){
    return this.http.post<[]>(environment.apiUrl + 'services/main/season',userObj, this.httpOptions);
    
     
  }
  
  createTeam(userObj:any){
    return this.http.post<[]>(environment.apiUrl + 'services/main/team',userObj, this.httpOptions);
  }
  createTournament(userObj:any){
    return this.http.post<[]>(environment.apiUrl + 'services/main/tournament',userObj, this.httpOptions);
  }
  updateProfile(id:any, userObj:any){

    return this.http.post<[]>(environment.apiUrl + 'services/network/user/update/profile'+id +userObj,this.httpOptions);
  }
  userProfile(id:String){

    return this.http.get<[]>(environment.apiUrl + 'services/network/user/profile/'+id,this.httpOptions);
}
getTournament(){
   return this.http.get<[]>(environment.apiUrl1 + 'services/network/user/profile/web', this.httpOptions);
  //return this.http.get<[]>('https://apis.vgroupinc.com/tournamentapis/web/srf/services/unauthenticated/top/tournament', this.httpOptions);
}
getSeason(){
  return this.http.get<[]>(environment.apiUrl1 + 'season/list', this.httpOptions);
 }
 getTeam(){
  return this.http.get<[]>(environment.apiUrl1 + 'team/list', this.httpOptions);
 }
uploadImage(file: File){
  
  return this.http.post<[]>(environment.apiUrl + 'services/file/uploadjson' ,this.httpOptions);
}
// getEvent(){
//   return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/top/events', this.httpOptions);
// }
getLocation(){
  return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/search/location?query' ,this.httpOptions);
}
getGame(){
  return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/search/game?query' ,this.httpOptions);
}

}
function throwError(err: any): any {
  throw new Error('Function not implemented.');
}

