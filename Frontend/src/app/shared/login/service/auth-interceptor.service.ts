import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("In error");
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
        
        return next.handle(modifiedReq);
    }

}