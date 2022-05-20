import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Console } from 'console';



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
    return this.http.post<[]>(environment.apiUrl + 'services/team',userObj, this.httpOptions);
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
   return this.http.get<[]>(environment.apiUrl + 'services/network/user/profile/web', this.httpOptions);
  //return this.http.get<[]>('https://apis.vgroupinc.com/tournamentapis/web/srf/services/unauthenticated/top/tournament', this.httpOptions);
}

searchTournament(qr:any){
    console.log(qr);
  return this.http.get<[]>(environment.apiUrl1 + 'services/unauthenticated/search/tournament?query='+qr, this.httpOptions);
 
}
searchEvent(qr:any){
  console.log(qr);
  return this.http.get<[]>(environment.apiUrl1 + 'services/main/search/Event?q='+qr, this.httpOptions);
}
searchSeason(qr:any){
  console.log(qr);
  return this.http.get<[]>(environment.apiUrl1 + 'services/main/search/Event?q='+qr, this.httpOptions);
}
searchTeam(qr:any){
  console.log(qr);
  return this.http.get<[]>(environment.apiUrl1 + 'services/main/search/Event?q='+qr, this.httpOptions);
}

getSeason(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/season/user/'+userId, this.httpOptions);
 }
 getTeam(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'services/team/player/'+userId, this.httpOptions);
 }
 getTeamList(){
  return this.http.get<[]>(environment.apiUrl + 'team/List', this.httpOptions);
 }
uploadImage(file: File){
  
  return this.http.post<[]>(environment.apiUrl + 'services/file/uploadjson' ,this.httpOptions);
}
getEvent(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/event/user/'+userId, this.httpOptions);
}
getLocation(){
  return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/search/location?query' ,this.httpOptions);
}
getGame(){
  return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/search/game?query' ,this.httpOptions);
}
// getFiles(){
  
//   return this.http.get<[]>("https://s3.amazonaws.com/vgroup-tournament/");
// }
getNotifications(){
  return this.http.get<[]>(environment.apiUrl + 'services/main/notifications' ,this.httpOptions);
}
addTournaments(id:any){
  return this.http.put<[]>(environment.apiUrl + 'services/main/season/add/tournament/'+id, this.httpOptions);
}
getSeasonID(){
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/season/' ,this.httpOptions);
}
  
getPerson(qr:string){
  return this.http.get<[]>(environment.apiUrl+'services/main/search/Person?'+qr);
}



}
function throwError(err: any): any {
  throw new Error('Function not implemented.');
}

