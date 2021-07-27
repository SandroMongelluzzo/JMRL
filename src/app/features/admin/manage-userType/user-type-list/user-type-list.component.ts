import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { UserTypeService } from 'src/app/core/services/user-type.service';

@Component({
  selector: 'app-user-type-list',
  templateUrl: './user-type-list.component.html',
  styleUrls: ['./user-type-list.component.css']
})
export class UserTypeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'role', 'options'];
  roles = null as any
  dataSource = null as any;

  constructor(
    private userTypeService: UserTypeService,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.userTypeService.getAll()
      .pipe(first())
      .subscribe(role => {
        this.roles = role
        this.dataSource = new MatTableDataSource(this.roles)
      });
  }

  deleteUserType(id: number) {
    const USER_TYPE = this.roles.find((x: any) => x.id === id);
    USER_TYPE.isDeleting = true;
    this.userTypeService.delete(id)
      .pipe(first())
      .subscribe(() => this.roles = this.roles.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('USER TYPE deleted successfully', { keepAfterRouteChange: true });
  }

  private deleteRowDataTable() {
    this.dataSource = null;
    this.roles = [];
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }
}