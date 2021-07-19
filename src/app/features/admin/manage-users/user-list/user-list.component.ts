import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account-service.service';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { Ticket } from 'src/app/model/ticket';
import { SelectionModel } from '@angular/cdk/collections';


@Component({ templateUrl: 'user-list.component.html',
styleUrls: ['./user-list.component.css'] })
export class UserListComponent implements OnInit {
    users = null as any;
  dataSource = null as any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService) { }

        displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'emailAddress', 'options'];
  selection = new SelectionModel<Ticket>(true, []);

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users
                this.dataSource = new MatTableDataSource(this.users);
                setTimeout(() => this.dataSource.paginator = this.paginator);
                setTimeout(() => this.dataSource.sort = this.sort);
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

    deleteUser(id: number) {
        const user = this.users.find((x: any) => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
        this.alertService.warn('User deleted successfully');
    }

    private deleteRowDataTable() {
        this.dataSource.paginator = this.paginator;
        this.dataSource = null;
        this.users = [];
        setTimeout(() => {
          this.ngOnInit();
        }, 500);
      }
    
}