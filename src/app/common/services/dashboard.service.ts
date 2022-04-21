import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConstant } from '../server-constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'api-version':'TE_Web_1.0',
      'Authorization':'AUTH-KEY'
    })
  }
  constructor(private http: HttpClient) { }

  createEvent() {
    return this.http.post<[]>(ServerConstant.apiUrl + 'services/main/event', this.httpOptions);
  }
  createSeason(){
    return this.http.post<[]>(ServerConstant.apiUrl + 'services/main/season', this.httpOptions);
  }
  createTeam(){
    return this.http.post<[]>(ServerConstant.apiUrl + 'services/team', this.httpOptions);
  }
  createTournament(){
    return this.http.post<[]>(ServerConstant.apiUrl + 'services/main/tournament', this.httpOptions);
  }
  updateProfile(id:any, userObj:any){
     
    return this.http.post<[]>(ServerConstant.apiUrl + 'services/network/user/update/profile'+id +userObj,this.httpOptions);
  }
  userProfile(id:String){
   
    return this.http.get<[]>(ServerConstant.apiUrl + 'services/network/user/profile/'+id,this.httpOptions);
}
getTournament(){
  // return this.http.get<[]>(ServerConstant.apiUrl + 'services/unauthenticated/top/tournament', this.httpOptions);
  return this.http.get<[]>('https://apis.vgroupinc.com/tournamentapis/web/srf/services/unauthenticated/top/tournament', this.httpOptions);
  

}
}
