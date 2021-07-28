import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketService } from 'src/app/core/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {
  userTicket = null as any;
  dataSource = null as any;
  user?: User;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userTicketService: TicketService,
    private accountSerivce: AccountService
    ) { }

  displayedColumns: string[] = ['id', 'type', 'status', 'content', 'comment', 'options'];

  ngOnInit(): void {
    this.user = this.accountSerivce.userValue;

    this.userTicketService.getAll()
    .pipe(first())
    .subscribe(tickets => {
      this.userTicket = tickets.filter(ele => ele.userId==this.user?.id)
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
}