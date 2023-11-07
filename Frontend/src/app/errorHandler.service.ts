import { Injectable } from "@angular/core";
import { Location } from '@angular/common';

@Injectable({
    providedIn:'root'
})
export class ErrorHandlerService{
    constructor(private location:Location){}
    handle(error: any) {
        // Global error handling logic
        console.log('Global error handling:', error);
        // You can also provide other error-handling logic here
        // alert(error);
        // this.location.back();
      }
}