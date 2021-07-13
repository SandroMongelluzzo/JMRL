import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { EmailFromContactService } from 'src/app/core/services/email-from-contact.service';
import { SelectionModel } from '@angular/cdk/collections';
import { EmailFromContact } from 'src/app/model/emailFromContact';

@Component({
  selector: 'app-emails-list',
  templateUrl: './emails-list.component.html',
  styleUrls: ['./emails-list.component.css']
})
export class EmailsListComponent implements OnInit, AfterViewInit {
  emailsFC = null as any;
  dataSource = null as any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private emailsFCService: EmailFromContactService) {

  }
  displayedColumns: string[] = ['select', 'id', 'emailAddress', 'name2', 'comment', 'open'];
  selection = new SelectionModel<EmailFromContact>(true, []);


  ngOnInit(): void {
    this.emailsFCService.getAll()
      .pipe(first())
      .subscribe(emails => {
        this.emailsFC = emails
        this.dataSource = new MatTableDataSource(this.emailsFC);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      });
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmailfc(id: string) {
    const emailfc = this.emailsFC.find((x: any) => x.id === id);
    emailfc.isDeleting = true;
    this.emailsFCService.delete(id)
      .pipe(first())
      .subscribe(() => this.emailsFC = this.emailsFC.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
  }

  private deleteRowDataTable() {
    this.dataSource.paginator = this.paginator;
    window.location.reload();
  }

  //
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  deleteSelected(){   
   this.selection.selected.forEach(element => this.deleteEmailfc(element.id));
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: EmailFromContact): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}