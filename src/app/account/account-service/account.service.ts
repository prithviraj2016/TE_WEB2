import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { HttpHeaders } from "@angular/common/http";
import { Observable, from } from 'rxjs';
import { SignIn } from '../signin/sign-in';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })


export class AccountService {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'api-version':'TE_Web_1.0'
      })
    }


    constructor(private http: HttpClient) {


    }
     LoginUser(signin:SignIn): Observable<[]> {

    const signinObj = {
        "username": signin.UserName,
        "password": signin.Password
      };




      return this.http.post<[]>(environment.apiUrl1 + 'services/network/login',signinObj, this.httpOptions);
    }



    LogoutUser(): Observable<[]> {

     return this.http.get<[]>(environment.apiUrl + '/network/logout',this.httpOptions);

    }
    Signup(signupObj:any): Observable<[]> {


      return this.http.post<[]>(environment.apiUrl + 'services/network/user/register',signupObj,this.httpOptions);

    }
    ForgetPassword(email:string): Observable<[]> {

      return this.http.get<[]>(environment.apiUrl + 'unauthenticated/user/reset/password?username='+email,this.httpOptions);

    }
    resendverification(email:string): Observable<[]> {

      return this.http.get<[]>(environment.apiUrl+'unauthenticated//resend/verification?email='+email,this.httpOptions);

    }

    }


