import { Injectable } from "@angular/core";
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private ngxUiLoaderService: NgxUiLoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(event.body.status);
        }
      })
    );
   }
 }
