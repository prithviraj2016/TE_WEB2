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
getTournament(id:String){
   return this.http.get<[]>(environment.apiUrl + 'services/main/tournament/user/'+id, this.httpOptions);
  //return this.http.get<[]>('https://apis.vgroupinc.com/tournamentapis/web/srf/services/unauthenticated/top/tournament', this.httpOptions);
}
getTournamentID(id:String){
  return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/search/tournament?id='+id, this.httpOptions);

}
deleteTournament(id:String){
  return this.http.delete<[]>(environment.apiUrl + 'service/main/tournament/'+id, this.httpOptions);

}
searchTournament(qr:any){
    console.log(qr);
  return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/search/tournament?query='+qr, this.httpOptions);
 
}
searchEvent(qr:any){
  console.log(qr);
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/Event?q='+qr, this.httpOptions);
}
searchSeason(qr:any){
  console.log(qr);
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/Event?q='+qr, this.httpOptions);
}
searchTeam(qr:any){
  console.log(qr);
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/Event?q='+qr, this.httpOptions);
}

getSeason(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/season/user/'+userId, this.httpOptions);
 }
 getseasonID(ID:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/season/'+ID, this.httpOptions);
 }
 getTeam(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'services/team/player/'+userId, this.httpOptions);
 }
 getTeamID(ID:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/team/'+ID, this.httpOptions);
 }
 uploadImage(imageString: any){
  const data = {"request":imageString}
  return this.http.post<[]>(environment.apiUrl + 'services/file/uploadjson',data ,this.httpOptions);
}
getEvent(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/event/user/'+userId, this.httpOptions);
}
getEventID(Id:String){
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/event/'+Id, this.httpOptions);
}
getLocation(qr:any){
  console.log(qr)
  return this.http.get<[]>(environment.apiUrl + 'services/unauthenticated/search/location?query='+qr ,this.httpOptions);
}
getGame(qr:any){
  console.log(qr)
  return this.http.get<[]>(environment.apiUrl + 'services/main/games?query='+qr ,this.httpOptions);
}
// getFiles(){
  
//   return this.http.get<[]>("https://s3.amazonaws.com/vgroup-tournament/");
// }
getNotifications(){
  return this.http.get<[]>(environment.apiUrl + 'services/main/notifications' ,this.httpOptions);
}
addTournaments(userId:String){
  return this.http.get<[]>(environment.apiUrl + 'add/tournament/'+userId, this.httpOptions);
}
getSeasonID(id:string){
  return this.http.get<[]>(environment.apiUrl + 'services/main/search/season/'+id ,this.httpOptions);
}
  
getPerson(qr:string){
  return this.http.get<[]>(environment.apiUrl+'services/main/search/Person?'+qr);
}



}
function throwError(err: any): any {
  throw new Error('Function not implemented.');
}

