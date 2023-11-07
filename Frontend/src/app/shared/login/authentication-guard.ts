import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/auth.service";

// export class AuthGuard{
//     constructor(private router: Router,private authService:AuthService){}
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//         if(this.authService.isLoggedIn())
//             return true;
//         else
//             return this.router.createUrlTree(['login']);
//         // return this.authService.isLoggedIn();
//     }

// }
export const AuthGuard:CanActivateFn=(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService=inject(AuthService);
    const router=inject(Router);
    if(authService.isLoggedIn())
            return true;
        else
            return router.createUrlTree(['login']);
}