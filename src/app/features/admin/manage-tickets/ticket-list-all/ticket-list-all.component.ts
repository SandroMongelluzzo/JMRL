import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account-service.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Ticket } from 'src/app/model/ticket';
import { User } from 'src/app/model/user';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertService } from 'src/app/core/services/alert-service.service';


@Component({
  selector: 'app-ticket-list-all',
  templateUrl: './ticket-list-all.component.html',
  styleUrls: ['./ticket-list-all.component.css']
})
export class TicketListAllComponent implements OnInit {

  userTicket = null as any;
  dataSource = null as any;
  user?: User;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private userTicketService: TicketService,
    private accountSerivce: AccountService,
    private alertService: AlertService) { }


  displayedColumns: string[] = ['id', 'type', 'status', 'content', 'comment', 'options'];
  selection = new SelectionModel<Ticket>(true, []);


  ngOnInit(): void {

    this.user = this.accountSerivce.userValue;


    this.userTicketService.getAll()
    .pipe(first())
    .subscribe(tickets => {
      this.userTicket = tickets //.filter(ele => ele.userId==this.user?.id)
      this.dataSource = new MatTableDataSource(this.userTicket);
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

  deleteUserTicket(id: number) {
    const userticket = this.userTicket.find((x: any) => x.id === id);
    userticket.isDeleting = true;
    this.userTicketService.delete(id)
      .pipe(first())
      .subscribe(() => this.userTicket = this.userTicket.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('Ticket deleted successfully');

    
  }

  private deleteRowDataTable() {
    this.dataSource.paginator = this.paginator;
    window.location.reload();
  }

}
