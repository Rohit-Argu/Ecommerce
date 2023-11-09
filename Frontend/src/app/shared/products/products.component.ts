import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CardModel } from '../model/card.model';
import { ProductService } from './product.service';
import { CartService } from 'src/app/customer/cart/cart.service';

import { OrdersService } from 'src/app/customer/orders/orders.service';
import { OrderDetailsModel } from '../model/order.details.model';
import { UserService } from 'src/app/customer/user.service';
import { ProductsResp } from '../model/ProductsResp.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { map, merge, startWith, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit, AfterViewInit {
  productsResp!: ProductsResp;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizes = [10, 20,40];

  totalData!: number;

  sortColumn!:string;
  sortDirection!:string;

  constructor(private router:Router, private productService: ProductService) {}

  searchKeywordFilter = new FormControl();

  sorting = new FormControl();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit() {
    this.productService.getAllProducts(1, 10, 'id', 'asc', '').subscribe((data) => {
      this.productsResp = data;
    });
  }

  ngAfterViewInit(): void {
    this.sorting.valueChanges.subscribe(() => (this.paginator.pageIndex = 0));
    this.searchKeywordFilter.valueChanges.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.searchKeywordFilter.valueChanges, this.sorting.valueChanges, this.paginator.page)
      .pipe(
        startWith(this.sortColumn="id",this.sortDirection="asc", this.sorting.setValue("id-by-asc")),
        switchMap(() => {
          var filterValue = this.searchKeywordFilter.value == null ? '' : this.searchKeywordFilter.value;
          this.doSorting(this.sorting.value);
          return this.loadProducts$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.sortColumn,
            this.sortDirection,
            filterValue
          );
        }),
        map((Products) => {
          if (Products == null) return [];
          this.totalData = Products.totalElements;
          return Products.content;
        })
      )
      .subscribe((Products) => {
        this.productsResp.content = Products;
      });

  }

  loadProducts$(pageNumber: number, pageSize: number, active: string, direction: string, filterValue: string) {
    return this.productService.getAllProducts(pageNumber, pageSize, active, direction, filterValue);
  }

  doSorting(value: string) {
    if (value.toLowerCase() === 'id-by-desc') {
      this.sortColumn = 'id';
      this.sortDirection = 'desc';
    } else if (value.toLowerCase() === 'id-by-asc') {
      this.sortColumn = 'id';
      this.sortDirection = 'asc';
    } else if (value.toLowerCase() === 'price-by-desc') {
      this.sortColumn = 'price';
      this.sortDirection = 'desc';
    } else if (value.toLowerCase() === 'price-by-asc') {
      this.sortColumn = 'price';
      this.sortDirection = 'asc';
    }
    console.log(this.sortColumn+this.sortDirection);
    
  }

  details(i:number){
        this.router.navigate(['/products',i]);
      }
}
// export class ProductsComponent implements OnInit{

//   cards:CardModel[]=[];
//   cart=faShoppingCart;
//   user='customer';

//   constructor(private router:Router,private productService: ProductService,private route:ActivatedRoute,private ordersService:OrdersService, private cartService: CartService,private changeDetectorRef:ChangeDetectorRef,private userService:UserService){}
//   ngOnInit(): void {
//     this.productService.fetchCards();
//     this.cards=this.productService.getCards();
    
//     this.changeDetectorRef.detectChanges();
//   }
  
//   onLogin(){
//     this.router.navigate(['login']);
//   }
//   getUser(){
//     return this.user;
//   }
//   details(i:number){
//     this.router.navigate(['/products',i]);
//   }
//   onSearchSubmit(s:any){
//     this.productService.search(s.value);
//     s.value="";
//     s.focus();
//   }

// }
