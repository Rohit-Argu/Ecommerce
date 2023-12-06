import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ErrorHandlerService{
    constructor(
      ) {}
    handle(error: any) {
        // Global error handling logic
        console.log('Global error handling:', error);
        
        // You can also provide other error-handling logic here
        // alert(error);
        // this.location.back();
      }
}