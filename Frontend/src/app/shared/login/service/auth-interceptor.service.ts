import { SocialAuthService } from "@abacritt/angularx-social-login";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private router:Router,
      private authService1: SocialAuthService,
      private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedReq=null;
        let token = localStorage.getItem('token');
        if(token===null){
            modifiedReq=req.clone();
        }
        else{
            modifiedReq=req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        
        return next.handle(modifiedReq).pipe(
            catchError((error) => {
              if (error.status === 403) {
                // Handle 403 Forbidden error, e.g., redirect to login page
                console.log('error');
                localStorage.setItem('loggedOut','true');
                this.authService1.signOut();
                this.authService.logout();
                localStorage.removeItem('token');
                this.router.navigate(['/login']);
              }
              return throwError(error);
            })
          );
    }

}