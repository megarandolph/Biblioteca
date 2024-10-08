import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,   
    private loadingService: LoadingService,        
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let params = req.params;

    for (const key of params.keys()) {
        if (params.get(key) == null || params.get(key) == undefined ) {
            params = params.delete(key);
        }
    }

    // Obtener el token del servicio de autenticación
    const authToken = this.authService.getToken();

    // Clonar la solicitud para agregar el encabezado Authorization si hay un token
      let authReq = req;
      if (authToken) {
        authReq = req.clone({
          ...params,
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
      }
      this.loadingService.show();

    


    return next.handle(authReq).pipe(catchError(error => {
      this.loadingService.hide();
      if (error instanceof HttpErrorResponse && [401, 403].includes(error.status)) {
        this.authService.removeToken();
        return throwError(error);
      }
      
      return throwError(error);
    }))
    .pipe(map(evt => {
      if (evt instanceof HttpResponse) {
        this.loadingService.hide();
      }
      this.loadingService.hide();
      return evt;
    }));

    
  }
}
