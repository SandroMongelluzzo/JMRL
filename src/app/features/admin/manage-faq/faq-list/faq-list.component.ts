import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { FaqService } from 'src/app/core/services/faq.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'options'];
  faq = null as any
  dataSource = null as any;


  constructor(
    private faqService: FaqService,
    private alertService: AlertService) { }


  ngOnInit(): void {

    this.faqService.getAll()
      .pipe(first())
      .subscribe(faq => {
        this.faq = faq
        this.dataSource = new MatTableDataSource(this.faq)
      });
  }

  deleteFaq(id: number) {
    const FAQ = this.faq.find((x: any) => x.id === id);
    FAQ.isDeleting = true;
    this.faqService.delete(id)
      .pipe(first())
      .subscribe(() => this.faq = this.faq.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('Faq deleted successfully', { keepAfterRouteChange: true });
  }

  private deleteRowDataTable() {
    this.dataSource = null;
    this.faq = [];
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }
}