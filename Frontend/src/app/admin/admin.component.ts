import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../customer/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User1Model } from '../shared/model/user1.model';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Users!: User1Model[];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role'];

  dataSource: MatTableDataSource<User1Model> = new MatTableDataSource<User1Model>([]);

  pageSizes = [5, 10, 25];

  totalData!: number;

  constructor(private userService: UserService) {}

  searchKeywordFilter = new FormControl();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTableData$(pageNumber: number, pageSize: number, active: string, direction: string, filterValue: string) {
    return this.userService.getUsers(pageNumber, pageSize, active, direction, filterValue);
  }

  ngOnInit(): void {
    this.userService.getUsers(1, 5, 'id', 'asc', '').subscribe((data) => {
      this.Users = data.content;
      this.dataSource = new MatTableDataSource(this.Users);
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.dataSource.paginator = this.paginator;

    merge(this.searchKeywordFilter.valueChanges, this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          var filterValue = this.searchKeywordFilter.value == null ? '' : this.searchKeywordFilter.value;
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
            filterValue
          );
        }),
        map((Users) => {
          if (Users == null) return [];
          this.totalData = Users.totalElements;
          return Users.content;
        })
      )
      .subscribe((Users) => {
        this.Users = Users;
        this.dataSource = new MatTableDataSource(this.Users);
      });
  }
}
